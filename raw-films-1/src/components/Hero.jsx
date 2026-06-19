import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  const scrollToStories = () => {
    document.getElementById('stories')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Handle video loading and playback
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      // Try to play the video
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setVideoLoaded(true)
          })
          .catch((error) => {
            console.log('Video autoplay prevented:', error)
            // Show fallback background if video doesn't play
            setVideoLoaded(false)
          })
      }
    }
  }, [])

  return (
    <section
      id="hero"
      style={{ 
        height: '100vh', 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        overflow: 'hidden',
        background: '#080808', // Fallback background
      }}
    >
      {/* Video Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero-poster.jpg" // Add a poster image
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            transform: 'translateX(-50%) translateY(-50%)',
            objectFit: 'cover',
            opacity: videoLoaded ? 1 : 0,
            transition: 'opacity 1s ease',
          }}
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
          <source src="/videos/hero-background.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>

        {/* Fallback gradient when video doesn't load */}
        {!videoLoaded && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #0d0a07 0%, #1a120a 30%, #0d0a07 60%, #080808 100%)',
            }}
          />
        )}
      </div>

      {/* Dark overlay for better text readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%)',
          zIndex: 1,
        }}
      />

      {/* Animated lines */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 1 }}>
        {[20, 50, 80].map((left, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              left: `${left}%`,
              width: 1,
              height: '60%',
              background: 'linear-gradient(180deg, transparent, rgba(201,168,76,.06), transparent)',
            }}
            animate={{ y: [0, 40, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: i * 2 }}
          />
        ))}
      </div>

      {/* Grain */}
      <div className="grain-overlay" style={{ zIndex: 1 }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 2rem', maxWidth: 900 }}>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 'clamp(0.5rem, 0.6vw, 0.6rem)',
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
            color: '#c9a84c',
            marginBottom: '2rem',
          }}
        >
          Est. 2018 · Kerala, India
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="font-serif"
          style={{
            fontSize: 'clamp(3.5rem, 12vw, 10rem)',
            fontWeight: 300,
            lineHeight: 0.9,
            letterSpacing: '0.08em',
            marginBottom: '2rem',
            color: '#f8f4ef',
            textShadow: '0 2px 40px rgba(0,0,0,0.5)',
          }}
        >
          RAW
          <br />
          <em style={{ color: '#c9a84c', fontStyle: 'italic' }}>FILMS</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.4, 0, 0.2, 1] }}
          className="font-serif"
          style={{
            fontSize: 'clamp(0.8rem, 2vw, 1.15rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(248,244,239,0.8)',
            letterSpacing: '0.05em',
            lineHeight: 1.6,
            maxWidth: 500,
            margin: '0 auto 3rem',
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          }}
        >
          Crafting Timeless Love Stories Through Cinema & Photography
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.4, 0, 0.2, 1] }}
          style={{ 
            display: 'flex', 
            gap: 'clamp(0.8rem, 1.2vw, 1.2rem)', 
            justifyContent: 'center', 
            flexWrap: 'wrap' 
          }}
        >
          <button 
            className="btn-gold" 
            onClick={scrollToStories}
            style={{
              padding: 'clamp(0.7rem, 1vw, 0.9rem) clamp(1.5rem, 2.5vw, 2.5rem)',
              fontSize: 'clamp(0.55rem, 0.65vw, 0.65rem)',
            }}
          >
            Explore Stories
          </button>
          <button
            className="btn-outline-gold"
            onClick={() => navigate('/contact')}
            style={{
              padding: 'clamp(0.7rem, 1vw, 0.9rem) clamp(1.5rem, 2.5vw, 2.5rem)',
              fontSize: 'clamp(0.55rem, 0.65vw, 0.65rem)',
            }}
          >
            Book Your Wedding
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer',
          zIndex: 2,
        }}
        onClick={scrollToStories}
      >
        <span style={{ 
          fontFamily: "'Jost',sans-serif", 
          fontSize: 'clamp(0.5rem, 0.55vw, 0.55rem)', 
          letterSpacing: '0.35em', 
          textTransform: 'uppercase', 
          color: '#8a8580' 
        }}>
          Scroll
        </span>
        <motion.div
          style={{ 
            width: 1, 
            height: 40, 
            background: 'linear-gradient(180deg, #c9a84c, transparent)' 
          }}
          animate={{ scaleY: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Add custom styles */}
      <style>{`
        .grain-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0.3;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
        }

        .btn-gold {
          background: #c9a84c;
          color: #080808;
          border: none;
          font-family: "'Jost', sans-serif";
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .btn-gold:hover {
          background: #d9b85c;
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(201, 168, 76, 0.3);
        }

        .btn-outline-gold {
          background: transparent;
          border: 1px solid #c9a84c;
          color: #c9a84c;
          font-family: "'Jost', sans-serif";
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .btn-outline-gold:hover {
          background: rgba(201, 168, 76, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(201, 168, 76, 0.1);
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .btn-gold,
          .btn-outline-gold {
            width: 100%;
            max-width: 280px;
            padding: 0.9rem 2rem !important;
            font-size: 0.6rem !important;
          }
        }
      `}</style>
    </section>
  )
}