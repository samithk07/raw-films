import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import SectionHeader from './SectionHeader'
import { films } from '../data/films'

function FilmCard({ film, index, onVideoClick }) {
  const [isHovering, setIsHovering] = useState(false)
  const videoRef = useRef(null)

  const handleMouseEnter = () => {
    setIsHovering(true)
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Autoplay prevented:', error)
      })
    }
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  const handleVideoClick = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    onVideoClick(film)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: (index % 3) * 0.1 + 0.2, duration: 0.7 }}
      style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        aspectRatio: '16/9', 
        cursor: 'pointer', 
        background: '#242424',
        borderRadius: '2px',
      }}
      className="film-card group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleVideoClick}
    >
      <motion.div
        className="img-inner"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6 }}
        style={{ 
          width: '100%', 
          height: '100%', 
          background: film.bg, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {film.videoSrc ? (
          <video
            ref={videoRef}
            src={film.videoSrc}
            poster={film.poster}
            muted
            loop={false}
            playsInline
            preload="metadata"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        ) : (
          <svg viewBox="0 0 400 225" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute' }}>
            <text x="200" y="100" textAnchor="middle" fill="#c9a84c" fillOpacity=".08"
              fontFamily="Cormorant Garamond" fontSize="80" fontStyle="italic">heart</text>
            <text x="200" y="165" textAnchor="middle" fill="#c9a84c" fillOpacity=".4"
              fontFamily="Jost" fontSize="10" letterSpacing="6">{film.couple.toUpperCase()}</text>
          </svg>
        )}
        
        {/* Play Button Overlay */}
        <motion.div
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ 
            opacity: isHovering ? 1 : 0.6,
            scale: isHovering ? 1.1 : 1
          }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%,-50%)',
            width: 60, 
            height: 60, 
            border: '1px solid rgba(201,168,76,.6)', 
            borderRadius: '50%',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(4px)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <div style={{ 
            borderLeft: '16px solid #c9a84c', 
            borderTop: '9px solid transparent', 
            borderBottom: '9px solid transparent', 
            marginLeft: 4,
          }} />
        </motion.div>
      </motion.div>

      {/* Bottom Gradient Overlay */}
      <motion.div
        style={{
          position: 'absolute', 
          inset: 0,
          background: 'linear-gradient(180deg, transparent 30%, rgba(8,8,8,.9))',
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'flex-end', 
          padding: '1.5rem',
          pointerEvents: 'none',
        }}
      >
        <p style={{ 
          fontFamily: "'Jost',sans-serif", 
          fontSize: 'clamp(0.5rem, 0.6vw, 0.6rem)', 
          letterSpacing: '0.2em', 
          textTransform: 'uppercase', 
          color: '#c9a84c', 
          marginBottom: '0.3rem', 
          fontWeight: 300 
        }}>
          {film.type} - {film.year}
        </p>
        <h3 style={{ 
          fontFamily: "'Cormorant Garamond', serif", 
          fontSize: 'clamp(1rem, 1.3vw, 1.3rem)', 
          fontWeight: 300,
          color: '#f8f4ef',
          margin: 0,
        }}>
          {film.title}
        </h3>
        <p style={{
          fontFamily: "'Jost',sans-serif",
          fontSize: 'clamp(0.55rem, 0.65vw, 0.65rem)',
          color: 'rgba(248,244,239,.5)',
          marginTop: '0.2rem',
          fontWeight: 300,
          letterSpacing: '0.1em',
        }}>
          {film.couple}
        </p>
      </motion.div>

      {/* Duration Badge */}
      <div style={{
        position: 'absolute', 
        top: '1rem', 
        right: '1rem',
        fontFamily: "'Jost',sans-serif", 
        fontSize: 'clamp(0.5rem, 0.6vw, 0.6rem)', 
        letterSpacing: '0.1em',
        color: 'rgba(248,244,239,.7)', 
        background: 'rgba(0,0,0,.5)', 
        padding: '0.2rem 0.5rem',
        borderRadius: '2px',
        backdropFilter: 'blur(4px)',
        zIndex: 5,
        pointerEvents: 'none',
      }}>
        {film.duration}
      </div>
    </motion.div>
  )
}

function VideoPopup({ film, onClose }) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (film && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Play prevented:', error)
      })
    }
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [film])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!film) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.92)',
        backdropFilter: 'blur(20px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        cursor: 'pointer',
      }}
      onClick={handleOverlayClick}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1200px',
          aspectRatio: '16/9',
          background: '#000',
          borderRadius: '4px',
          overflow: 'hidden',
          cursor: 'default',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            zIndex: 20,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#fff',
            fontSize: '1.5rem',
            transition: 'all 0.3s ease',
          }}
        >
          ✕
        </motion.button>

        {/* Video */}
        <video
          ref={videoRef}
          src={film.videoSrc}
          poster={film.poster}
          controls
          autoPlay
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />

        {/* Video Info Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '3rem 2rem 1.5rem',
            background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%)',
            pointerEvents: 'none',
          }}
        >
          <p style={{
            fontFamily: "'Jost',sans-serif",
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#c9a84c',
            marginBottom: '0.3rem',
            fontWeight: 300,
          }}>
            {film.type} - {film.year}
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            fontWeight: 300,
            color: '#f8f4ef',
            margin: 0,
          }}>
            {film.title}
          </h2>
          <p style={{
            fontFamily: "'Jost',sans-serif",
            fontSize: 'clamp(0.8rem, 1vw, 1rem)',
            color: 'rgba(248,244,239,.6)',
            marginTop: '0.3rem',
            fontWeight: 300,
          }}>
            {film.couple}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function Films() {
  const [selectedFilm, setSelectedFilm] = useState(null)

  return (
    <>
      <section id="films" style={{ background: '#0f0f0f', padding: '7rem 2rem' }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
        }}>
          <SectionHeader
            eyebrow="Cinematic Films"
            title="Wedding"
            titleEm="Films"
            description="Each film is a love letter - scored to silence and starlight, crafted for forever."
          />

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
            gap: '2rem',
            marginTop: '4rem',
          }}>
            {films.map((film, i) => (
              <FilmCard 
                key={film.id} 
                film={film} 
                index={i} 
                onVideoClick={setSelectedFilm}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Video Popup */}
      <AnimatePresence>
        {selectedFilm && (
          <VideoPopup 
            film={selectedFilm} 
            onClose={() => setSelectedFilm(null)} 
          />
        )}
      </AnimatePresence>

      {/* Responsive CSS */}
      <style jsx>{`
        @media (max-width: 768px) {
          section#films {
            padding: 4rem 1rem !important;
          }
          .film-card {
            aspect-ratio: 16/10 !important;
          }
        }
        @media (max-width: 480px) {
          section#films {
            padding: 3rem 0.75rem !important;
          }
          .film-card {
            aspect-ratio: 16/11 !important;
          }
        }
      `}</style>
    </>
  )
}