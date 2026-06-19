import { motion } from 'framer-motion'
import { useState } from 'react'
import SectionHeader from './SectionHeader'
import { instagramFeed, getAllLabels, getFeaturedPosts } from '../data/instagram'

export default function Instagram() {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [isLoaded, setIsLoaded] = useState({})
  const [activeLabel, setActiveLabel] = useState('All')
  const [displayPosts, setDisplayPosts] = useState(instagramFeed)

  const allLabels = ['All', ...getAllLabels()]

  const handleImageLoad = (index) => {
    setIsLoaded(prev => ({ ...prev, [index]: true }))
  }

  const filterPosts = (label) => {
    setActiveLabel(label)
    if (label === 'All') {
      setDisplayPosts(instagramFeed)
    } else {
      const filtered = instagramFeed.filter(post => post.label === label)
      setDisplayPosts(filtered)
    }
  }

  return (
    <section id="instagram" style={{ background: '#080808', padding: '7rem 2rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <SectionHeader 
          eyebrow="Follow Our Journey" 
          title="Stories in" 
          titleEm="Frames" 
          center 
        />

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
            marginTop: '2rem',
            marginBottom: '2rem',
          }}
        >
          {allLabels.map((label) => (
            <motion.button
              key={label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => filterPosts(label)}
              style={{
                fontFamily: "'Jost',sans-serif",
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '0.4rem 1rem',
                borderRadius: '2px',
                border: activeLabel === label 
                  ? '1px solid rgba(201,168,76,0.4)' 
                  : '1px solid rgba(255,255,255,0.05)',
                background: activeLabel === label 
                  ? 'rgba(201,168,76,0.1)' 
                  : 'transparent',
                color: activeLabel === label 
                  ? '#c9a84c' 
                  : 'rgba(248,244,239,0.4)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {label}
            </motion.button>
          ))}
        </motion.div>

        {/* Instagram Grid */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
          gap: '1.5rem',
          marginTop: '1rem',
        }} className="ig-grid">
          {displayPosts.map((item, i) => (
            <motion.a
              key={item.id || i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: (i % 4) * 0.08, duration: 0.5 }}
              style={{ 
                aspectRatio: '1/1', 
                position: 'relative', 
                overflow: 'hidden', 
                cursor: 'pointer',
                textDecoration: 'none',
                background: '#1a1a1a',
                borderRadius: '2px',
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                style={{ 
                  width: '100%', 
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg,#1a0f08,#2a1808)',
                }}
              >
                <img 
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  onLoad={() => handleImageLoad(i)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: isLoaded[i] ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                  }}
                />
                
                {/* Loading Skeleton */}
                {!isLoaded[i] && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg,#1a0f08,#2a1808)',
                  }}>
                    <svg viewBox="0 0 100 100" width="60" height="60">
                      <text x="50" y="55" textAnchor="middle"
                        fill="#c9a84c" fillOpacity=".15" fontSize="42" 
                        fontFamily="Georgia" fontStyle="italic">h</text>
                    </svg>
                  </div>
                )}
              </motion.div>

              {/* Hover Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute', 
                  inset: 0, 
                  background: 'rgba(8,8,8,.8)',
                  backdropFilter: 'blur(4px)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  flexDirection: 'column', 
                  gap: '0.5rem',
                  padding: '1rem',
                  textAlign: 'center',
                }}
              >
                {/* Instagram Icon */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="#c9a84c" stroke="none" />
                </svg>
                
                <span style={{ 
                  fontFamily: "'Jost',sans-serif", 
                  fontSize: '0.8rem', 
                  letterSpacing: '0.1em', 
                  color: '#f8f4ef',
                  fontWeight: 300,
                }}>
                  ❤ {item.likes} likes
                </span>
                
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  alignItems: 'center',
                }}>
                  <span style={{ 
                    fontFamily: "'Jost',sans-serif", 
                    fontSize: '0.6rem', 
                    letterSpacing: '0.15em', 
                    color: 'rgba(248,244,239,.7)',
                    textTransform: 'uppercase',
                  }}>
                    {item.label}
                  </span>
                  <span style={{
                    width: '3px',
                    height: '3px',
                    borderRadius: '50%',
                    background: 'rgba(248,244,239,.3)',
                  }} />
                  <span style={{ 
                    fontFamily: "'Jost',sans-serif", 
                    fontSize: '0.6rem', 
                    color: 'rgba(248,244,239,.5)',
                  }}>
                    💬 {item.comments}
                  </span>
                </div>

                {/* View on Instagram Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  style={{
                    marginTop: '0.5rem',
                    padding: '0.4rem 1.2rem',
                    border: '1px solid rgba(201,168,76,0.3)',
                    borderRadius: '2px',
                    fontFamily: "'Jost',sans-serif",
                    fontSize: '0.5rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#c9a84c',
                    background: 'rgba(201,168,76,0.05)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  View Post
                </motion.div>
              </motion.div>

              {/* Instagram Badge - Top Left */}
              <div style={{
                position: 'absolute',
                top: '0.75rem',
                left: '0.75rem',
                zIndex: 2,
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(4px)',
                padding: '0.25rem 0.6rem',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="#c9a84c" stroke="none" />
                </svg>
                <span style={{
                  fontFamily: "'Jost',sans-serif",
                  fontSize: '0.45rem',
                  color: 'rgba(248,244,239,.6)',
                  letterSpacing: '0.05em',
                }}>
                  Instagram
                </span>
              </div>

              {/* Like Badge - Bottom Right */}
              <div style={{
                position: 'absolute',
                bottom: '0.75rem',
                right: '0.75rem',
                zIndex: 2,
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(4px)',
                padding: '0.2rem 0.5rem',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}>
                <span style={{
                  color: '#c9a84c',
                  fontSize: '0.6rem',
                }}>❤</span>
                <span style={{
                  fontFamily: "'Jost',sans-serif",
                  fontSize: '0.5rem',
                  color: 'rgba(248,244,239,.6)',
                }}>
                  {item.likes}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Follow Link */}
        <motion.a
          href="https://www.instagram.com/_raw_films?igsh=Y21uc3V0NmVxMXJy"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{ 
            display: 'block',
            textAlign: 'center', 
            marginTop: '3rem', 
            fontFamily: "'Jost',sans-serif", 
            fontSize: '0.65rem', 
            letterSpacing: '0.3em', 
            textTransform: 'uppercase', 
            color: '#c9a84c',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.color = '#e8d5a3'
            e.target.style.letterSpacing = '0.4em'
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#c9a84c'
            e.target.style.letterSpacing = '0.3em'
          }}
        >
          @rawfilms.in - Follow on Instagram
        </motion.a>

        {/* Post Count */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          style={{
            textAlign: 'center',
            marginTop: '1rem',
            fontFamily: "'Jost',sans-serif",
            fontSize: '0.5rem',
            letterSpacing: '0.15em',
            color: 'rgba(248,244,239,.2)',
          }}
        >
          {displayPosts.length} posts • Updated daily
        </motion.p>
      </div>

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          section#instagram {
            padding: 4rem 1rem !important;
          }
          .ig-grid {
            grid-template-columns: repeat(auto-fill, minmax(min(100%, 160px), 1fr)) !important;
            gap: 0.75rem !important;
          }
        }

        @media (max-width: 480px) {
          section#instagram {
            padding: 3rem 0.75rem !important;
          }
          .ig-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.5rem !important;
          }
        }
      `}</style>
    </section>
  )
}