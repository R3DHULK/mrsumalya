import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Games from "@/components/games"
import APIs from "@/components/apis"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Games />
      <APIs />
      <Contact />
      <Footer />
    </main>
  )
}
