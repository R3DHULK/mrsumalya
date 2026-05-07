"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ExternalLink, Star, Search, ChevronDown, ChevronUp } from "lucide-react"

const games = [
  { name: "Whack a Mole Arena", rating: "8.1", slug: "whack_a_mole_arena", thumb: "https://cdn2.y8.com/cloudimage/401901/file/w180h135_webp-45657ce96e7dc85e51e86b3794588018.webp", isNew: true },
  { name: "Play Square Up with Friends", rating: "8.1", slug: "play_square_up_with_friends", thumb: "https://cdn2.y8.com/cloudimage/401781/file/w180h135_webp-c196d242a81eb005617e8739e88a0300.webp", isNew: true },
  { name: "Play Memory Match with Friends", rating: "8.2", slug: "play_memory_match_with_friends", thumb: "https://cdn2.y8.com/cloudimage/401605/file/w180h135_webp-11414f4bf908bd69d8370cd6e1bec7a2.webp", isNew: true },
  { name: "Play Mancala with Friends", rating: "8.5", slug: "play_mancala_with_friends", thumb: "https://cdn2.y8.com/cloudimage/401529/file/w180h135_webp-0721bd875dd58b4523816f026c555dff.webp", isNew: true },
  { name: "Play Twisted Tic-Tac-Toe with Friends", rating: "8.5", slug: "play_twisted_tic_tac_toe_with_friends", thumb: "https://cdn2.y8.com/cloudimage/401519/file/w180h135_webp-8d9d3724f0dd912f680459f372ede170.webp", isNew: true },
  { name: "Play Dots and Boxes with Friends", rating: "8.8", slug: "play_dots_and_boxes_with_friends", thumb: "https://cdn2.y8.com/cloudimage/401325/file/w180h135_webp-7635856ceb65b8b2d22a96388589cb34.webp", isNew: true },
  { name: "Play Connect 4 with Friends", rating: "8.7", slug: "play_connect_4_with_friends", thumb: "https://cdn2.y8.com/cloudimage/401211/file/w180h135_webp-b1a1ad6efaa744ee389a18a80cb173e0.webp", isNew: true },
  { name: "Play Chess with Friends", rating: "9.1", slug: "play_chess_with_friends", thumb: "https://cdn2.y8.com/cloudimage/400995/file/w180h135_webp-319c242e688f4118773a086151a817d1.webp", isNew: false },
  { name: "F1 Turbo Rush 3D", rating: "8.9", slug: "f1_turbo_rush_3d", thumb: "https://cdn2.y8.com/cloudimage/400747/file/w180h135_webp-0db918d87739e3d01b733c456ec91dbc.webp", isNew: false },
  { name: "Play Checkers with Friends", rating: "8.8", slug: "play_checkers_with_friends", thumb: "https://cdn2.y8.com/cloudimage/400827/file/w180h135_webp-eb6089421f222199c3f693e75758e09d.webp", isNew: false },
  { name: "Math Duel", rating: "9.4", slug: "math_duel", thumb: "https://cdn2.y8.com/cloudimage/400407/file/w180h135_webp-9a95c8ceb6edae80c0abe9246142b525.webp", isNew: false },
  { name: "Pen Fight", rating: "10.0", slug: "pen_fight_html5", thumb: "https://cdn2.y8.com/cloudimage/400347/file/w180h135_webp-1d4ffba9ed36b6c2487698497a09754d.webp", isNew: false },
  { name: "Tree Hop", rating: "9.9", slug: "tree_hop", thumb: "https://cdn2.y8.com/cloudimage/400331/file/w180h135_webp-ef198ced18ca83db2d40e2e052806ebe.webp", isNew: false },
  { name: "Tentacle Trouble", rating: "10.0", slug: "tentacle_trouble", thumb: "https://cdn2.y8.com/cloudimage/400027/file/w180h135_webp-742d0d41c2261148aec4af46eeb9a895.webp", isNew: false },
  { name: "River Fisher", rating: "10.0", slug: "river_fisher", thumb: "https://cdn2.y8.com/cloudimage/399917/file/w180h135_webp-32e807596072f386923fb50f70f396e5.webp", isNew: false },
  { name: "Not A Dumb Chess", rating: "7.4", slug: "not_a_dumb_chess", thumb: "https://cdn2.y8.com/cloudimage/17457/file/w180h135_webp-bb3969bd9639f42901cb634e2083f83c.webp", isNew: false },
  { name: "Card Golf Solitaire", rating: "9.2", slug: "card_golf_solitaire", thumb: "https://cdn2.y8.com/cloudimage/17093/file/w180h135_webp-9e245809f6d7afc47bfb8dc7e1de7c9d.webp", isNew: false },
  { name: "Clock Patience Solitaire", rating: "9.1", slug: "clock_patience_solitaire", thumb: "https://cdn2.y8.com/cloudimage/17229/file/w180h135_webp-968b4aa58a3fc3e66d23e849254713b9.webp", isNew: false },
  { name: "Aces Up", rating: "9.3", slug: "aces_up", thumb: "https://cdn2.y8.com/cloudimage/11595/file/w180h135_webp-6b77b3d2ad31e5b91e9dad0c148083fb.webp", isNew: false },
  { name: "Emoji Math", rating: "9.5", slug: "emoji_math", thumb: "https://cdn2.y8.com/cloudimage/15601/file/w180h135_webp-b552e40370e8c79b44a0df56fb5bd193.webp", isNew: false },
  { name: "Card Hearts", rating: "9.6", slug: "card_hearts", thumb: "https://cdn2.y8.com/cloudimage/16529/file/w180h135_webp-58e2c8f11fb9ca8a1dbef33f6d6c570b.webp", isNew: false },
  { name: "Simple Bowling", rating: "9.2", slug: "simple_bowling_", thumb: "https://cdn2.y8.com/cloudimage/400865/file/w180h135_webp-c83cba566808add023262b8bed6185d0.webp", isNew: false },
  { name: "Simple Freecell", rating: "8.3", slug: "simple_freecell", thumb: "https://cdn2.y8.com/cloudimage/16293/file/w180h135_webp-b3df151c56d972ce3768f705db0bfcfc.webp", isNew: false },
  { name: "Sokoban Panda", rating: "9.6", slug: "sokoban_panda", thumb: "https://cdn2.y8.com/cloudimage/16057/file/w180h135_webp-3debd8b373f831a74dafab7d73d42d81.webp", isNew: false },
  { name: "Menja", rating: "9.8", slug: "menja", thumb: "https://cdn2.y8.com/cloudimage/12341/file/w180h135_webp-5e08bbb593cc46e3ed981f1025d82ba7.webp", isNew: false },
  { name: "Real Solitaire", rating: "7.7", slug: "real_solitaire", thumb: "https://cdn2.y8.com/cloudimage/16015/file/w180h135_webp-73545503c722f21bcd8a1e3ac098c981.webp", isNew: false },
  { name: "Sliding Puzzle", rating: "8.5", slug: "sliding_puzzle", thumb: "https://cdn2.y8.com/cloudimage/12315/file/w180h135_webp-895c011e6e975526a569668906e5dfb0.webp", isNew: false },
  { name: "A Dumb Chess", rating: "9.4", slug: "a_dumb_chess", thumb: "https://cdn2.y8.com/cloudimage/12361/file/w180h135_webp-671f879ac1c33ed8318c2ce6389a27b2.webp", isNew: false },
  { name: "Memory Card Match", rating: "9.8", slug: "memory_card_match", thumb: "https://cdn2.y8.com/cloudimage/12267/file/w180h135_webp-6ec7bc6f4ed02a14656d98776967e5d1.webp", isNew: false },
  { name: "Tower Block", rating: "9.8", slug: "tower_block", thumb: "https://cdn2.y8.com/cloudimage/12323/file/w180h135_webp-b370169e1d63b1cedef28f8e7f8fbd46.webp", isNew: false },
  { name: "3D Pinball Space Cadet", rating: "9.0", slug: "3d_pinball_space_cadet", thumb: "https://cdn2.y8.com/cloudimage/11515/file/w180h135_webp-e38e77879aaf291ee33d228f46eed95c.webp", isNew: false },
  { name: "Simple Sudoku", rating: "9.6", slug: "simple_sudoku", thumb: "https://cdn2.y8.com/cloudimage/11587/file/w180h135_webp-5a9fe32f399f7392a33ec7f307ecd661.webp", isNew: false },
  { name: "Rabbit Rush", rating: "9.5", slug: "rabbit_rush", thumb: "https://cdn2.y8.com/cloudimage/11385/file/w180h135_webp-5c0e769a6e843bd3497fa7ebe0bc7fc0.webp", isNew: false },
  { name: "Cosmic Dash", rating: "9.5", slug: "cosmic_dash", thumb: "https://cdn2.y8.com/cloudimage/10185/file/w180h135_webp-2db48b97f0a03b8849d511a6433bcf5d.webp", isNew: false },
  { name: "X Ray Orb", rating: "9.4", slug: "x_ray_orb", thumb: "https://cdn2.y8.com/cloudimage/10177/file/w180h135_webp-05eceb5fd32736f4a43ac6320f76e2ac.webp", isNew: false },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
}

export default function Games() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [searchQuery, setSearchQuery] = useState("")
  const [visibleCount, setVisibleCount] = useState(10)

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const displayedGames = filteredGames.slice(0, visibleCount)
  const hasMore = visibleCount < filteredGames.length
  const canCollapse = visibleCount > 10

  const handleViewMore = () => {
    setVisibleCount((prev) => Math.min(prev + 10, filteredGames.length))
  }

  const handleViewLess = () => {
    setVisibleCount(10)
  }

  return (
    <section id="games" className="py-20 md:py-32 relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 perspective-container">
        <div className="absolute top-20 left-10 w-32 h-32 orb-3d">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-xl" />
        </div>
        <div className="absolute bottom-40 right-20 w-48 h-48 orb-3d" style={{ animationDelay: "-3s" }}>
          <div className="w-full h-full rounded-full bg-gradient-to-br from-accent/15 to-primary/10 blur-2xl" />
        </div>
        <div className="absolute top-1/3 right-10 w-40 h-40 ring-3d opacity-30">
          <div className="w-full h-full border-4 border-primary/30 rounded-full" />
        </div>
        <div className="absolute inset-0 grid-pattern opacity-15" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-medium mb-4 block">My Portfolio</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            Featured <span className="text-primary glow-text">Games</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-8 text-pretty">
            Explore my collection of 35 browser-based games, enjoyed by over 272,156 players worldwide.
            Each game is crafted with love and designed for maximum fun.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setVisibleCount(10)
              }}
              className="w-full pl-12 pr-4 py-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </motion.div>

        {/* Games Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {displayedGames.map((game) => (
            <motion.a
              key={game.slug}
              href={`https://www.y8.com/games/${game.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              {/* Game Thumbnail */}
              <div className="relative overflow-hidden bg-secondary" style={{ aspectRatio: "4/3" }}>
                <img
                  src={game.thumb}
                  alt={game.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = `/placeholder.svg?height=135&width=180`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* New Badge */}
                {game.isNew && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-semibold rounded">
                    NEW
                  </div>
                )}

                {/* Rating Badge */}
                <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 bg-background/80 backdrop-blur-sm rounded text-xs font-medium">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  {game.rating}
                </div>

                {/* Play Icon on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center glow">
                    <ExternalLink className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
              </div>

              {/* Game Info */}
              <div className="p-3">
                <h3 className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                  {game.name}
                </h3>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* View More / View Less Buttons */}
        {(hasMore || canCollapse) && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12 flex justify-center gap-4"
          >
            {hasMore && (
              <motion.button
                onClick={handleViewMore}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 glow"
              >
                <span>View More ({filteredGames.length - visibleCount} remaining)</span>
                <ChevronDown className="w-4 h-4" />
              </motion.button>
            )}
            {canCollapse && (
              <motion.button
                onClick={handleViewLess}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-secondary/50 transition-colors flex items-center gap-2"
              >
                <span>View Less</span>
                <ChevronUp className="w-4 h-4" />
              </motion.button>
            )}
          </motion.div>
        )}

        {/* No Results */}
        {filteredGames.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">No games found matching &quot;{searchQuery}&quot;</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
