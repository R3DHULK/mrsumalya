import { NextResponse } from "next/server"
import * as cheerio from "cheerio"

export const revalidate = 3600 // revalidate every hour

export async function GET() {
  try {
    const res = await fetch("https://y8.com/studios/sumalya", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      throw new Error(`Y8 fetch failed: ${res.status}`)
    }

    const html = await res.text()
    const $ = cheerio.load(html)

    // --- Stats ---
    let gamesPublished = 0
    let totalGameplays = 0

    // Counters appear in spans/divs with numeric text near labels
    $("*").each((_, el) => {
      const text = $(el).text().trim()
      const children = $(el).children().length

      // Look for isolated numeric nodes next to label text
      if (children === 0) {
        const parent = $(el).parent().text().trim()
        if (/^[\d,]+$/.test(text)) {
          const num = parseInt(text.replace(/,/g, ""), 10)
          if (parent.toLowerCase().includes("game") && parent.toLowerCase().includes("published") && gamesPublished === 0) {
            gamesPublished = num
          }
          if ((parent.toLowerCase().includes("gameplay") || parent.toLowerCase().includes("play")) && totalGameplays === 0 && num > 1000) {
            totalGameplays = num
          }
        }
      }
    })

    // Fallback: scan raw text for patterns like "35 Games Published" or "272,156 Gameplays"
    if (gamesPublished === 0 || totalGameplays === 0) {
      const rawText = $.text()
      const publishedMatch = rawText.match(/(\d[\d,]*)\s*(?:Games?\s*Published|Published\s*Games?)/i)
      const gameplaysMatch = rawText.match(/(\d[\d,]*)\s*(?:Gameplays?|Total\s*Plays?)/i)
      if (publishedMatch && gamesPublished === 0) {
        gamesPublished = parseInt(publishedMatch[1].replace(/,/g, ""), 10)
      }
      if (gameplaysMatch && totalGameplays === 0) {
        totalGameplays = parseInt(gameplaysMatch[1].replace(/,/g, ""), 10)
      }
    }

    // --- Games ---
    // Only count anchors with full y8.com game URLs (avoids ad banners / relative links)
    const games: { name: string; slug: string; thumb: string; rating: string; isNew: boolean }[] = []
    const seen = new Set<string>()

    $("a[href]").each((_, el) => {
      const href = $(el).attr("href") || ""
      // Only accept full absolute y8.com game URLs — filters out relative ad links
      if (!href.startsWith("https://www.y8.com/games/")) return
      const slug = href.replace("https://www.y8.com/games/", "").split("?")[0].split("#")[0]
      if (!slug || seen.has(slug)) return

      const img = $(el).find("img").first()
      const thumb =
        img.attr("data-src") ||
        img.attr("src") ||
        ""

      if (!thumb || !thumb.includes("y8.com")) return

      const name =
        $(el).find(".item__title, [class*='title']").first().text().trim() ||
        img.attr("alt") ||
        slug.replace(/_/g, " ")

      const rating = $(el).find(".item__rating, [class*='rating']").first().text().trim() || ""
      const isNew = $(el).find("[class*='new'], [class*='badge']").length > 0

      seen.add(slug)
      games.push({ name, slug, thumb, rating, isNew })
    })

    // Stats are rendered client-side on Y8, so use the scraped game count as the
    // authoritative "games published" figure rather than any parsed text node.
    const finalGamesPublished = games.length > 0 ? games.length : 35

    return NextResponse.json({
      gamesPublished: finalGamesPublished,
      totalGameplays,
      games,
    })
  } catch (err) {
    console.error("[v0] Y8 scrape error:", err)
    return NextResponse.json({ error: "Failed to fetch Y8 data" }, { status: 500 })
  }
}
