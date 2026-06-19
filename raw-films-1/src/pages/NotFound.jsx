import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import MainLayout from '../layouts/MainLayout'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <MainLayout>
      <div style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.6rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '1.5rem' }}
        >
          404 — Page Not Found
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-serif"
          style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', fontWeight: 300, lineHeight: 1, marginBottom: '1.5rem' }}
        >
          Lost in the <em style={{ color: '#c9a84c', fontStyle: 'italic' }}>Frame</em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.85rem', color: 'rgba(248,244,239,.5)', marginBottom: '2.5rem', fontWeight: 300 }}
        >
          This page doesn't exist, but your story does.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn-gold" onClick={() => navigate('/')}>Go Home</button>
          <button className="btn-outline-gold" onClick={() => navigate('/contact')}>Book a Wedding</button>
        </motion.div>
      </div>
    </MainLayout>
  )
}
