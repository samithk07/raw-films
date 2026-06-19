import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Home',    href: '/' },
  { label: 'Stories', href: '/stories' },
  { label: 'Films',   href: '/films' },
  { label: 'About',   id: 'about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled 
          ? '0.6rem clamp(1rem, 3vw, 4rem)' 
          : '1rem clamp(1rem, 3vw, 4rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all .4s ease',
        background: scrolled ? 'rgba(8,8,8,.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,.1)' : 'none',
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <Link
        to="/"
        aria-label="RAW FILMS — Home"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
          fontWeight: 300,
          letterSpacing: '0.25em',
          color: '#f8f4ef',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        RAW <span style={{ color: '#c9a84c' }}>FILMS</span>
      </Link>

      {/* Desktop links */}
      <ul
        style={{ 
          display: 'flex', 
          gap: 'clamp(1.5rem, 3vw, 2.5rem)', 
          listStyle: 'none', 
          alignItems: 'center', 
          margin: 0, 
          padding: 0 
        }}
        className="hidden md:flex"
      >
        {links.map((l) => (
          <li key={l.label}>
            {l.href ? (
              <Link
                to={l.href}
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 'clamp(0.55rem, 0.65vw, 0.65rem)',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'rgba(248,244,239,.6)',
                  textDecoration: 'none',
                  position: 'relative',
                  paddingBottom: 4,
                  transition: 'color .3s',
                  whiteSpace: 'nowrap',
                }}
                className="nav-link"
              >
                {l.label}
              </Link>
            ) : (
              <button
                onClick={() => scrollToSection(l.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 'clamp(0.55rem, 0.65vw, 0.65rem)',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'rgba(248,244,239,.6)',
                  cursor: 'pointer',
                  transition: 'color .3s',
                  padding: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                {l.label}
              </button>
            )}
          </li>
        ))}
        <li>
          <Link
            to="/contact"
            style={{
              background: 'transparent',
              border: '1px solid #c9a84c',
              color: '#c9a84c',
              fontFamily: "'Jost', sans-serif",
              fontSize: 'clamp(0.5rem, 0.6vw, 0.6rem)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '0.4rem clamp(0.8rem, 1.2vw, 1.2rem)',
              textDecoration: 'none',
              transition: 'all .3s',
              display: 'inline-block',
              whiteSpace: 'nowrap',
            }}
          >
            Book Now
          </Link>
        </li>
      </ul>

      {/* Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex md:hidden"
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 5, 
          background: 'none', 
          border: 'none', 
          cursor: 'pointer', 
          padding: '8px', 
          zIndex: 101,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            style={{ 
              display: 'block', 
              width: 24, 
              height: 1.5, 
              background: '#f8f4ef',
              borderRadius: 1,
            }}
            animate={menuOpen
              ? i === 0 ? { rotate: 45, y: 6.5 }
              : i === 1 ? { opacity: 0 }
              : { rotate: -45, y: -6.5 }
              : { rotate: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(8,8,8,.98)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(1.5rem, 5vh, 2.5rem)',
              zIndex: 99,
              padding: '2rem',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            {links.map((l, i) => (
              <motion.div
                key={l.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, type: 'spring', stiffness: 200 }}
                style={{
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                {l.href ? (
                  <Link
                    to={l.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 'clamp(2rem, 8vw, 2.8rem)',
                      fontWeight: 300,
                      color: '#f8f4ef',
                      textDecoration: 'none',
                      display: 'inline-block',
                      padding: '0.3rem 1rem',
                      transition: 'color 0.3s',
                      letterSpacing: '0.05em',
                    }}
                    className="mobile-link"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <button
                    onClick={() => scrollToSection(l.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 'clamp(2rem, 8vw, 2.8rem)',
                      fontWeight: 300,
                      color: '#f8f4ef',
                      cursor: 'pointer',
                      padding: '0.3rem 1rem',
                      transition: 'color 0.3s',
                      letterSpacing: '0.05em',
                    }}
                    className="mobile-link"
                  >
                    {l.label}
                  </button>
                )}
              </motion.div>
            ))}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
              style={{ marginTop: '0.5rem' }}
            >
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'inline-block',
                  background: '#c9a84c',
                  color: '#080808',
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  padding: 'clamp(0.8rem, 2vh, 1rem) clamp(2rem, 5vw, 3rem)',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  border: '1px solid #c9a84c',
                }}
              >
                Book Now
              </Link>
            </motion.div>
            
            {/* Decorative line */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '60px' }}
              transition={{ delay: 0.5, duration: 0.5 }}
              style={{
                height: '1px',
                background: 'linear-gradient(to right, transparent, #c9a84c, transparent)',
                marginTop: '0.5rem',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add custom styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .hidden {
            display: none !important;
          }
          .flex {
            display: flex !important;
          }
          .md\\:flex {
            display: none !important;
          }
        }
        @media (min-width: 769px) {
          .hidden {
            display: none !important;
          }
          .flex {
            display: flex !important;
          }
          .md\\:flex {
            display: flex !important;
          }
        }
        .nav-link:hover,
        .nav-link:focus {
          color: #f8f4ef !important;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: #c9a84c;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .mobile-link:hover,
        .mobile-link:focus {
          color: #c9a84c !important;
        }
        .book-now-btn:hover {
          background: #c9a84c !important;
          color: #080808 !important;
        }
        .book-now-btn-mobile:hover {
          background: #080808 !important;
          color: #c9a84c !important;
          border-color: #c9a84c !important;
        }
      `}</style>
    </nav>
  )
}