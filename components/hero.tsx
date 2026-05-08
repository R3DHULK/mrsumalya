"use client"

import { motion } from "framer-motion"
import { Play, ChevronDown, Star } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

interface Y8Stats {
  gamesPublished: number
  totalGameplays: number
  averageRating: number | null
}

function formatNumber(n: number): string {
  return n.toLocaleString("en-IN")
}

export default function Hero() {
  const [stats, setStats] = useState<Y8Stats | null>(null)

  useEffect(() => {
    fetch("/api/y8")
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) {
          setStats({
            gamesPublished: data.gamesPublished,
            totalGameplays: data.totalGameplays,
            averageRating: data.averageRating ?? null,
          })
        }
      })
      .catch(() => {/* silently fall back to null */})
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-bg"
    >
      {/* 3D Background Elements */}
      <div className="absolute inset-0 perspective-container">
        <motion.div
          className="absolute top-1/4 left-[10%] w-64 h-64 orb-3d"
          animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-transparent blur-3xl" />
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 right-[10%] w-80 h-80 orb-3d"
          animate={{ rotateX: [360, 0], rotateY: [360, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-tl from-accent/25 via-primary/15 to-transparent blur-3xl" />
        </motion.div>

        <div className="absolute top-1/3 right-[15%] w-48 h-48">
          <motion.div
            className="w-full h-full border-2 border-primary/20 rounded-full"
            animate={{ rotateX: 60, rotateY: [0, 360] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{ transformStyle: "preserve-3d" }}
          />
        </div>

        <div className="absolute bottom-1/3 left-[15%] w-32 h-32">
          <motion.div
            className="w-full h-full border-2 border-accent/20 rounded-full"
            animate={{ rotateX: -60, rotateY: [360, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            style={{ transformStyle: "preserve-3d" }}
          />
        </div>

        <motion.div
          className="absolute top-[20%] right-[25%] w-16 h-16"
          animate={{ rotateX: [0, 360], rotateY: [0, 360], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/10 rounded-lg backdrop-blur-sm border border-primary/10" />
        </motion.div>

        <motion.div
          className="absolute bottom-[25%] left-[20%] w-12 h-12"
          animate={{ rotateX: [360, 0], rotateY: [360, 0], y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="w-full h-full bg-gradient-to-br from-accent/20 to-primary/10 rounded-lg backdrop-blur-sm border border-accent/10" />
        </motion.div>
      </div>

      {/* Animated Background Grid */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{
              left: `${(i * 37 + 13) % 100}%`,
              top: `${(i * 53 + 7) % 100}%`,
            }}
            animate={{
              y: [0, -200],
              x: [0, ((i % 5) - 2) * 15],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: (i % 4) + 4,
              repeat: Infinity,
              delay: (i % 4),
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col items-center text-center">

          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mb-8"
          >
            <div className="absolute inset-0 rounded-full bg-primary/30 blur-3xl scale-125" />
            <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-primary/50 glow">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sumalya-aHDwIskus6CBYZFQPvO1HFdysDGwmF.jpeg"
                alt="Sumalya Chatterjee"
                fill
                className="object-cover"
                priority
              />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 border-2 border-dashed border-primary/30 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8 border border-accent/20 rounded-full"
            />
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-balance"
          >
            <span className="text-foreground">Sumalya</span>{" "}
            <span className="text-primary glow-text">Chatterjee</span>
          </motion.h1>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl text-muted-foreground text-base md:text-lg mb-10 leading-relaxed text-pretty"
          >
            Hi, I am Sumalya Chatterjee, a small town boy with lots of game ideas. Thanks to Y8 Games
            to give my solo games a platform. Hope you all love my games.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-row items-center justify-center gap-8 sm:gap-16 mb-12"
          >
            {/* Games Published */}
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary glow-text mb-1 tabular-nums"
              >
                {stats ? formatNumber(stats.gamesPublished) : "—"}
              </motion.div>
              <div className="text-xs sm:text-sm md:text-base text-muted-foreground">Games Published</div>
            </div>

            <div className="w-px h-12 bg-border" />

            {/* Total Gameplays */}
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9, type: "spring" }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary glow-text mb-1 tabular-nums"
              >
                {stats ? formatNumber(stats.totalGameplays) : "—"}
              </motion.div>
              <div className="text-xs sm:text-sm md:text-base text-muted-foreground">Total Gameplays</div>
            </div>

            <div className="w-px h-12 bg-border" />

            {/* Average Rating */}
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.0, type: "spring" }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary glow-text mb-1 tabular-nums flex items-center justify-center gap-1"
              >
                {stats?.averageRating != null ? stats.averageRating.toFixed(1) : "—"}
                <Star className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 fill-primary text-primary" />
              </motion.div>
              <div className="text-xs sm:text-sm md:text-base text-muted-foreground">Avg. Review</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto"
          >
            <motion.a
              href="#games"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors glow"
            >
              <Play className="w-5 h-5" />
              Explore Games
            </motion.a>
            <motion.a
              href="mailto:namastesumalya@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-primary/50 text-foreground rounded-lg font-semibold hover:bg-primary/10 transition-colors flex items-center justify-center"
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#games"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="text-sm mb-2">Scroll Down</span>
            <ChevronDown className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
