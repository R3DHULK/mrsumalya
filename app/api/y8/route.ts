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
    let totalGameplays = 0

    // Method 1: Look for the counter element that contains gameplays
    // The HTML structure is: <span class="counter">272,531</span> near "Total game plays"
    $(".counter").each((_, el) => {
      const text = $(el).text().trim()
      const parent = $(el).parent().text().trim().toLowerCase()
      if (/^[\d,]+$/.test(text)) {
        const num = parseInt(text.replace(/,/g, ""), 10)
        if ((parent.includes("gameplay") || parent.includes("play")) && totalGameplays === 0 && num > 1000) {
          totalGameplays = num
        }
      }
    })

    // Method 2: Look directly in raw HTML for the exact pattern we know exists
    // Pattern: Total game plays</span><span class="counter">272,531</span>
    if (totalGameplays === 0) {
      const counterMatch = html.match(/Total\s+game\s+plays[^<]*<\/span>\s*<span[^>]*class="counter"[^>]*>\s*([\d,]+)/i)
      if (counterMatch) {
        totalGameplays = parseInt(counterMatch[1].replace(/,/g, ""), 10)
      }
    }

    // Method 3: Scan raw text for patterns like "272,531" near gameplays
    if (totalGameplays === 0) {
      const rawText = $.text()
      const gameplaysMatch = rawText.match(/(\d[\d,]*)\s*(?:Gameplays?|Total\s*(?:game\s*)?Plays?)/i)
      if (gameplaysMatch) {
        totalGameplays = parseInt(gameplaysMatch[1].replace(/,/g, ""), 10)
      }
    }

    // --- Games ---
    // Only count anchors with full y8.com game URLs (avoids ad banners / relative links)
    const games: { name: string; slug: string; thumb: string; rating: string; isNew: boolean; reviews?: number }[] = []
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

      // Extract rating - look for numeric value like "8.5" in the item__rating span
      let rating = ""
      const ratingEl = $(el).find(".item__rating").first()
      if (ratingEl.length) {
        const ratingText = ratingEl.text().trim()
        // Extract just the numeric rating (e.g., "8.5" from potential other text)
        const ratingMatch = ratingText.match(/^(\d+\.?\d*)$/)
        if (ratingMatch) {
          rating = ratingMatch[1]
        }
      }

      // Check for "new" badge - Y8 uses item-icon--new class for new games
      const isNew = $(el).find(".item-icon--new, [class*='icon--new']").length > 0

      seen.add(slug)
      games.push({ name, slug, thumb, rating, isNew })
    })

    // Stats are rendered client-side on Y8, so use the scraped game count as the
    // authoritative "games published" figure rather than any parsed text node.
    const finalGamesPublished = games.length > 0 ? games.length : 35

    // Calculate average review score from all games that have a rating.
    // Collect every .item__rating text node that is a plain decimal number (skip CSS blobs).
    const ratingValues: number[] = []
    $(".item__rating").each((_, el) => {
      const text = $(el).text().trim()
      // Must be a short numeric string like "8.5" or "10.0" — not a CSS blob
      if (/^\d+(\.\d+)?$/.test(text) && text.length < 6) {
        ratingValues.push(parseFloat(text))
      }
    })

    let averageRating: number | null = null
    if (ratingValues.length > 0) {
      const sum = ratingValues.reduce((acc, v) => acc + v, 0)
      averageRating = Math.round((sum / ratingValues.length) * 10) / 10
    }

    return NextResponse.json({
      gamesPublished: finalGamesPublished,
      totalGameplays,
      averageRating,
      games,
    })
  } catch (err) {
    console.error("[v0] Y8 scrape error:", err)
    return NextResponse.json({ error: "Failed to fetch Y8 data" }, { status: 500 })
  }
}
