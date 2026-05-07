"use client"

import { motion } from "framer-motion"
import { Mail, Youtube, Instagram, Gamepad2, ExternalLink } from "lucide-react"

export default function Contact() {
  return (
    <section id="contact" className="py-16 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="text-primary font-medium mb-3 block text-sm uppercase tracking-widest">Follow Along</span>
          <h2 className="text-3xl md:text-5xl font-bold text-balance">
            We Play Our <span className="text-primary glow-text">Games</span>
          </h2>
        </motion.div>

        {/* Social + Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {/* YouTube Card */}
          <motion.a
            href="https://www.youtube.com/@SumalyaStudios"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="group p-6 md:p-8 bg-card/50 backdrop-blur-sm rounded-2xl border border-border hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-red-500/20 flex items-center justify-center mb-5 border border-red-500/30 group-hover:scale-110 transition-transform">
              <Youtube className="w-6 h-6 md:w-7 md:h-7 text-red-500" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-1 group-hover:text-red-400 transition-colors">
              YouTube
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Watch gameplay videos, tutorials and studio updates on our channel.
            </p>
            <div className="flex items-center gap-2 text-red-400 text-sm font-medium">
              <span>@SumalyaStudios</span>
              <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
            </div>
          </motion.a>

          {/* Instagram Card */}
          <motion.a
            href="https://instagram.com/sumalyastudios"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="group p-6 md:p-8 bg-card/50 backdrop-blur-sm rounded-2xl border border-border hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-pink-500/20 flex items-center justify-center mb-5 border border-pink-500/30 group-hover:scale-110 transition-transform">
              <Instagram className="w-6 h-6 md:w-7 md:h-7 text-pink-500" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-1 group-hover:text-pink-400 transition-colors">
              Instagram
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Behind-the-scenes content, game screenshots and development sneak peeks.
            </p>
            <div className="flex items-center gap-2 text-pink-400 text-sm font-medium">
              <span>@sumalyastudios</span>
              <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
            </div>
          </motion.a>

          {/* Y8 Profile Card */}
          <motion.a
            href="https://y8.com/studios/sumalya"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="group p-6 md:p-8 bg-card/50 backdrop-blur-sm rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 sm:col-span-2 lg:col-span-1"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-5 border border-primary/30 group-hover:scale-110 transition-transform">
              <Gamepad2 className="w-6 h-6 md:w-7 md:h-7 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
              Play on Y8
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              All 35 games live on Y8.com. Play for free, leave a review and follow for new releases.
            </p>
            <div className="flex items-center gap-2 text-primary text-sm font-medium">
              <span>y8.com/studios/sumalya</span>
              <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
            </div>
          </motion.a>
        </motion.div>

        {/* Get In Touch CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 p-6 md:p-8 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl border border-primary/20"
        >
          <div className="flex items-center gap-3 text-center sm:text-left">
            <Mail className="w-5 h-5 text-primary flex-shrink-0 hidden sm:block" />
            <div>
              <h3 className="font-semibold text-base md:text-lg mb-0.5">Have a question or idea?</h3>
              <p className="text-sm text-muted-foreground">Drop a mail and I&apos;ll get back to you.</p>
            </div>
          </div>
          <motion.a
            href="mailto:namastesumalya@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors glow flex items-center gap-2 text-sm md:text-base"
          >
            <Mail className="w-4 h-4" />
            Get In Touch
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
