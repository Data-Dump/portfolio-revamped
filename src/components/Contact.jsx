/**
 * src/components/Contact.jsx
 * ──────────────────────────────────────────────
 * Contact section + footer.
 * - "Let's make something worth watching" headline
 * - Email CTA button
 * - Social links (Instagram)
 * - Simple name + message form
 * - Footer with "//" motif
 * ──────────────────────────────────────────────
 */
import { useRef, useEffect, useState } from 'react'
import { gsap } from '../utils/gsap.js'
import FilmGrain from './FilmGrain.jsx'

export default function Contact() {
  const sectionRef = useRef(null)
  const headRef    = useRef(null)
  const [form, setForm] = useState({ name: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        y: 40, opacity: 0, duration: 1.0, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start:   'top 75%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    /* Simple mailto fallback — replace with a form service for production */
    const subject = encodeURIComponent(`Portfolio Inquiry from ${form.name}`)
    const body    = encodeURIComponent(form.message)
    window.open(`mailto:work@kaushal.sbs?subject=${subject}&body=${body}`, '_blank')
    setSent(true)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-dark relative overflow-hidden"
      style={{ background: '#111', padding: '100px 0 0' }}
    >
      <FilmGrain opacity={0.09} />

      <div
        style={{
          maxWidth: '1000px',
          margin:   '0 auto',
          padding:  '0 2rem 100px',
          position: 'relative',
          zIndex:   5,
        }}
      >
        {/* Label */}
        <p className="corner-label-dark" style={{ marginBottom: '1.5rem' }}>Get in Touch</p>

        {/* Big headline */}
        <div ref={headRef}>
          <h2
            style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(2.8rem, 7vw, 6.5rem)',
              color:         '#fff',
              textTransform: 'uppercase',
              lineHeight:    0.9,
              letterSpacing: '0.01em',
              marginBottom:  '3rem',
            }}
          >
            Let's make something{' '}
            <em
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle:  'italic',
                color:      'var(--color-red-dusty)',
                fontWeight: 400,
                display:    'inline-block',
              }}
            >
              worth watching.
            </em>
          </h2>
        </div>

        {/* Two-column: links left, form right */}
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap:                 '4rem',
            alignItems:          'start',
          }}
        >
          {/* ── Links column ── */}
          <div>
            {/* Email button */}
            <a
              id="email-cta"
              href="mailto:work@kaushal.sbs"
              style={{
                display:       'inline-block',
                fontFamily:    'var(--font-sans)',
                fontSize:      '0.85rem',
                fontWeight:    600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color:         '#fff',
                textDecoration:'none',
                background:    'var(--color-red)',
                padding:       '14px 28px',
                borderRadius:  '100px',
                marginBottom:  '1.5rem',
                transition:    'opacity 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity   = '0.85'
                e.currentTarget.style.transform = 'scale(0.97)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity   = '1'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              work@kaushal.sbs
            </a>

            {/* Social links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
              <SocialLink
                label="Instagram"
                handle="@manzar.by.k"
                href="https://instagram.com/manzar.by.k"
              />
            </div>
          </div>

          {/* ── Form column ── */}
          <form onSubmit={handleSubmit}>
            {sent ? (
              <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-red)', fontSize: '1rem', letterSpacing: '0.05em' }}>
                ✓ Opening your email client…
              </p>
            ) : (
              <>
                <FormField
                  label="Your name"
                  id="contact-name"
                  type="text"
                  value={form.name}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  required
                />
                <FormField
                  label="Your message"
                  id="contact-message"
                  type="textarea"
                  value={form.message}
                  onChange={(v) => setForm((f) => ({ ...f, message: v }))}
                  required
                />
                <button
                  id="contact-submit"
                  type="submit"
                  style={{
                    fontFamily:    'var(--font-sans)',
                    fontSize:      '0.8rem',
                    fontWeight:    600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color:         '#fff',
                    background:    'var(--color-red)',
                    border:        'none',
                    padding:       '12px 28px',
                    borderRadius:  '100px',
                    cursor:        'pointer',
                    transition:    'opacity 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.82')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  Send Message
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer
        style={{
          borderTop:   '1px solid rgba(255,255,255,0.06)',
          padding:     '2rem',
          textAlign:   'center',
          position:    'relative',
          zIndex:      5,
        }}
      >
        <p style={{
          fontFamily:    'var(--font-sans)',
          fontSize:      '0.7rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color:         'rgba(255,255,255,0.25)',
        }}>
          <span style={{ color: 'var(--color-red)', fontWeight: 700 }}>//</span>
          {' '}© 2026 Kaushal Malvi — Video Editor & Motion Designer
        </p>
      </footer>
    </section>
  )
}

/* ── Social link row ── */
function SocialLink({ label, handle, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display:       'flex',
        alignItems:    'center',
        gap:           10,
        fontFamily:    'var(--font-sans)',
        fontSize:      '0.8rem',
        letterSpacing: '0.05em',
        color:         'rgba(255,255,255,0.5)',
        textDecoration:'none',
        transition:    'color 0.2s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
    >
      <span style={{ color: 'var(--color-label-dark)', width: 70, fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        {label}
      </span>
      {handle}
    </a>
  )
}

/* ── Form field ── */
function FormField({ label, id, type, value, onChange, required }) {
  const inputStyle = {
    width:        '100%',
    background:   'rgba(255,255,255,0.05)',
    border:       '1px solid rgba(255,255,255,0.1)',
    borderRadius: '0.75rem',
    padding:      '12px 16px',
    fontFamily:   'var(--font-sans)',
    fontSize:     '0.875rem',
    color:        '#fff',
    outline:      'none',
    transition:   'border-color 0.2s',
    display:      'block',
    resize:       type === 'textarea' ? 'vertical' : undefined,
    minHeight:    type === 'textarea' ? 120 : undefined,
  }

  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <label
        htmlFor={id}
        style={{
          display:       'block',
          fontFamily:    'var(--font-sans)',
          fontSize:      '0.6rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color:         'var(--color-label-dark)',
          marginBottom:  6,
        }}
      >
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          style={inputStyle}
          onFocus={(e)  => (e.target.style.borderColor = 'rgba(224,42,31,0.5)')}
          onBlur={(e)   => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          style={inputStyle}
          onFocus={(e)  => (e.target.style.borderColor = 'rgba(224,42,31,0.5)')}
          onBlur={(e)   => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
        />
      )}
    </div>
  )
}
