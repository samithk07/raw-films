import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { stories } from '../data/stories'
import SectionHeader from './SectionHeader'
import { fadeUpVariant, slideInLeft, slideInRight } from '../utils/animations'

function StoryCard({ story, index }) {
  const navigate = useNavigate()
  const isEven = index % 2 === 1

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        marginBottom: 1,
        position: 'relative',
        overflow: 'hidden',
        minHeight: '70vh',
      }}
      className="story-card-grid"
    >
      {/* Image Section */}
      <motion.div
        variants={isEven ? slideInRight(0) : slideInLeft(0)}
        style={{ 
          order: isEven ? 2 : 1, 
          position: 'relative', 
          overflow: 'hidden',
          minHeight: 400,
        }}
        className="img-zoom"
      >
        <div
          className="img-inner"
          style={{
            width: '100%',
            height: '100%',
            minHeight: 400,
            position: 'relative',
            overflow: 'hidden',
            background: story.coverGradient,
          }}
        >
          {story.coverImage ? (
            <>
              <picture>
                <source 
                  media="(max-width: 768px)" 
                  srcSet={story.coverImageMobile || story.coverImage} 
                />
                <img 
                  src={story.coverImage} 
                  alt={`${story.names} wedding`}
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
              </picture>
              {/* Gradient Overlay for better visual consistency */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(8,8,8,0.2), rgba(8,8,8,0.05))',
              }} />
            </>
          ) : (
            // Fallback SVG if no image is provided
            <svg viewBox="0 0 600 700" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0 }}>
              <rect width="600" height="700" fill="transparent" />
              <text x="300" y="320" textAnchor="middle" fill="#c9a84c" fillOpacity=".08"
                fontFamily="Cormorant Garamond" fontSize="140" fontStyle="italic">♥</text>
              <text x="300" y="520" textAnchor="middle" fill="#c9a84c" fillOpacity=".5"
                fontFamily="Jost" fontSize="11" letterSpacing="8">{story.names.toUpperCase()}</text>
              <text x="300" y="545" textAnchor="middle" fill="#c9a84c" fillOpacity=".3"
                fontFamily="Jost" fontSize="9" letterSpacing="5">{story.location.toUpperCase()}</text>
            </svg>
          )}
        </div>
        {/* Subtle overlay gradient for depth */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(135deg, rgba(8,8,8,0.4), rgba(8,8,8,0.1))' 
        }} />
      </motion.div>

      {/* Text Section */}
      <motion.div
        variants={isEven ? slideInLeft(0.2) : slideInRight(0.2)}
        style={{
          order: isEven ? 1 : 2,
          background: '#1a1a1a',
          padding: 'clamp(2rem, 5vw, 4rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div style={{ 
          fontFamily: "'Cormorant Garamond', serif", 
          fontSize: '4rem', 
          fontWeight: 300, 
          color: 'rgba(201,168,76,.15)', 
          lineHeight: 1, 
          marginBottom: '1rem' 
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>
        <p style={{ 
          fontFamily: "'Jost',sans-serif", 
          fontSize: '0.55rem', 
          letterSpacing: '0.35em', 
          textTransform: 'uppercase', 
          color: '#c9a84c', 
          marginBottom: '0.8rem' 
        }}>
          {story.location}
        </p>
        <h3 style={{ 
          fontFamily: "'Cormorant Garamond', serif", 
          fontSize: 'clamp(1.6rem,3vw,2.4rem)', 
          fontWeight: 300, 
          marginBottom: '0.8rem', 
          lineHeight: 1.2,
          color: '#f8f4ef'
        }}>
          {story.names}
        </h3>
        <p style={{ 
          fontFamily: "'Cormorant Garamond', serif", 
          fontSize: '0.95rem', 
          fontStyle: 'italic', 
          color: '#e8d5a3', 
          marginBottom: '1.5rem', 
          opacity: 0.8 
        }}>
          &ldquo;{story.tagline}&rdquo;
        </p>
        <p style={{ 
          fontFamily: "'Jost',sans-serif", 
          fontSize: '0.8rem', 
          lineHeight: 1.9, 
          color: 'rgba(248,244,239,.5)', 
          marginBottom: '2rem', 
          fontWeight: 300 
        }}>
          {story.description}
        </p>
        <button
          onClick={() => navigate(`/stories/${story.slug}`)}
          style={{
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.6rem',
            fontFamily: "'Jost',sans-serif", 
            fontSize: '0.6rem', 
            letterSpacing: '0.25em',
            textTransform: 'uppercase', 
            color: '#c9a84c', 
            background: 'none', 
            border: 'none',
            cursor: 'pointer', 
            padding: 0,
            transition: 'gap 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.gap = '1rem'}
          onMouseLeave={(e) => e.currentTarget.style.gap = '0.6rem'}
        >
          View Story <span aria-hidden="true">→</span>
        </button>
      </motion.div>
    </motion.div>
  )
}

export default function Stories() {
  return (
    <section id="stories" style={{ background: '#0f0f0f', padding: '7rem 0 0' }}>
      <div className="section-padding" style={{ paddingBottom: '5rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-end', 
          flexWrap: 'wrap', 
          gap: '2rem',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 clamp(1rem, 4vw, 3rem)',
        }}>
          <SectionHeader eyebrow="Love Stories" title="Featured" titleEm="Weddings" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{ 
              fontFamily: "'Jost',sans-serif", 
              fontSize: '0.85rem', 
              lineHeight: 1.9, 
              color: 'rgba(248,244,239,.55)', 
              maxWidth: 420, 
              fontWeight: 300 
            }}
          >
            Each story is a universe — told in light, silence, and stolen glances. We capture the poetry between the moments.
          </motion.p>
        </div>
      </div>
      {stories.map((story, i) => (
        <StoryCard key={story.id} story={story} index={i} />
      ))}
    </section>
  )
}