import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import MainLayout from '../layouts/MainLayout'
import { stories } from '../data/stories'
import { fadeUpVariant } from '../utils/animations'

export default function StoryDetails() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const story = stories.find(s => s.slug === slug)

  if (!story) {
    return (
      <MainLayout>
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '2rem' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', fontWeight: 300 }}>Story Not Found</h1>
          <button className="btn-gold" onClick={() => navigate('/stories')}>Back to Stories</button>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <Helmet>
        <title>{story.names} - RAW FILMS</title>
        <meta name="description" content={story.description} />
      </Helmet>

      {/* Hero */}
      <div style={{ minHeight: '60vh', position: 'relative', display: 'flex', alignItems: 'flex-end', padding: 'clamp(1.5rem, 4vw, 4rem)', background: story.coverGradient, marginTop: 0, paddingTop: 80 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.4)' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '1rem' }}>
            {story.location} - {story.date}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: '1rem' }}>
            {story.names}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontStyle: 'italic', color: '#e8d5a3' }}>
            "{story.tagline}"
          </motion.p>
        </div>
      </div>

      {/* Story content */}
      <div style={{ background: '#0f0f0f', padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUpVariant(0)}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontStyle: 'italic', lineHeight: 1.8, color: 'rgba(248,244,239,.8)', marginBottom: '2rem' }}>
            {story.description}
          </motion.p>
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUpVariant(0.1)}
            style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.85rem', lineHeight: 2, color: 'rgba(248,244,239,.5)', fontWeight: 300, marginBottom: '3rem' }}>
            {story.longDescription}
          </motion.p>
          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
            {story.tags.map(tag => (
              <span key={tag} style={{ border: '1px solid rgba(201,168,76,.3)', color: '#c9a84c', fontFamily: "'Jost',sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0.4rem 0.9rem' }}>
                {tag}
              </span>
            ))}
          </div>
          <button className="btn-gold" onClick={() => navigate('/contact')}>Book Your Wedding</button>
        </div>
      </div>
    </MainLayout>
  )
}
