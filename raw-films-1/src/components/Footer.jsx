import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const socials = [
  { 
    label: 'IG', 
    href: 'https://www.instagram.com/_raw_films?igsh=Y21uc3V0NmVxMXJy', 
    title: 'Instagram',
    icon: 'instagram'
  },
  { 
    label: 'WA', 
    href: 'https://wa.me/919544140915', 
    title: 'WhatsApp',
    icon: 'whatsapp'
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{ background: '#040404', borderTop: '1px solid rgba(201,168,76,.08)' }}>
      <div style={{ 
        maxWidth: '1400px',
        margin: '0 auto',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 6vw, 4rem) 2rem',
      }}>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '1.8fr 0.8fr 1.4fr',
          gap: 'clamp(2rem, 4vw, 4rem)',
          alignItems: 'start',
        }} className="footer-grid">
          
          {/* Brand - Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ 
              fontFamily: "'Cormorant Garamond', serif", 
              fontSize: 'clamp(1.5rem, 3vw, 2rem)', 
              fontWeight: 300, 
              letterSpacing: '0.2em'
            }}>
              RAW <span style={{ color: '#c9a84c' }}>FILMS</span>
            </div>
            <p style={{ 
              fontFamily: "'Jost',sans-serif", 
              fontSize: '0.75rem', 
              lineHeight: 1.9, 
              color: '#8a8580', 
              maxWidth: '100%',
              fontWeight: 300,
              margin: 0,
            }}>
              Crafting timeless love stories through the art of cinema and photography. 
              Based in Kerala, available worldwide.
            </p>
            
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {socials.map(s => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  title={s.title}
                  aria-label={s.title}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ 
                    borderColor: s.icon === 'instagram' ? '#c9a84c' : '#25d366', 
                    color: s.icon === 'instagram' ? '#c9a84c' : '#25d366',
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: 42, 
                    height: 42, 
                    border: '1px solid rgba(201,168,76,.2)',
                    borderRadius: '50%',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#8a8580', 
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {s.icon === 'instagram' ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  )}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links - Middle Column */}
          <div>
            <h4 style={{ 
              fontFamily: "'Jost',sans-serif", 
              fontSize: '0.55rem', 
              letterSpacing: '0.3em', 
              textTransform: 'uppercase', 
              color: '#c9a84c', 
              margin: '0 0 1.2rem 0',
              fontWeight: 400,
            }}>
              Quick Links
            </h4>
            <ul style={{ 
              listStyle: 'none', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '0.7rem', 
              padding: 0, 
              margin: 0,
            }}>
              <li>
                <Link 
                  to="/" 
                  style={{ 
                    fontFamily: "'Jost',sans-serif", 
                    fontSize: '0.75rem', 
                    color: '#8a8580', 
                    textDecoration: 'none', 
                    fontWeight: 300,
                    transition: 'color 0.3s ease',
                    display: 'inline-block',
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#c9a84c'}
                  onMouseLeave={(e) => e.target.style.color = '#8a8580'}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  style={{ 
                    fontFamily: "'Jost',sans-serif", 
                    fontSize: '0.75rem', 
                    color: '#8a8580', 
                    textDecoration: 'none', 
                    fontWeight: 300,
                    transition: 'color 0.3s ease',
                    display: 'inline-block',
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#c9a84c'}
                  onMouseLeave={(e) => e.target.style.color = '#8a8580'}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/stories" 
                  style={{ 
                    fontFamily: "'Jost',sans-serif", 
                    fontSize: '0.75rem', 
                    color: '#8a8580', 
                    textDecoration: 'none', 
                    fontWeight: 300,
                    transition: 'color 0.3s ease',
                    display: 'inline-block',
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#c9a84c'}
                  onMouseLeave={(e) => e.target.style.color = '#8a8580'}
                >
                  Stories
                </Link>
              </li>
              <li>
                <Link 
                  to="/films" 
                  style={{ 
                    fontFamily: "'Jost',sans-serif", 
                    fontSize: '0.75rem', 
                    color: '#8a8580', 
                    textDecoration: 'none', 
                    fontWeight: 300,
                    transition: 'color 0.3s ease',
                    display: 'inline-block',
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#c9a84c'}
                  onMouseLeave={(e) => e.target.style.color = '#8a8580'}
                >
                  Films
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  style={{ 
                    fontFamily: "'Jost',sans-serif", 
                    fontSize: '0.75rem', 
                    color: '#8a8580', 
                    textDecoration: 'none', 
                    fontWeight: 300,
                    transition: 'color 0.3s ease',
                    display: 'inline-block',
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#c9a84c'}
                  onMouseLeave={(e) => e.target.style.color = '#8a8580'}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Stay Connected - Right Column */}
          <div>
            <h4 style={{ 
              fontFamily: "'Jost',sans-serif", 
              fontSize: '0.55rem', 
              letterSpacing: '0.3em', 
              textTransform: 'uppercase', 
              color: '#c9a84c', 
              margin: '0 0 1.2rem 0',
              fontWeight: 400,
            }}>
              Stay Connected
            </h4>
            
            <p style={{ 
              fontFamily: "'Jost',sans-serif", 
              fontSize: '0.72rem', 
              color: '#8a8580', 
              lineHeight: 1.7, 
              margin: '0 0 1.2rem 0', 
              fontWeight: 300,
            }}>
              Love stories, behind the scenes, and the art of cinematic wedding photography.
            </p>
            
            {/* Email Contact */}
            <a 
              href="mailto:Shaileshshailu977@gmail.Com"
              style={{
                display: 'block',
                fontFamily: "'Jost',sans-serif",
                fontSize: '0.7rem',
                color: '#8a8580',
                textDecoration: 'none',
                marginBottom: '0.5rem',
                transition: 'color 0.3s ease',
                lineHeight: 1.5,
              }}
              onMouseEnter={(e) => e.target.style.color = '#c9a84c'}
              onMouseLeave={(e) => e.target.style.color = '#8a8580'}
            >
              ✉ Shaileshshailu977@gmail.Com
            </a>
            
            {/* Phone Contact */}
            <a 
              href="tel:+919544140915"
              style={{
                display: 'block',
                fontFamily: "'Jost',sans-serif",
                fontSize: '0.7rem',
                color: '#8a8580',
                textDecoration: 'none',
                marginBottom: '1.2rem',
                transition: 'color 0.3s ease',
                lineHeight: 1.5,
              }}
              onMouseEnter={(e) => e.target.style.color = '#c9a84c'}
              onMouseLeave={(e) => e.target.style.color = '#8a8580'}
            >
              ☎ +91 95441 40915
            </a>

            {/* Newsletter */}
            <div>
              <label htmlFor="newsletter-email" style={{ 
                display: 'block',
                fontFamily: "'Jost',sans-serif",
                fontSize: '0.5rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(248,244,239,.3)',
                marginBottom: '0.3rem',
              }}>
                Subscribe to our newsletter
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                style={{
                  width: '100%', 
                  background: 'rgba(248,244,239,.04)', 
                  border: 'none',
                  borderBottom: '1px solid rgba(248,244,239,.15)', 
                  color: '#f8f4ef',
                  fontFamily: "'Jost',sans-serif", 
                  fontSize: '0.75rem', 
                  padding: '0.7rem 0',
                  outline: 'none', 
                  marginBottom: '0.8rem',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(201,168,76,0.5)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(248,244,239,.15)'}
              />
              <motion.button
                type="button"
                whileHover={{ 
                  background: 'rgba(201,168,76,0.1)',
                  borderColor: 'rgba(201,168,76,0.6)',
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  fontFamily: "'Jost',sans-serif", 
                  fontSize: '0.55rem', 
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase', 
                  color: '#c9a84c', 
                  background: 'none',
                  border: '1px solid rgba(201,168,76,.3)', 
                  padding: '0.5rem 1.2rem', 
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  borderRadius: '2px',
                }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        borderTop: '1px solid rgba(248,244,239,.06)',
        padding: '1.2rem clamp(1.5rem, 6vw, 4rem)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
          width: '100%',
        }}>
          <p style={{ 
            fontFamily: "'Jost',sans-serif", 
            fontSize: '0.55rem', 
            color: '#8a8580', 
            letterSpacing: '0.1em',
            margin: 0,
          }}>
            © {currentYear} RAW FILMS · All Rights Reserved · Kasaragode, Kerala
          </p>
          <p style={{ 
            fontFamily: "'Jost',sans-serif", 
            fontSize: '0.55rem', 
            color: '#8a8580', 
            letterSpacing: '0.1em',
            margin: 0,
          }}>
            Crafted for love stories
          </p>
        </div>
      </div>

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .footer-grid > div:last-child {
            grid-column: span 2;
          }
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .footer-grid > div:last-child {
            grid-column: span 1;
          }
          .footer-grid > div:first-child {
            text-align: center;
          }
          .footer-grid > div:first-child div {
            justify-content: center;
          }
          .footer-grid > div {
            text-align: center;
          }
          .footer-grid > div ul {
            align-items: center;
          }
          .footer-grid > div ul li {
            text-align: center;
          }
          .footer-grid > div:last-child {
            text-align: center;
          }
          .footer-grid > div:last-child input {
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .footer-grid > div:last-child input {
            font-size: 0.65rem !important;
          }
        }
      `}</style>
    </footer>
  )
}