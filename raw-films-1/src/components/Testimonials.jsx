import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { testimonials } from '../data/testimonials'
import SectionHeader from './SectionHeader'

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const perView = 3

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(c => (c + 1) % testimonials.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  const visible = [
    testimonials[current % testimonials.length],
    testimonials[(current + 1) % testimonials.length],
    testimonials[(current + 2) % testimonials.length],
  ]

  return (
    <section id="testimonials" style={{ background: '#0f0f0f', padding: '7rem 4rem', overflow: 'hidden' }}>
      <SectionHeader eyebrow="Kind Words" title="What Couples" titleEm="Say" />

      <div className='testimonials-grid' style={{ marginTop: '3rem' }}>
        <AnimatePresence mode="popLayout">
          {visible.map((t, i) => (
            <motion.div
              key={t.id + '-' + i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                background: '#1a1a1a',
                padding: '3rem',
                borderBottom: '2px solid transparent',
                transition: 'border-color .4s',
              }}
            >
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', color: '#c9a84c', lineHeight: 0.5, marginBottom: '1.5rem', opacity: 0.4 }}>"</div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontStyle: 'italic', lineHeight: 1.8, color: 'rgba(248,244,239,.75)', marginBottom: '2rem' }}>
                {t.text}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: '#242424', border: '1px solid rgba(201,168,76,.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontStyle: 'italic', color: '#c9a84c',
                }}>
                  {t.initial}
                </div>
                <div>
                  <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.05em' }}>{t.name}</div>
                  <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.6rem', color: '#8a8580', letterSpacing: '0.1em' }}>{t.location}</div>
                  <div style={{ color: '#c9a84c', fontSize: '0.7rem', marginTop: '0.2rem' }}>{'★'.repeat(t.rating)}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '3rem', justifyContent: 'center' }}>
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: current === i ? 48 : 24,
              height: 2,
              background: current === i ? '#c9a84c' : 'rgba(201,168,76,.2)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all .3s',
            }}
          />
        ))}
      </div>
    </section>
  )
}
