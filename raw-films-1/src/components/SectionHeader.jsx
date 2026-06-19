import { motion } from 'framer-motion'
import { fadeUpVariant } from '../utils/animations'

export default function SectionHeader({ eyebrow, title, titleEm, description, center = false }) {
  return (
    <motion.div
      className={center ? 'text-center' : ''}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        variants={fadeUpVariant(0)}
        className="eyebrow mb-4"
        style={{ justifyContent: center ? 'center' : undefined }}
      >
        {eyebrow}
      </motion.div>
      <motion.h2
        variants={fadeUpVariant(0.1)}
        className="font-serif"
        style={{ fontSize: 'clamp(2.2rem,5vw,4rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: '1.5rem' }}
      >
        {title} {titleEm && <em style={{ color: '#c9a84c', fontStyle: 'italic' }}>{titleEm}</em>}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUpVariant(0.2)}
          className="font-sans"
          style={{
            fontSize: '0.85rem',
            lineHeight: 1.9,
            color: 'rgba(248,244,239,.55)',
            maxWidth: 500,
            fontWeight: 300,
            margin: center ? '0 auto' : undefined,
          }}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
