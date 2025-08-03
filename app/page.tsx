"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
  ChevronUp,
  ChevronDown,
  MessageCircle,
  Play,
  ExternalLink,
  Github,
  Mail,
  Instagram,
  Linkedin,
  Youtube,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

// Loading Screen Component
const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }])
  const [apple, setApple] = useState({ x: 15, y: 10 })
  const [applesEaten, setApplesEaten] = useState(0)
  const [direction, setDirection] = useState({ x: 1, y: 0 })

  // Separate useEffect for completion logic - runs only once
  useEffect(() => {
    const minLoadTime = 1000 // Minimum 1 second
    const maxLoadTime = 4000 // Maximum 4 seconds
    const startTime = Date.now()

    const checkCompletion = () => {
      const elapsed = Date.now() - startTime

      // Complete if minimum time passed AND at least 3 apples eaten
      // OR if maximum time reached
      if ((elapsed >= minLoadTime && applesEaten >= 3) || elapsed >= maxLoadTime) {
        onComplete()
        return true
      }
      return false
    }

    // Check completion every 100ms
    const completionInterval = setInterval(() => {
      if (checkCompletion()) {
        clearInterval(completionInterval)
      }
    }, 100)

    return () => {
      clearInterval(completionInterval)
    }
  }, [onComplete]) // Only depend on onComplete, not applesEaten

  // Separate useEffect for game logic
  useEffect(() => {
    const gameInterval = setInterval(() => {
      setSnake((currentSnake) => {
        const newSnake = [...currentSnake]
        const head = { ...newSnake[0] }

        // Calculate direction to apple (snake always moves toward apple)
        setDirection((currentDirection) => {
          const deltaX = apple.x - head.x
          const deltaY = apple.y - head.y

          // Determine best direction to reach apple
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            return { x: deltaX > 0 ? 1 : -1, y: 0 }
          } else {
            return { x: 0, y: deltaY > 0 ? 1 : -1 }
          }
        })

        return currentSnake
      })
    }, 200)

    return () => clearInterval(gameInterval)
  }, [apple])

  // Separate useEffect for snake movement
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setSnake((currentSnake) => {
        const newSnake = [...currentSnake]
        const head = { ...newSnake[0] }

        head.x += direction.x
        head.y += direction.y

        // Wrap around edges
        if (head.x > 20) head.x = 0
        if (head.x < 0) head.x = 20
        if (head.y > 10) head.y = 0
        if (head.y < 0) head.y = 10

        newSnake.unshift(head)

        // Check if apple is eaten
        if (head.x === apple.x && head.y === apple.y) {
          setApplesEaten((prev) => prev + 1)
          // Generate new apple position
          setApple({
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 10),
          })
        } else {
          newSnake.pop()
        }

        return newSnake
      })
    }, 150)

    return () => clearInterval(moveInterval)
  }, [direction, apple])

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Snake Game Animation */}
        <div className="relative w-80 h-40 mb-8 bg-gray-900 border-2 border-green-500 rounded-lg p-2">
          <div className="relative w-full h-full bg-black rounded">
            {/* Snake */}
            {snake.map((segment, index) => (
              <div
                key={index}
                className={`absolute w-3 h-3 rounded-sm transition-all duration-150 ${index === 0 ? "bg-green-400" : "bg-green-600"
                  }`}
                style={{
                  left: `${(segment.x / 20) * 100}%`,
                  top: `${(segment.y / 10) * 100}%`,
                }}
              />
            ))}

            {/* Apple */}
            <div
              className="absolute w-3 h-3 bg-red-500 rounded-full transition-all duration-150 flex items-center justify-center text-xs"
              style={{
                left: `${(apple.x / 20) * 100}%`,
                top: `${(apple.y / 10) * 100}%`,
              }}
            >
              🍎
            </div>
          </div>

          {/* Score */}
          <div className="absolute top-2 right-2 text-green-400 text-sm font-mono">Score: {applesEaten}</div>
        </div>

        <motion.p
          className="text-white text-xl font-semibold"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          Loading Portfolio...
        </motion.p>
        <p className="text-gray-400 mt-2">Snake is hunting apples to load your experience!</p>

        {/* Progress indicator */}
        <div className="mt-4 w-64 mx-auto bg-gray-700 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min((applesEaten / 3) * 100, 100)}%` }}
          />
        </div>
        <p className="text-gray-500 text-sm mt-2">
          {applesEaten < 3 ? `${3 - applesEaten} apples remaining...` : "Loading complete!"}
        </p>
      </div>
    </div>
  )
}

// Animated Counter Component
const AnimatedCounter = ({ end, suffix = "" }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = end / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [end])

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

// Hacker Terminal Component
const HackerTerminal = () => {
  const [currentLine, setCurrentLine] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const technologies = [
    { name: "HTML5 & CSS3", icon: "🌐", level: "Expert" },
    { name: "JavaScript (ES6+)", icon: "⚡", level: "Expert" },
    { name: "Python", icon: "🐍", level: "Advanced" },
    { name: "R Programming", icon: "📊", level: "Intermediate" },
    { name: "C Programming", icon: "⚙️", level: "Advanced" },
    { name: "Bash Scripting", icon: "💻", level: "Advanced" },
    { name: "Batch Scripting", icon: "🖥️", level: "Intermediate" },
    { name: "Next.js", icon: "⚛️", level: "Expert" },
    { name: "React.js", icon: "⚛️", level: "Expert" },
    { name: "Node.js Backend", icon: "🟢", level: "Advanced" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % technologies.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const currentTech = technologies[currentLine]
    setIsTyping(true)
    setDisplayedText("")

    const text = `Initializing ${currentTech.name}... [${currentTech.level}] ✓`
    let i = 0

    const typeInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1))
        i++
      } else {
        setIsTyping(false)
        clearInterval(typeInterval)
      }
    }, 50)

    return () => clearInterval(typeInterval)
  }, [currentLine])

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/50 rounded-xl p-6 font-mono text-sm shadow-2xl">
      {/* Terminal Header */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-green-500/30">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <span className="text-green-400 font-bold">SUMALYA_TERMINAL_v2.0</span>
        </div>
        <div className="text-green-400 text-xs">{new Date().toLocaleTimeString()}</div>
      </div>

      {/* Terminal Content */}
      <div className="space-y-3">
        <div className="text-green-400">
          <span className="text-blue-400">sumalya@portfolio</span>
          <span className="text-white">:</span>
          <span className="text-purple-400">~/skills</span>
          <span className="text-white">$ </span>
          <span className="text-yellow-400">scan --technologies --verbose</span>
        </div>

        <div className="text-gray-300 text-xs mb-4">Scanning technology stack... Please wait.</div>

        {/* Technology Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              className={`flex items-center space-x-2 p-2 rounded ${index === currentLine ? "bg-green-500/20 border border-green-500/50" : "bg-gray-800/50"
                }`}
              animate={{
                scale: index === currentLine ? 1.05 : 1,
                opacity: index <= currentLine ? 1 : 0.6,
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-lg">{tech.icon}</span>
              <div className="flex-1">
                <div className="text-white text-xs font-semibold">{tech.name}</div>
                <div
                  className={`text-xs ${tech.level === "Expert"
                    ? "text-green-400"
                    : tech.level === "Advanced"
                      ? "text-blue-400"
                      : "text-yellow-400"
                    }`}
                >
                  {tech.level}
                </div>
              </div>
              {index <= currentLine && <span className="text-green-400">✓</span>}
            </motion.div>
          ))}
        </div>

        {/* Current Process */}
        <div className="bg-black/50 p-3 rounded border border-green-500/30">
          <div className="text-green-400 text-xs mb-1">CURRENT PROCESS:</div>
          <div className="text-white">
            {displayedText}
            {isTyping && (
              <motion.span
                className="text-green-400"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
              >
                |
              </motion.span>
            )}
          </div>
        </div>

        {/* System Stats */}
        <div className="flex justify-between text-xs text-gray-400 pt-2 border-t border-green-500/20">
          <span>CPU: 100% Coding</span>
          <span>RAM: ∞ Creativity</span>
          <span>UPTIME: 4+ Years</span>
        </div>
      </div>
    </div>
  )
}

// Snake Game Animation Component for Web Games Section
const SnakeGameAnimation = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 5 }])
  const [apple, setApple] = useState({ x: 15, y: 5 })
  const [applesEaten, setApplesEaten] = useState(0)
  const [direction, setDirection] = useState({ x: 1, y: 0 })

  // Game logic for snake movement
  useEffect(() => {
    const gameInterval = setInterval(() => {
      setSnake((currentSnake) => {
        const newSnake = [...currentSnake]
        const head = { ...newSnake[0] }

        // Calculate direction to apple (snake always moves toward apple)
        setDirection((currentDirection) => {
          const deltaX = apple.x - head.x
          const deltaY = apple.y - head.y

          // Determine best direction to reach apple
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            return { x: deltaX > 0 ? 1 : -1, y: 0 }
          } else {
            return { x: 0, y: deltaY > 0 ? 1 : -1 }
          }
        })

        return currentSnake
      })
    }, 200)

    return () => clearInterval(gameInterval)
  }, [apple])

  // Snake movement
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setSnake((currentSnake) => {
        const newSnake = [...currentSnake]
        const head = { ...newSnake[0] }

        head.x += direction.x
        head.y += direction.y

        // Wrap around edges
        if (head.x > 20) head.x = 0
        if (head.x < 0) head.x = 20
        if (head.y > 10) head.y = 0
        if (head.y < 0) head.y = 10

        newSnake.unshift(head)

        // Check if apple is eaten
        if (head.x === apple.x && head.y === apple.y) {
          setApplesEaten((prev) => prev + 1)
          // Generate new apple position
          setApple({
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 10),
          })
        } else {
          newSnake.pop()
        }

        return newSnake
      })
    }, 150)

    return () => clearInterval(moveInterval)
  }, [direction, apple])

  return (
    <div className="mb-6 relative w-80 h-40 bg-gray-900 border-2 border-green-500 rounded-lg p-2 mx-auto">
      <div className="relative w-full h-full bg-black rounded">
        {/* Snake */}
        {snake.map((segment, index) => (
          <div
            key={index}
            className={`absolute w-3 h-3 rounded-sm transition-all duration-150 ${index === 0 ? "bg-green-400" : "bg-green-600"
              }`}
            style={{
              left: `${(segment.x / 20) * 100}%`,
              top: `${(segment.y / 10) * 100}%`,
            }}
          />
        ))}

        {/* Apple */}
        <div
          className="absolute w-3 h-3 bg-red-500 rounded-full transition-all duration-150 flex items-center justify-center text-xs"
          style={{
            left: `${(apple.x / 20) * 100}%`,
            top: `${(apple.y / 10) * 100}%`,
          }}
        >
          🍎
        </div>

        {/* Score Display */}
        <div className="absolute top-1 right-1 text-green-400 text-xs font-mono">
          Score: {applesEaten} | Total: 200K+
        </div>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const [loading, setLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [expandedWebsites, setExpandedWebsites] = useState(false)
  const [expandedExtensions, setExpandedExtensions] = useState(false)
  const [reviewText, setReviewText] = useState("")
  const [reviewerName, setReviewerName] = useState("")

  const currentYear = new Date().getFullYear()

  const menuItems = [
    "Home",
    "About me",
    "Projects",
    "Hire me",
    "Service charges",
    "Why me",
    "Technologies I know",
    "Testimonials",
    "Contact me",
  ]

  const websites = [
    { name: "Indus Wedding Films", url: "indusweddingfilms.in", image: "/websites/indusweddingfilms.png/" },
    { name: "Advocate Rohit Mathur", url: "advrohitmathur.in", image: "/websites/advrohitmathur.png" },
    {
      name: "Kronos Global Care Foundation",
      url: "kronosglobalcarefoundation.netlify.app",
      image: "/websites/kronos.png",
    },
    { name: "Homoeo Dipti", url: "homoeo-dipti.netlify.app", image: "/websites/homoeo-dipti.png" },
    { name: "Gandham Aroma", url: "gandham-aroma.netlify.app", image: "/websites/gandham-aroma.png" },
    { name: "Rydeonn", url: "rydeonn.com", image: "/websites/rydeonn.png" },
  ]

  const moreWebsites = [
    { name: "Papyruss", url: "papyruss.netlify.app", image: "/websites/papyruss.png/" },
    { name: "Codeeditorpro", url: "codeeditor.netlify.app", image: "/websites/codeeditorpro.png" },
    { name: "MSPaint", url: "mspaint.netlify.app", image: "/websites/mspaint.png" },
    { name: "Resume Builder", url: "resume-building-app.netlify.app", image: "/websites/resume.png" },
    { name: "RizzGPT", url: "r1zzgpt.netlify.app", image: "/websites/rizzgpt.png/" },
    { name: "Notepad", url: "r3dhulk.github.io/notepad", image: "/websites/notepad.png" },
  ]

  const extensions = [
    { name: "Youtube Dislike Counter", emoji: "👎" },
    { name: "No Shorts", emoji: "🚫" },
    { name: "Network Port Scanner", emoji: "🔍" },
    { name: "Request Interceptor", emoji: "🛡️" },
    { name: "Ultra Volume Booster", emoji: "🔊" },
    { name: "Link Abyss- detect broken link", emoji: "🔗" },
  ]

  const moreExtensions = [
    { name: "Cookie Popup blocker", emoji: "🍪" },
    { name: "Cookie editor", emoji: "✏️" },
    { name: "Tab Grouper", emoji: "📁" },
    { name: "Rename Tabs", emoji: "🏷️" },
    { name: "Privacy permission dashboard", emoji: "🔒" },
  ]

  const software = [
    { name: "Hulk", description: "No. 1 DDoS tool with GUI interface (150+ GitHub likes)", emoji: "💥" },
    { name: "Python for ethical hackers", description: "Comprehensive ethical hacking toolkit (over 50+ Github likes)", emoji: "🐍" },
    { name: "fsociety", description: "Tool featured in Mr. Robot TV series (over 50+ github likes)", emoji: "🤖" },
    { name: "Hulk Office", description: "Office productivity suite", emoji: "🏢" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.toLowerCase().replace(/\s+/g, "-"))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const handleReviewSubmit = () => {
    if (reviewText && reviewerName) {
      const message = `New Review from ${reviewerName}: ${reviewText}`
      const whatsappUrl = `https://wa.me/919330806233?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, "_blank")
      setReviewText("")
      setReviewerName("")
    }
  }

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.h1
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Sumalya
          </motion.h1>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/10 backdrop-blur-sm"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="hover:text-blue-400 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/40 backdrop-blur-md"
            >
              <div className="container mx-auto px-4 py-4 space-y-4">
                {menuItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left hover:text-blue-400 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            {/* Main Hero Card */}
            <div className="bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-blue-900/40 backdrop-blur-sm border border-white/10 rounded-3xl p-12 text-center">
              {/* Main Title */}
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                Sumalya Chatterjee
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl mb-8 text-gray-300 font-medium">
                India's #1 NextJS & ReactJS Frontend Developer
              </p>

              {/* Description */}
              <div className="max-w-4xl mx-auto mb-12">
                <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                  Specialized in creating production-ready websites with on-page SEO optimization, security-focused
                  development, and seamless API integrations. From client sketches to fully functional web applications.
                </p>
              </div>

              {/* Statistics Cards */}
              <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-3xl mx-auto">
                {/* Games Stats */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                  <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">
                    <AnimatedCounter end={200000} suffix="+" />
                  </div>
                  <p className="text-gray-300 text-lg">Game Plays on Y8, Poki & GamePix</p>
                </div>

                {/* Extensions Stats */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                  <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                    <AnimatedCounter end={4000} suffix="+" />
                  </div>
                  <p className="text-gray-300 text-lg">Daily Firefox Extension Users</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button
                  onClick={() => window.open("https://wa.me/919330806233", "_blank")}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold border-0"
                >
                  Start Project Discussion
                </Button>
                <Button
                  onClick={() => scrollToSection("projects")}
                  variant="outline"
                  className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-4 rounded-xl text-lg font-semibold bg-transparent"
                >
                  View My Work
                </Button>
              </div>

              {/* Scroll Down Arrow */}
              <motion.div
                className="flex justify-center"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <ChevronDown className="text-gray-400 w-6 h-6" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about-me" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </h2>

            <div className="grid lg:grid-cols-3 gap-12 items-start">
              {/* Profile Image */}
              <div className="lg:col-span-1">
                <div className="relative">
                  <img
                    src="/sumalya.jpg"
                    alt="Sumalya Chatterjee"
                    className="rounded-2xl shadow-2xl w-full max-w-sm mx-auto border-4 border-blue-500/30"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    Available 24/7 ⚡
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Introduction */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <span className="text-3xl mr-3">👋</span>
                    Hi, I'm Sumalya!
                  </h3>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    India's leading <span className="text-blue-400 font-bold">Next.js & React.js</span> frontend
                    developer with expertise in
                    <span className="text-green-400 font-bold"> on-page SEO</span> and
                    <span className="text-purple-400 font-bold"> web security</span>.
                  </p>
                </div>

                {/* Key Achievements */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-2xl p-6">
                    <div className="flex items-center mb-3">
                      <span className="text-3xl mr-3">🎮</span>
                      <h4 className="text-xl font-bold text-white">Game Developer</h4>
                    </div>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center">
                        <span className="text-green-400 mr-2">•</span>
                        <span className="text-green-400 font-bold text-xl">200,000+</span> total gameplays
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-400 mr-2">•</span>
                        Published on Y8, Poki & GamePix
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-400 mr-2">•</span>
                        20+ interactive web games created
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-2xl p-6">
                    <div className="flex items-center mb-3">
                      <span className="text-3xl mr-3">🔧</span>
                      <h4 className="text-xl font-bold text-white">Extension Expert</h4>
                    </div>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center">
                        <span className="text-purple-400 mr-2">•</span>
                        <span className="text-purple-400 font-bold text-xl">4,000+</span> daily active users
                      </li>
                      <li className="flex items-center">
                        <span className="text-purple-400 mr-2">•</span>
                        30+ Firefox browser extensions
                      </li>
                      <li className="flex items-center">
                        <span className="text-purple-400 mr-2">•</span>
                        Solutions for real-world problems
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Core Skills */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                    <span className="text-3xl mr-3">💻</span>
                    Core Expertise
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-blue-500/20 rounded-lg p-3">
                        <span className="text-white font-semibold">Next.js Development</span>
                        <span className="text-blue-400 font-bold">Expert</span>
                      </div>
                      <div className="flex items-center justify-between bg-blue-500/20 rounded-lg p-3">
                        <span className="text-white font-semibold">React.js Applications</span>
                        <span className="text-blue-400 font-bold">Expert</span>
                      </div>
                      <div className="flex items-center justify-between bg-green-500/20 rounded-lg p-3">
                        <span className="text-white font-semibold">SEO Optimization</span>
                        <span className="text-green-400 font-bold">Expert</span>
                      </div>
                      <div className="flex items-center justify-between bg-red-500/20 rounded-lg p-3">
                        <span className="text-white font-semibold">Web Security</span>
                        <span className="text-red-400 font-bold">Advanced</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-yellow-500/20 rounded-lg p-3">
                        <span className="text-white font-semibold">API Integration</span>
                        <span className="text-yellow-400 font-bold">Advanced</span>
                      </div>
                      <div className="flex items-center justify-between bg-purple-500/20 rounded-lg p-3">
                        <span className="text-white font-semibold">Game Development</span>
                        <span className="text-purple-400 font-bold">Expert</span>
                      </div>
                      <div className="flex items-center justify-between bg-pink-500/20 rounded-lg p-3">
                        <span className="text-white font-semibold">Browser Extensions</span>
                        <span className="text-pink-400 font-bold">Expert</span>
                      </div>
                      <div className="flex items-center justify-between bg-cyan-500/20 rounded-lg p-3">
                        <span className="text-white font-semibold">Responsive Design</span>
                        <span className="text-cyan-400 font-bold">Expert</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* What I Can Do */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                    <span className="text-3xl mr-3">🚀</span>
                    What I Can Build For You
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { icon: "🎨", title: "From Sketches", desc: "Convert your ideas to reality" },
                      { icon: "🎯", title: "Figma Designs", desc: "Pixel-perfect implementations" },
                      { icon: "🔄", title: "Website Clones", desc: "Recreate any existing site" },
                      { icon: "🔌", title: "API Integration", desc: "Connect with any service" },
                      { icon: "📱", title: "CMS Integration", desc: "Sanity, WordPress, etc." },
                      { icon: "🔥", title: "Firebase Backend", desc: "Real-time applications" },
                      { icon: "🛒", title: "E-commerce", desc: "WooCommerce, ZohoCommerce" },
                      { icon: "⚡", title: "Fast Delivery", desc: "6 hours to production" },
                      { icon: "🔒", title: "Secure Code", desc: "Hack-proof websites" },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="text-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <div className="text-2xl mb-2">{item.icon}</div>
                        <h5 className="text-white font-semibold text-sm mb-1">{item.title}</h5>
                        <p className="text-gray-400 text-xs">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Client Testimonial Quote */}
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl p-6 text-center">
                  <div className="text-4xl mb-3">💬</div>
                  <blockquote className="text-xl font-semibold text-white mb-2">"Perfect!"</blockquote>
                  <p className="text-gray-300">What every client says after receiving their website</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Projects
          </h2>

          {/* Websites */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Websites</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {websites.map((website, index) => (
                <motion.div
                  key={website.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                    <CardContent className="p-6">
                      <img
                        src={website.image || "/placeholder.svg"}
                        alt={website.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <h4 className="text-xl font-bold mb-2 text-white">{website.name}</h4>
                      <p className="text-gray-400 mb-4">{website.url}</p>
                      <Button
                        onClick={() => window.open(`https://${website.url}`, "_blank")}
                        className="w-full bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30"
                      >
                        <ExternalLink className="mr-2" size={16} />
                        Visit Site
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {expandedWebsites && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
              >
                {moreWebsites.map((website, index) => (
                  <Card
                    key={website.name}
                    className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <img
                        src={website.image || "/placeholder.svg"}
                        alt={website.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <h4 className="text-xl font-bold mb-2 text-white">{website.name}</h4>
                      <p className="text-gray-400 mb-4">{website.url}</p>
                      <Button
                        onClick={() => window.open(`https://${website.url}`, "_blank")}
                        className="w-full bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30"
                      >
                        <ExternalLink className="mr-2" size={16} />
                        Visit Site
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            )}

            <div className="text-center">
              <Button
                onClick={() => setExpandedWebsites(!expandedWebsites)}
                className="bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30"
              >
                {expandedWebsites ? "Show Less" : "See More"}
              </Button>
            </div>

            <div className="text-center mt-8">
              <p className="text-lg text-blue-400 font-semibold">
                Every project is open source and delivered to happy clients
              </p>
            </div>
          </div>

          {/* Web Games */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Web Games</h3>
            <div className="text-center">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-md mx-auto">
                <CardContent className="p-8">
                  <motion.div
                    className="text-6xl mb-4"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    🎮
                  </motion.div>
                  <h4 className="text-xl font-bold mb-4 text-white">Play My Web Games</h4>
                  <p className="text-gray-400 mb-6">Available on Y8, Poki, and GamePix</p>

                  {/* Snake Game Animation - Same as Loading Screen */}
                  <SnakeGameAnimation />

                  <Button
                    onClick={() => window.open("https://www.y8.com/studios/sumalya", "_blank")}
                    className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30"
                  >
                    <Play className="mr-2" size={16} />
                    Play on Y8
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Browser Extensions */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Browser Extensions</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {extensions.map((extension, index) => (
                <motion.div
                  key={extension.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-4">{extension.emoji}</div>
                      <h4 className="text-lg font-bold text-white">{extension.name}</h4>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {expandedExtensions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
              >
                {moreExtensions.map((extension, index) => (
                  <Card
                    key={extension.name}
                    className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-4">{extension.emoji}</div>
                      <h4 className="text-lg font-bold text-white">{extension.name}</h4>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            )}

            <div className="text-center mb-8">
              <Button
                onClick={() => setExpandedExtensions(!expandedExtensions)}
                className="bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30"
              >
                {expandedExtensions ? "Show Less" : "See More"}
              </Button>
            </div>

            <div className="text-center">
              <p className="text-lg text-blue-400 font-semibold mb-4">I make solutions for my own problems</p>
              <Button
                onClick={() => window.open("https://addons.mozilla.org/en-US/firefox/user/18514210/", "_blank")}
                className="bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30"
              >
                <ExternalLink className="mr-2" size={16} />
                Visit Firefox Add-ons
              </Button>
            </div>
          </div>

          {/* Software */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Software</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {software.map((soft, index) => (
                <motion.div
                  key={soft.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="text-3xl mr-4">{soft.emoji}</div>
                        <div>
                          <h4 className="text-xl font-bold text-white">{soft.name}</h4>
                          <p className="text-gray-400">{soft.description}</p>
                        </div>
                      </div>
                      <Button
                        onClick={() => window.open("https://github.com/r3dhulk", "_blank")}
                        className="w-full bg-gray-500/20 hover:bg-gray-500/30 border border-gray-500/30"
                      >
                        <Github className="mr-2" size={16} />
                        Visit Tool
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-lg text-blue-400 font-semibold mb-4">Follow my work on GitHub</p>
              <Button
                onClick={() => window.open("https://github.com/r3dhulk", "_blank")}
                className="bg-gray-500/20 hover:bg-gray-500/30 border border-gray-500/30"
              >
                <Github className="mr-2" size={16} />
                GitHub Profile
              </Button>
            </div>
          </div>

          {/* Learning Section */}
          <div className="text-center">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h4 className="text-2xl font-bold mb-4 text-white">Currently Learning</h4>
                <p className="text-lg text-gray-300 mb-6">
                  I'm learning about coding web APIs and will make APIs soon!
                </p>
                <div className="space-y-4">
                  <p className="text-lg font-semibold text-white">Hire me via:</p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button
                      onClick={() => window.open("https://wa.me/919330806233", "_blank")}
                      className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30"
                    >
                      <MessageCircle className="mr-2" size={16} />
                      WhatsApp
                    </Button>
                    <Button className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30">Fiverr</Button>
                    <Button className="bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30">
                      PeoplePerHour
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Charges */}
      <section id="service-charges" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Service Charges
            </h2>

            <Card className="bg-gradient-to-br from-gray-900/90 to-blue-900/90 backdrop-blur-sm border border-blue-500/30">
              <CardContent className="p-8">
                {/* Pricing Header */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <span className="text-2xl text-gray-500 line-through">₹1500</span>
                    <span className="text-5xl font-bold text-green-400">₹1000</span>
                  </div>
                  <p className="text-xl text-gray-300">Per Hour for Next.js Web App Development</p>
                </div>

                {/* Two Column Layout */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Included FREE */}
                  <div className="space-y-4">
                    <div className="flex items-center mb-4">
                      <span className="text-green-400 text-xl mr-2">✅</span>
                      <h3 className="text-xl font-bold text-green-400">Included FREE:</h3>
                    </div>
                    <ul className="space-y-3">
                      {[
                        "On-page SEO optimization",
                        "Domain configuration",
                        "Hosting setup",
                        "Responsive design",
                        "Security implementation",
                      ].map((item, index) => (
                        <li key={index} className="flex items-center text-gray-300">
                          <span className="text-green-400 mr-3">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quick Delivery */}
                  <div className="space-y-4">
                    <div className="flex items-center mb-4">
                      <span className="text-yellow-400 text-xl mr-2">⚡</span>
                      <h3 className="text-xl font-bold text-yellow-400">Quick Delivery:</h3>
                    </div>
                    <ul className="space-y-3">
                      {[
                        "6 hours for production-ready website",
                        "Unlimited website additions",
                        "Source code included",
                        "Up to 3 revisions done for free",
                        "Post-delivery support",
                      ].map((item, index) => (
                        <li key={index} className="flex items-center text-gray-300">
                          <span className="text-yellow-400 mr-3">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Custom Charges Message */}
                <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-center mb-2">
                    <MessageCircle className="text-purple-400 mr-2" size={20} />
                    <p className="text-lg font-semibold text-purple-400">
                      WhatsApp or Telegram me to propose custom charges for your project!
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => window.open("https://wa.me/919330806233", "_blank")}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full flex items-center justify-center"
                  >
                    <MessageCircle className="mr-2" size={20} />
                    WhatsApp Me
                  </Button>
                  <Button
                    onClick={() => window.open("https://telegram.me/Sumalya_001", "_blank")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full flex items-center justify-center"
                  >
                    <Send className="mr-2" size={20} />
                    Telegram Me
                  </Button>
                </div>
                {/* Combined Revision and Domain Note */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-orange-400 bg-orange-400/10 border border-orange-400/30 rounded-lg p-3">
                    <span className="font-semibold">Note:</span> I charge ₹300/- for any modification after completing 3
                    free revisions under post-delivery support. Domain and hosting charges are not included.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Why Choose Me Section */}
      <section id="why-me" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Why Choose Me?
            </h2>

            <p className="text-xl text-gray-300 text-center mb-12">
              Experience the difference with my lightning-fast delivery and premium quality development
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Ultra-Fast Delivery */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 border-l-4 border-purple-500">
                <div className="w-12 h-12 mb-4 p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Lightning-Fast Delivery</h3>
                <p className="text-gray-300">
                  Production-ready websites delivered in under 6 hours without compromising quality.
                </p>
              </div>

              {/* Expert Frontend Development */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 border-l-4 border-sky-500">
                <div className="w-12 h-12 mb-4 p-2 bg-red-500/20 rounded-lg group-hover:bg-red-500/30 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                    <path d="M13 2v7h7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Expert Frontend Development</h3>
                <p className="text-gray-300">
                  20+ Nextjs and Reactjs projects, 100+ html projects including 20+ web games and 30+ browser extensions.
                </p>
              </div>

              {/* Post-Delivery Care */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 border-l-4 border-red-500">
                <div className="w-12 h-12 mb-4 p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Post-Delivery Care</h3>
                <p className="text-gray-300">
                  I not only build reputation in this industry but also build relations. You can connect with me anytime.
                </p>
              </div>

              {/* SEO Optimized */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 border-l-4 border-purple-500">
                <div className="w-12 h-12 mb-4 p-2 bg-yellow-500/20 rounded-lg group-hover:bg-yellow-500/30 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">SEO Optimized</h3>
                <p className="text-gray-300">
                  Built-in On page SEO optimization for better Google ranking right from launch.
                </p>
              </div>

              {/* Premium Quality */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 border-l-4 border-blue-500">
                <div className="w-12 h-12 mb-4 p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 12v10H4V12M22 7H2v5h20V7zM12 22V7M12 7H7.5a2.5 2.5 0 1 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Premium Quality</h3>
                <p className="text-gray-300">
                  Industry-standard websites with enterprise-grade security at less fees with fast delivery.
                </p>
              </div>

              {/* Client-Centric Approach */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 border-l-4 border-red-500">
                <div className="w-12 h-12 mb-4 p-2 bg-cyan-500/20 rounded-lg group-hover:bg-cyan-500/30 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Client-Centric Approach</h3>
                <p className="text-gray-300">
                  I can draw websites from your imaginations, sketches and screenshots.
                </p>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies-i-know" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Technologies I Know
            </h2>

            <HackerTerminal />
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Testimonials
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {[
                {
                  name: "Abhirup Sen",
                  company: "Indus Wedding Films",
                  text: "Perfect! Sumalya delivered exactly what I needed. The website is fast, secure, and looks amazing.",
                  rating: 5,
                  image: "/users/logo.jpeg",
                },
                {
                  name: "Advocate Rohit Mathur",
                  company: "Rohit Mathur & Associates",
                  text: "Amazing work quality and fast delivery. My portfolio website is now live and looks stunning!",
                  rating: 5,
                  image: "/users/advrohit.jpeg",
                },
                {
                  name: "Anuska Sen",
                  company: "Digital Marketing Agency",
                  text: "The website is secure, fast, and looks incredible. SEO optimization was outstanding!",
                  rating: 5,
                  image: "/users/ankitasaha.jpeg",
                },
                {
                  name: "Sayantani Gupta",
                  company: "Healthcare Clinic",
                  text: "Best developer I have worked with. Perfect results every time. Highly professional!",
                  rating: 5,
                  image: "/users/sneha.jpeg",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full mr-4 border-2 border-blue-400"
                        />
                        <div>
                          <h4 className="font-bold text-white">{testimonial.name}</h4>
                          <p className="text-sm text-gray-400">{testimonial.company}</p>
                        </div>
                      </div>
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-xl">
                            ⭐
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Write a Review */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-center text-white">Write a Review</h3>
                <div className="space-y-4">
                  <Input
                    placeholder="Your Name"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                  />
                  <Textarea
                    placeholder="Share your experience..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400 min-h-[120px]"
                  />
                  <Button
                    onClick={handleReviewSubmit}
                    className="w-full bg-green-500 hover:bg-green-600 text-white border-0"
                    disabled={!reviewText || !reviewerName}
                  >
                    <Send className="mr-2" size={16} />
                    Send Review via WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-me" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Contact Me
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <MessageCircle size={24} />,
                  label: "WhatsApp",
                  value: "+91 9330806233",
                  link: "https://wa.me/919330806233",
                },
                {
                  icon: <Mail size={24} />,
                  label: "Email",
                  value: "namastesumalya@gmail.com",
                  link: "mailto:namastesumalya@gmail.com",
                },
                {
                  icon: <Send size={24} />,
                  label: "Telegram",
                  value: "@Sumalya_001",
                  link: "https://telegram.me/Sumalya_001",
                },
                {
                  icon: <Youtube size={24} />,
                  label: "YouTube",
                  value: "Mr Sumalya",
                  link: "https://youtube.com/mrsumalya",
                },
                {
                  icon: <Instagram size={24} />,
                  label: "Instagram",
                  value: "@redhulk.in",
                  link: "https://instagram.com/redhulk.in",
                },
                {
                  icon: <Linkedin size={24} />,
                  label: "LinkedIn",
                  value: "Sumalya Chatterjee",
                  link: "https://www.linkedin.com/in/sumalya-chatterjee-676b31262",
                },
              ].map((contact, index) => (
                <motion.div
                  key={contact.label}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                    onClick={() => window.open(contact.link, "_blank")}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-blue-400 mb-4 flex justify-center">{contact.icon}</div>
                      <h3 className="text-lg font-bold mb-2 text-white">{contact.label}</h3>
                      <p className="text-gray-300">{contact.value}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 border-t border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <h3 className="text-xl font-bold text-white">Sumalya Chatterjee</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Expert Next.js & React.js developer with 4+ years of experience. Providing exceptional web development
                services with dedication and integrity.
              </p>
              <div className="flex space-x-4">
                {[
                  {
                    icon: <MessageCircle size={18} />,
                    link: "https://wa.me/919330806233",
                    color: "hover:text-green-400",
                  },
                  {
                    icon: <Mail size={18} />,
                    link: "mailto:namastesumalya@gmail.com",
                    color: "hover:text-blue-400",
                  },
                  { icon: <Github size={18} />, link: "https://github.com/r3dhulk", color: "hover:text-gray-400" },
                  {
                    icon: <Linkedin size={18} />,
                    link: "https://www.linkedin.com/in/sumalya-chatterjee-676b31262",
                    color: "hover:text-blue-400",
                  },
                ].map((social, index) => (
                  <button
                    key={index}
                    onClick={() => window.open(social.link, "_blank")}
                    className={`text-gray-400 ${social.color} transition-colors p-2 rounded-full bg-white/5 hover:bg-white/10`}
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { name: "Home", id: "home" },
                  { name: "About Me", id: "about-me" },
                  { name: "Projects", id: "projects" },
                  { name: "Service charges", id: "service-charges" },
                  { name: "Contact me", id: "contact-me" },
                ].map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Development Services</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Next.js Development</li>
                <li>React.js Applications</li>
                <li>SEO Optimization</li>
                <li>Web Game Development</li>
                <li>Browser Extensions</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Contact Info</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3 text-gray-300">
                  <MessageCircle size={16} className="text-green-400" />
                  <span>+91 9330806233</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail size={16} className="text-blue-400" />
                  <span>namastesumalya@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Send size={16} className="text-blue-400" />
                  <span>@Sumalya_001</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <span className="text-yellow-400">⏰</span>
                  <span>Available 24/7</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/10 mt-8 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                © {currentYear} Sumalya Chatterjee & Associates. All rights reserved.
              </p>
              <p className="text-gray-400 text-sm">Professional Web Development Services | Next.js Expert | India</p>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              onClick={scrollToTop}
              className="fixed bottom-6 left-6 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg z-50"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Back to Top"
            >
              <ChevronUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* WhatsApp Float Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <motion.button
            onClick={() => window.open("https://wa.me/919330806233", "_blank")}
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Chat on WhatsApp"
          >
            <MessageCircle size={24} />
          </motion.button>
        </div>
      </footer>
    </div>
  )
}
