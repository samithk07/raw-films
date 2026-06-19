import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { galleryItems, galleryCategories } from '../data/gallery'
import SectionHeader from './SectionHeader'

function Lightbox({ item, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', 
        inset: 0, 
        background: 'rgba(0,0,0,.95)',
        zIndex: 1000, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute', 
          top: '1.5rem', 
          right: '1.5rem',
          background: 'none', 
          border: 'none', 
          color: '#f8f4ef',
          fontSize: '2rem', 
          cursor: 'pointer',
          transition: 'color 0.3s',
          zIndex: 2,
        }}
        onMouseEnter={(e) => e.target.style.color = '#c9a84c'}
        onMouseLeave={(e) => e.target.style.color = '#f8f4ef'}
      >
        ✕
      </button>
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        style={{
          width: 'min(900px, 95vw)',
          maxHeight: 'min(700px, 85vh)',
          background: '#0a0a0a',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '4px',
        }}
      >
        {item.image ? (
          <div style={{
            width: '100%',
            height: '100%',
            minHeight: '400px',
            maxHeight: 'min(700px, 85vh)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              loading="lazy"
            />
          </div>
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              minHeight: '400px',
              background: item.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              padding: '2rem',
            }}
          >
            <svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <text x="400" y="300" textAnchor="middle" dominantBaseline="middle"
                fill="#c9a84c" fillOpacity=".2" fontFamily="Cormorant Garamond" fontSize="200" fontStyle="italic">♥</text>
              <text x="400" y="480" textAnchor="middle" fill="#c9a84c" fillOpacity=".7"
                fontFamily="Jost" fontSize="16" letterSpacing="10">{item.title.toUpperCase()}</text>
              <text x="400" y="510" textAnchor="middle" fill="#c9a84c" fillOpacity=".4"
                fontFamily="Jost" fontSize="10" letterSpacing="5">{item.category.toUpperCase()}</text>
            </svg>
          </div>
        )}
        
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '2rem',
            background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.8))',
            pointerEvents: 'none',
          }}
        >
          <p style={{ 
            fontFamily: "'Cormorant Garamond', serif", 
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', 
            fontWeight: 300, 
            color: '#f8f4ef',
            marginBottom: '0.3rem',
          }}>
            {item.title}
          </p>
          <p style={{ 
            fontFamily: "'Jost',sans-serif", 
            fontSize: '0.65rem', 
            letterSpacing: '0.3em', 
            textTransform: 'uppercase', 
            color: '#c9a84c' 
          }}>
            {item.category}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [lightboxItem, setLightboxItem] = useState(null)
  const [loadedImages, setLoadedImages] = useState({})
  const [imageErrors, setImageErrors] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(4)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const containerRef = useRef(null)
  const autoPlayRef = useRef(null)

  const filtered = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(i => i.category === activeFilter)

  // Calculate items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth
      if (width < 640) setItemsPerView(1)
      else if (width < 768) setItemsPerView(2)
      else if (width < 1024) setItemsPerView(3)
      else setItemsPerView(4)
    }
    
    updateItemsPerView()
    window.addEventListener('resize', updateItemsPerView)
    return () => window.removeEventListener('resize', updateItemsPerView)
  }, [])

  const totalItems = filtered.length
  const maxIndex = Math.max(0, totalItems - itemsPerView)

  // Auto-play functionality
  useEffect(() => {
    if (totalItems > itemsPerView) {
      autoPlayRef.current = setInterval(() => {
        if (!isTransitioning) {
          setCurrentIndex(prev => {
            const next = prev + 1
            if (next > maxIndex) {
              // Smooth loop back to start
              return 0
            }
            return next
          })
        }
      }, 3000) // Change slide every 3 seconds
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [totalItems, itemsPerView, maxIndex, isTransitioning])

  const handlePrev = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex(prev => Math.max(0, prev - 1))
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const handleNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1))
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const handleDotClick = (index) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const visibleItems = filtered.slice(currentIndex, currentIndex + itemsPerView)

  const handleImageLoad = (id) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }))
  }

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }))
  }

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
  }

  const handleMouseLeave = () => {
    if (totalItems > itemsPerView) {
      autoPlayRef.current = setInterval(() => {
        if (!isTransitioning) {
          setCurrentIndex(prev => {
            const next = prev + 1
            if (next > maxIndex) {
              return 0
            }
            return next
          })
        }
      }, 3000)
    }
  }

  // Variants for smooth rotation
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.8,
    }),
  }

  // Get visible items with smooth rotation
  const getVisibleItems = () => {
    const items = []
    const total = filtered.length
    
    for (let i = 0; i < itemsPerView; i++) {
      const index = (currentIndex + i) % total
      items.push({ ...filtered[index], displayIndex: i })
    }
    return items
  }

  const smoothItems = getVisibleItems()

  return (
    <section 
      id="gallery" 
      style={{ background: '#080808', padding: 'clamp(3rem, 7vw, 7rem) clamp(1rem, 4vw, 4rem)' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <SectionHeader eyebrow="Portfolio" title="The" titleEm="Gallery" />

      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        style={{ 
          display: 'flex', 
          gap: 'clamp(0.5rem, 1vw, 1rem)', 
          margin: 'clamp(2rem, 3vw, 3rem) 0', 
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {galleryCategories.map(cat => (
          <button
            key={cat.value}
            onClick={() => {
              setActiveFilter(cat.value)
              setCurrentIndex(0)
              setIsTransitioning(false)
            }}
            style={{
              background: activeFilter === cat.value ? '#c9a84c' : 'none',
              border: `1px solid ${activeFilter === cat.value ? '#c9a84c' : 'rgba(248,244,239,.1)'}`,
              color: activeFilter === cat.value ? '#080808' : 'rgba(248,244,239,.5)',
              fontFamily: "'Jost',sans-serif",
              fontSize: 'clamp(0.5rem, 0.6vw, 0.6rem)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: 'clamp(0.4rem, 0.5vw, 0.5rem) clamp(0.8rem, 1.2vw, 1.2rem)',
              cursor: 'pointer',
              transition: 'all .3s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              if (activeFilter !== cat.value) {
                e.target.style.borderColor = '#c9a84c'
                e.target.style.color = '#c9a84c'
              }
            }}
            onMouseLeave={(e) => {
              if (activeFilter !== cat.value) {
                e.target.style.borderColor = 'rgba(248,244,239,.1)'
                e.target.style.color = 'rgba(248,244,239,.5)'
              }
            }}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      {/* Horizontal Gallery with Smooth Rotation */}
      <div style={{ position: 'relative', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Navigation Arrows */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            style={{
              position: 'absolute',
              left: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              background: 'rgba(201,168,76,0.2)',
              border: '1px solid rgba(201,168,76,0.3)',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#c9a84c',
              fontSize: '1.5rem',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(201,168,76,0.4)'
              e.target.style.transform = 'translateY(-50%) scale(1.1)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(201,168,76,0.2)'
              e.target.style.transform = 'translateY(-50%) scale(1)'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}

        {currentIndex < maxIndex && (
          <button
            onClick={handleNext}
            style={{
              position: 'absolute',
              right: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              background: 'rgba(201,168,76,0.2)',
              border: '1px solid rgba(201,168,76,0.3)',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#c9a84c',
              fontSize: '1.5rem',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(201,168,76,0.4)'
              e.target.style.transform = 'translateY(-50%) scale(1.1)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(201,168,76,0.2)'
              e.target.style.transform = 'translateY(-50%) scale(1)'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}

        {/* Gallery Items with Smooth Rotation */}
        <div
          ref={containerRef}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${itemsPerView}, 1fr)`,
            gap: '4px',
            overflow: 'hidden',
          }}
          className="gallery-horizontal"
        >
          <AnimatePresence mode="wait" custom={1}>
            {smoothItems.map((item) => (
              <motion.div
                key={`${item.id}-${currentIndex}`}
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.5 },
                  scale: { duration: 0.5 },
                }}
                onClick={() => setLightboxItem(item)}
                style={{ 
                  position: 'relative', 
                  overflow: 'hidden', 
                  cursor: 'pointer',
                  background: item.gradient,
                  width: '100%',
                  aspectRatio: '3/4',
                  borderRadius: '4px',
                }}
                className="img-zoom"
              >
                {item.image && !imageErrors[item.id] ? (
                  <div style={{ 
                    position: 'relative', 
                    width: '100%', 
                    height: '100%',
                    overflow: 'hidden',
                  }}>
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block',
                        opacity: loadedImages[item.id] ? 1 : 0,
                        transition: 'opacity 0.5s ease',
                      }}
                      loading="lazy"
                      onLoad={() => handleImageLoad(item.id)}
                      onError={() => handleImageError(item.id)}
                    />
                    
                    {!loadedImages[item.id] && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: item.gradient,
                          animation: 'shimmer 1.5s infinite',
                        }}
                      />
                    )}
                  </div>
                ) : (
                  <div
                    style={{ 
                      height: '100%', 
                      background: item.gradient, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      width: '100%',
                    }}
                  >
                    <svg viewBox="0 0 300 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <text x="150" y="50%" textAnchor="middle" dominantBaseline="middle"
                        fill="#c9a84c" fillOpacity=".1" fontFamily="Cormorant Garamond" fontSize="80" fontStyle="italic">♥</text>
                      <text x="150" y="90%" textAnchor="middle" fill="#c9a84c" fillOpacity=".35"
                        fontFamily="Jost" fontSize="7" letterSpacing="3">{item.title.toUpperCase()}</text>
                    </svg>
                  </div>
                )}
                
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute', 
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 40%, rgba(8,8,8,.85))',
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'flex-end', 
                    padding: 'clamp(0.8rem, 1.2vw, 1.2rem)',
                    pointerEvents: 'none',
                  }}
                >
                  <p style={{ 
                    fontFamily: "'Jost',sans-serif", 
                    fontSize: 'clamp(0.4rem, 0.5vw, 0.5rem)', 
                    letterSpacing: '0.3em', 
                    textTransform: 'uppercase', 
                    color: '#c9a84c', 
                    marginBottom: '0.3rem' 
                  }}>
                    {item.category}
                  </p>
                  <p style={{ 
                    fontFamily: "'Cormorant Garamond', serif", 
                    fontSize: 'clamp(0.9rem, 1.1vw, 1.1rem)', 
                    fontWeight: 300, 
                    color: '#f8f4ef' 
                  }}>
                    {item.title}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination Dots with Smooth Transition */}
        {maxIndex > 0 && (
          <motion.div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '2rem',
            }}
          >
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handleDotClick(index)}
                animate={{
                  width: currentIndex === index ? 30 : 8,
                  background: currentIndex === index ? '#c9a84c' : 'rgba(201,168,76,0.2)',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 30,
                }}
                style={{
                  height: '8px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) {
          .gallery-horizontal {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        
        @media (max-width: 768px) {
          .gallery-horizontal {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .gallery-horizontal > div {
            aspect-ratio: 4/5 !important;
          }
        }
        
        @media (max-width: 640px) {
          .gallery-horizontal {
            grid-template-columns: repeat(1, 1fr) !important;
          }
          .gallery-horizontal > div {
            aspect-ratio: 4/5 !important;
          }
        }
        
        .img-zoom {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-radius: 4px;
        }
        
        .img-zoom:hover {
          transform: scale(1.02);
          box-shadow: 0 10px 40px rgba(0,0,0,0.5);
          z-index: 10;
        }
        
        @keyframes shimmer {
          0% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 0.5;
          }
        }
        
        .gallery-horizontal > * {
          display: block;
          width: 100%;
        }
      `}</style>
    </section>
  )
}