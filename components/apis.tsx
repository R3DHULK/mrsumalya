"use client"

import { motion } from "framer-motion"
import { Code2, Zap, Brain, ArrowRight } from "lucide-react"

const apis = [
  {
    name: "Extract and Translate Article Content from Web Page API",
    description: "Extract and translate article content from URLs into multiple languages with structured metadata for easy global access and understanding.",
    category: "Artificial Intelligence",
    atoms: "1K",
    slug: "extract-and-translate-article-content-from-web-page"
  },
  {
    name: "Extract and Compare Multiple Articles from Web Pages API",
    description: "Compare multiple articles from URLs to uncover shared topics, differences, and key insights with structured, easy-to-understand analysis.",
    category: "Artificial Intelligence",
    atoms: "1K",
    slug: "extract-and-compare-multiple-articles-from-web-pages"
  },
  {
    name: "Generate Keyword Clusters API",
    description: "Extract keyword clusters, entities, and topic insights from URLs to understand content themes and improve SEO and discoverability.",
    category: "Artificial Intelligence",
    atoms: "600",
    slug: "generate-keyword-clusters"
  },
  {
    name: "Extract and Analyze Content from Web Page API",
    description: "Extract and analyze web page content from URLs, returning structured data and insights for easy understanding and efficient processing.",
    category: "Artificial Intelligence",
    atoms: "600",
    slug: "extract-and-analyze-content-from-web-page"
  },
  {
    name: "Extract and Generate Editorial Digest from Multiple Web Pages API",
    description: "Generate structured editorial digests from multiple URLs with titles, intros, and summaries for quick, clear content consumption.",
    category: "Artificial Intelligence",
    atoms: "1K",
    slug: "extract-and-generate-editorial-digest-from-multiple-web-pages"
  },
  {
    name: "Extract Article Content from Web Page API",
    description: "Extract structured article content from URLs, including title, author, date, and full text for scalable content processing and analysis.",
    category: "Artificial Intelligence",
    atoms: "500",
    slug: "extract-article-content-from-web-page"
  },
  {
    name: "Extract Metadata From URL API",
    description: "Extract key metadata like title, author, date, and reading time from single or multiple URLs without fetching full content.",
    category: "Artificial Intelligence",
    atoms: "500",
    slug: "extract-metadata-from-url"
  },
  {
    name: "Summarize Multiple Article Insights API",
    description: "Generate clear, structured summaries from single or multiple article URLs, extracting key insights for quick and easy understanding.",
    category: "Artificial Intelligence",
    atoms: "1.5K",
    slug: "summarize-multiple-article-insights"
  },
  {
    name: "Webpage Technical Performance Audit API",
    description: "Audit website performance and SEO factors like SSL, robots.txt, and canonical tags. Identify issues and optimize for better visibility, speed, and user experience.",
    category: "Data Validation",
    atoms: "100",
    slug: "webpage-technical-performance-audit"
  }
]

export default function APIs() {
  return (
    <section id="apis" className="py-16 md:py-24 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/4 right-0 w-72 md:w-96 h-72 md:h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-72 md:w-96 h-72 md:h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Code2 className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            <span className="text-primary font-semibold text-sm md:text-base">Developer Tools</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            My <span className="text-primary glow-text">APIs</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base px-4">
            I make AI powered APIs for APYHUB, visit my APIs
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">27 APIs Published</span>
          </div>
        </motion.div>

        {/* APIs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {apis.map((api, index) => (
            <motion.div
              key={api.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 md:p-6 hover:border-primary/50 transition-all duration-300"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-3">
                  <Code2 className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>

                {/* Title */}
                <h3 className="font-semibold text-sm md:text-base mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {api.name}
                </h3>

                {/* Description */}
                <p className="text-xs md:text-sm text-muted-foreground">
                  {api.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All 27 APIs Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <motion.a
            href="https://apyhub.com/services/provider/namastesumalya"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-3 glow"
          >
            <span>View All 27 APIs on ApyHub</span>
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
