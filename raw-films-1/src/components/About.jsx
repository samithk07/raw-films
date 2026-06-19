import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import { slideInLeft, slideInRight } from '../utils/animations'

const stats = [
  { id: 'weddings', value: 320, label: 'Weddings Captured' },
  { id: 'couples',  value: 310, label: 'Happy Couples' },
  { id: 'years',    value: 7,   label: 'Years Experience' },
  { id: 'dest',     value: 18,  label: 'Destinations' },
]

function AnimatedNumber({ value }) {
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)
  const animated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true
        let start = 0
        const step = () => {
          start += Math.ceil(value / 80)
          if (start >= value) { setCurrent(value); return }
          setCurrent(start)
          requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return <span ref={ref}>{current}+</span>
}

export default function About() {
  return (
    <section id="about" style={{ background: '#080808', padding: '7rem 2rem 0' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <SectionHeader eyebrow="Our Story" title="About" titleEm="RAW FILMS" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 0,
            marginTop: '2rem',
            background: '#1a1a1a',
          }}
          className="about-grid"
        >
          {/* Founder Image */}
          <motion.div
            variants={slideInLeft(0)}
            style={{ 
              position: 'relative', 
              overflow: 'hidden', 
              background: '#1a1a1a', 
              minHeight: 500,
            }}
          >
            <div style={{
              width: '100%', 
              height: '100%', 
              minHeight: 500,
              background: 'linear-gradient(160deg,#1a1208 0%,#0d0a05 50%,#1a0f08 100%)',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Image */}
              <img 
                src="public\images\stories\WhatsApp Image 2026-06-19 at 11.19.27 AM.jpeg" 
                alt="Shailu - Founder of RAW FILMS"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
                loading="lazy"
              />
              
              {/* Gradient Overlay for Text Readability */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(26,18,8,0.7) 0%, rgba(13,10,5,0.4) 50%, rgba(26,15,8,0.8) 100%)',
              }} />
              
              {/* Text Overlay - Name in Corner */}
              <div style={{
                position: 'absolute',
                bottom: '2.5rem',
                left: '2.5rem',
                zIndex: 2,
                textAlign: 'left',
              }}>
                {/* Founder Name - Bottom Left Corner */}
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  fontWeight: 300,
                  color: '#c9a84c',
                  margin: 0,
                  lineHeight: 1,
                  textShadow: '0 2px 30px rgba(0,0,0,0.8)',
                  letterSpacing: '0.05em',
                }}>
                  Shailu
                </h2>
                
                {/* Title - Below Name */}
                <p style={{
                  fontFamily: "'Jost',sans-serif",
                  fontSize: 'clamp(0.5rem, 0.7vw, 0.8rem)',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'rgba(201,168,76,0.7)',
                  marginTop: '0.3rem',
                  marginBottom: 0,
                  textShadow: '0 2px 20px rgba(0,0,0,0.8)',
                }}>
                  FOUNDER & LEAD PHOTOGRAPHER
                </p>
                
                {/* Location */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginTop: '0.5rem',
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3" fill="#c9a84c" stroke="none"/>
                  </svg>
                  <p style={{
                    fontFamily: "'Jost',sans-serif",
                    fontSize: 'clamp(0.4rem, 0.5vw, 0.6rem)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'rgba(248,244,239,0.5)',
                    margin: 0,
                    textShadow: '0 2px 20px rgba(0,0,0,0.8)',
                  }}>
                    KASARAGODE, KERALA
                  </p>
                </div>
              </div>

              {/* Decorative Corner Accent */}
              <div style={{
                position: 'absolute',
                bottom: '2.5rem',
                right: '2.5rem',
                zIndex: 2,
                opacity: 0.3,
              }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1">
                  <path d="M4 4L20 20M20 4L4 20" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={slideInRight(0.2)}
            style={{ 
              background: '#1a1a1a', 
              padding: 'clamp(2rem, 5vw, 5rem)', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
            }}
          >
            <blockquote style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)',
              fontWeight: 300, 
              fontStyle: 'italic', 
              lineHeight: 1.5,
              color: '#f8f4ef', 
              marginBottom: '2rem',
              borderLeft: '2px solid #c9a84c', 
              paddingLeft: 'clamp(1rem, 2vw, 2rem)',
            }}>
              "I don't just photograph weddings — I listen to the silences between vows, and translate them into light."
            </blockquote>

            <p style={{
              fontFamily: "'Jost',sans-serif", 
              fontSize: 'clamp(0.75rem, 0.82vw, 0.82rem)', 
              lineHeight: 2,
              color: 'rgba(248,244,239,.5)', 
              marginBottom: '2.5rem', 
              fontWeight: 300,
            }}>
              Shailu founded RAW FILMS in 2018 with one belief: that every love story deserves a film that outlives its moment. Shailu brings a director's eye and a poet's heart to every wedding he touches.
              <br /><br />
              With over 300 weddings across India, Kerala, and Karnataka, RAW FILMS has become the quiet choice for couples who want their story told with truth — raw, unfiltered, and enduring.
            </p>

            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.5rem, 2rem, 2.5rem)',
              fontStyle: 'italic', 
              color: '#c9a84c',
            }}>
              SHAILU - Photography
            </div>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            marginTop: '2px',
          }}
          className="stats-grid"
        >
          {stats.map(stat => (
            <div key={stat.id} style={{ 
              background: '#0f0f0f', 
              padding: 'clamp(1.5rem, 3vw, 3rem) clamp(1rem, 2vw, 2rem)', 
              textAlign: 'center',
              borderRight: '1px solid rgba(255,255,255,0.03)',
            }}>
              <div style={{ 
                fontFamily: "'Cormorant Garamond', serif", 
                fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', 
                fontWeight: 300, 
                color: '#c9a84c', 
                lineHeight: 1 
              }}>
                <AnimatedNumber value={stat.value} />
              </div>
              <div style={{ 
                fontFamily: "'Jost',sans-serif", 
                fontSize: 'clamp(0.4rem, 0.55vw, 0.55rem)', 
                letterSpacing: '0.3em', 
                textTransform: 'uppercase', 
                color: '#8a8580', 
                marginTop: '0.5rem' 
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
          .about-grid > div:first-child {
            min-height: 450px !important;
          }
        }

        @media (max-width: 768px) {
          section#about {
            padding: 4rem 1rem 0 !important;
          }
          .about-grid > div:first-child {
            min-height: 400px !important;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1px !important;
          }
          .stats-grid > div {
            border-right: none !important;
          }
        }

        @media (max-width: 480px) {
          section#about {
            padding: 3rem 0.75rem 0 !important;
          }
          .about-grid > div:first-child {
            min-height: 350px !important;
          }
          .stats-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .stats-grid > div {
            padding: 1.5rem 0.75rem !important;
          }
        }
      `}</style>
    </section>
  )
}