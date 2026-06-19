import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          style={{ background: '#080808' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.h1
            className="font-serif text-white"
            style={{ fontSize: 'clamp(2.5rem,8vw,6rem)', fontWeight: 300, letterSpacing: '0.4em' }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            RAW FILMS
          </motion.h1>

          <div
            className="relative overflow-hidden my-8"
            style={{ width: 120, height: 1, background: '#1a1a1a' }}
          >
            <motion.div
              className="absolute inset-y-0 left-0"
              style={{ background: '#c9a84c' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
            />
          </div>

          <p
            className="font-sans text-[#8a8580]"
            style={{ fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase' }}
          >
            Cinematic Wedding Stories
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
