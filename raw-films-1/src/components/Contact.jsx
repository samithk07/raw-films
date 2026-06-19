import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import SectionHeader from './SectionHeader'
import { slideInLeft, slideInRight } from '../utils/animations'

// EmailJS Configuration — values come from environment variables (set in Vercel
// dashboard → Settings → Environment Variables), with the existing project's
// credentials as a fallback so local/dev usage keeps working out of the box.
const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_jkxg5jm',
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_67ndbyr',
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '9TtXaVXCYIMN13FEu',
}

const inputStyle = {
  width: '100%',
  background: 'rgba(248,244,239,.04)',
  border: 'none',
  borderBottom: '1px solid rgba(248,244,239,.15)',
  color: '#f8f4ef',
  fontFamily: "'Jost',sans-serif",
  fontSize: '0.85rem',
  padding: '0.8rem 0',
  outline: 'none',
  transition: 'border-color 0.3s ease',
}

const labelStyle = {
  display: 'block',
  fontFamily: "'Jost',sans-serif",
  fontSize: '0.55rem',
  letterSpacing: '0.3em',
  textTransform: 'uppercase',
  color: '#c9a84c',
  marginBottom: '0.6rem',
}

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    partner: '',
    email: '',
    date: '',
    location: '',
    service: '',
    message: '',
  })
  const [focused, setFocused] = useState({})
  const formRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleFocus = (field) => {
    setFocused(prev => ({ ...prev, [field]: true }))
  }

  const handleBlur = (field) => {
    setFocused(prev => ({ ...prev, [field]: false }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields')
      setLoading(false)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }

    try {
      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        partner_name: formData.partner || 'Not specified',
        from_email: formData.email,
        wedding_date: formData.date || 'Not specified',
        wedding_location: formData.location || 'Not specified',
        service: formData.service || 'Not specified',
        message: formData.message,
        to_email: 'Shaileshshailu977@gmail.Com',
        // Add more fields as needed for your template
      }

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      )

      if (response.status === 200) {
        setSent(true)
        setFormData({
          name: '',
          partner: '',
          email: '',
          date: '',
          location: '',
          service: '',
          message: '',
        })
        formRef.current?.reset()
        setTimeout(() => setSent(false), 5000)
      } else {
        setError('Failed to send message. Please try again.')
      }
    } catch (err) {
      console.error('Error sending email:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const details = [
    { icon: '✉', label: 'Email', value: 'Shaileshshailu977@gmail.Com' },
    { icon: '☎', label: 'Phone & WhatsApp', value: '+91 95441 40915' },
    { icon: '⌖', label: 'Studio', value: 'Kumbala\nKasaragode, Kerala 67321' },
    { icon: '◷', label: 'Hours', value: 'Mon–Sat, 10am – 7pm IST\nSundays available for shoots' },
  ]

  return (
    <section id="contact" style={{ background: '#0f0f0f', padding: '7rem 2rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <SectionHeader eyebrow="Get In Touch" title="Let's Create Your" titleEm="Forever Story" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: 0,
            marginTop: '4rem',
            background: '#1a1a1a',
          }}
          className="contact-grid"
        >
          {/* Info */}
          <motion.div
            variants={slideInLeft(0)}
            style={{ 
              background: '#1a1a1a', 
              padding: 'clamp(2rem, 5vw, 4rem)', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between' 
            }}
          >
            <div>
              <p style={{ 
                fontFamily: "'Cormorant Garamond', serif", 
                fontSize: 'clamp(1.4rem, 3vw, 2.5rem)', 
                fontWeight: 300, 
                lineHeight: 1.3, 
                marginBottom: '3rem',
                color: '#f8f4ef',
              }}>
                Every love story deserves to be told with the{' '}
                <em style={{ color: '#c9a84c', fontStyle: 'italic' }}>care it was written in.</em>
              </p>

              {/* Contact Details with Interactive Hover */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {details.map((d, index) => (
                  <motion.div 
                    key={d.label} 
                    style={{ 
                      display: 'flex', 
                      gap: '1rem', 
                      borderBottom: '1px solid rgba(201,168,76,.1)', 
                      paddingBottom: '1.5rem',
                      transition: 'all 0.3s ease',
                      cursor: d.label === 'Email' || d.label === 'Phone & WhatsApp' ? 'pointer' : 'default',
                    }}
                    whileHover={{ 
                      paddingLeft: d.label === 'Email' || d.label === 'Phone & WhatsApp' ? '0.5rem' : 0,
                      borderBottomColor: d.label === 'Email' || d.label === 'Phone & WhatsApp' ? 'rgba(201,168,76,.3)' : 'rgba(201,168,76,.1)',
                    }}
                    onClick={() => {
                      if (d.label === 'Email') {
                        window.location.href = 'mailto:Shaileshshailu977@gmail.Com'
                      } else if (d.label === 'Phone & WhatsApp') {
                        window.location.href = 'https://wa.me/+919544140915'
                      }
                    }}
                  >
                    <span style={{ 
                      fontSize: '1.2rem', 
                      color: '#c9a84c', 
                      flexShrink: 0, 
                      marginTop: '0.1rem',
                      transition: 'transform 0.3s ease',
                    }} 
                    aria-hidden="true"
                    >
                      {d.icon}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ 
                        fontFamily: "'Jost',sans-serif", 
                        fontSize: '0.55rem', 
                        letterSpacing: '0.3em', 
                        textTransform: 'uppercase', 
                        color: '#c9a84c', 
                        marginBottom: '0.3rem' 
                      }}>
                        {d.label}
                      </div>
                      <div style={{ 
                        fontFamily: "'Jost',sans-serif", 
                        fontSize: '0.85rem', 
                        color: 'rgba(248,244,239,.7)', 
                        lineHeight: 1.6, 
                        whiteSpace: 'pre-line' 
                      }}>
                        {d.value}
                      </div>
                    </div>
                    {(d.label === 'Email' || d.label === 'Phone & WhatsApp') && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          color: '#c9a84c',
                          fontSize: '0.8rem',
                        }}
                      >
                        →
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            variants={slideInRight(0.2)}
            style={{ 
              background: '#242424', 
              padding: 'clamp(2rem, 5vw, 4rem)',
              position: 'relative',
            }}
          >
            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              {/* Success Message */}
              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    style={{
                      background: 'rgba(37,211,102,0.1)',
                      border: '1px solid rgba(37,211,102,0.3)',
                      padding: '1rem',
                      marginBottom: '1.5rem',
                      borderRadius: '2px',
                      textAlign: 'center',
                    }}
                  >
                    <span style={{
                      fontFamily: "'Jost',sans-serif",
                      fontSize: '0.8rem',
                      color: '#25d366',
                      letterSpacing: '0.1em',
                    }}>
                      ✓ Message sent successfully! We'll get back to you soon.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    style={{
                      background: 'rgba(255,0,0,0.1)',
                      border: '1px solid rgba(255,0,0,0.3)',
                      padding: '1rem',
                      marginBottom: '1.5rem',
                      borderRadius: '2px',
                      textAlign: 'center',
                    }}
                  >
                    <span style={{
                      fontFamily: "'Jost',sans-serif",
                      fontSize: '0.8rem',
                      color: '#ff6b6b',
                      letterSpacing: '0.1em',
                    }}>
                      {error}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div style={{ 
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem',
                marginBottom: '1.5rem',
              }} className="form-row">
                <div>
                  <label htmlFor="name" style={labelStyle}>Your Name *</label>
                  <input 
                    id="name" 
                    name="name" 
                    type="text" 
                    placeholder="First name" 
                    style={{
                      ...inputStyle,
                      borderBottomColor: focused.name ? 'rgba(201,168,76,0.5)' : 'rgba(248,244,239,.15)',
                    }}
                    required 
                    autoComplete="given-name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={() => handleBlur('name')}
                  />
                </div>
                <div>
                  <label htmlFor="partner" style={labelStyle}>Partner's Name</label>
                  <input 
                    id="partner" 
                    name="partner" 
                    type="text" 
                    placeholder="Partner's name" 
                    style={{
                      ...inputStyle,
                      borderBottomColor: focused.partner ? 'rgba(201,168,76,0.5)' : 'rgba(248,244,239,.15)',
                    }}
                    autoComplete="off"
                    value={formData.partner}
                    onChange={handleChange}
                    onFocus={() => handleFocus('partner')}
                    onBlur={() => handleBlur('partner')}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="email" style={labelStyle}>Email Address *</label>
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="your@email.com" 
                  style={{
                    ...inputStyle,
                    borderBottomColor: focused.email ? 'rgba(201,168,76,0.5)' : 'rgba(248,244,239,.15)',
                  }}
                  required 
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                />
              </div>

              <div style={{ 
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem',
                marginBottom: '1.5rem',
              }} className="form-row">
                <div>
                  <label htmlFor="date" style={labelStyle}>Wedding Date</label>
                  <input 
                    id="date" 
                    name="date" 
                    type="date" 
                    style={{ 
                      ...inputStyle, 
                      colorScheme: 'dark',
                      borderBottomColor: focused.date ? 'rgba(201,168,76,0.5)' : 'rgba(248,244,239,.15)',
                    }}
                    value={formData.date}
                    onChange={handleChange}
                    onFocus={() => handleFocus('date')}
                    onBlur={() => handleBlur('date')}
                  />
                </div>
                <div>
                  <label htmlFor="location" style={labelStyle}>Wedding Location</label>
                  <input 
                    id="location" 
                    name="location" 
                    type="text" 
                    placeholder="City or Venue" 
                    style={{
                      ...inputStyle,
                      borderBottomColor: focused.location ? 'rgba(201,168,76,0.5)' : 'rgba(248,244,239,.15)',
                    }}
                    value={formData.location}
                    onChange={handleChange}
                    onFocus={() => handleFocus('location')}
                    onBlur={() => handleBlur('location')}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="service" style={labelStyle}>Services Required</label>
                <select 
                  id="service" 
                  name="service" 
                  style={{ 
                    ...inputStyle, 
                    cursor: 'pointer', 
                    WebkitAppearance: 'none', 
                    appearance: 'none',
                    borderBottomColor: focused.service ? 'rgba(201,168,76,0.5)' : 'rgba(248,244,239,.15)',
                  }}
                  value={formData.service}
                  onChange={handleChange}
                  onFocus={() => handleFocus('service')}
                  onBlur={() => handleBlur('service')}
                >
                  <option value="">Select service</option>
                  <option>Wedding Photography</option>
                  <option>Cinematic Wedding Film</option>
                  <option>Photography + Film</option>
                  <option>Pre-Wedding Shoot</option>
                  <option>Destination Wedding</option>
                  <option>Portrait Session</option>
                  <option>Engagement Shoot</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="message" style={labelStyle}>Your Story *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your love story..."
                  style={{ 
                    ...inputStyle, 
                    resize: 'vertical',
                    borderBottomColor: focused.message ? 'rgba(201,168,76,0.5)' : 'rgba(248,244,239,.15)',
                  }}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={() => handleBlur('message')}
                />
              </div>

              <motion.button
                type="submit"
                style={{ 
                  width: '100%', 
                  marginTop: '0.5rem',
                  background: '#c9a84c',
                  border: 'none',
                  color: '#0f0f0f',
                  fontFamily: "'Jost',sans-serif",
                  fontSize: '0.65rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  padding: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                whileTap={{ scale: 0.98 }}
                whileHover={{ 
                  background: '#e8d5a3',
                  boxShadow: '0 4px 30px rgba(201,168,76,0.3)',
                }}
                disabled={loading}
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <span style={{
                      display: 'inline-block',
                      width: '16px',
                      height: '16px',
                      border: '2px solid #0f0f0f',
                      borderTop: '2px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite',
                    }} />
                    Sending...
                  </span>
                ) : sent ? (
                  '✓ Inquiry Sent!'
                ) : (
                  'Send Inquiry'
                )}
              </motion.button>

              <a
                href="https://wa.me/919544140915?text=Hi%20Shailu%2C%20I%27d%20like%20to%20book%20RAW%20FILMS%20for%20my%20wedding"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.6rem',
                  width: '100%', 
                  marginTop: '0.6rem',
                  background: 'transparent', 
                  border: '1px solid rgba(37,211,102,.4)',
                  color: 'rgba(37,211,102,.9)', 
                  fontFamily: "'Jost',sans-serif",
                  fontSize: '0.6rem', 
                  letterSpacing: '0.2em', 
                  textTransform: 'uppercase',
                  padding: '0.9rem', 
                  textDecoration: 'none', 
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(37,211,102,0.1)'
                  e.target.style.borderColor = 'rgba(37,211,102,.6)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent'
                  e.target.style.borderColor = 'rgba(37,211,102,.4)'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                Book via WhatsApp
              </a>
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Loading Animation CSS */}
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 768px) {
          section#contact {
            padding: 4rem 1rem !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }

        @media (max-width: 480px) {
          section#contact {
            padding: 3rem 0.75rem !important;
          }
        }
      `}</style>
    </section>
  )
}