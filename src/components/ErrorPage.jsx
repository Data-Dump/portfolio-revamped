/**
 * src/components/ErrorPage.jsx
 * ──────────────────────────────────────────────
 * Shared layout for error pages (404, 403).
 * Uses mask-reveal animation matching the Divider cards.
 * ──────────────────────────────────────────────
 */
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from '../utils/gsap.js'
import FilmGrain from './FilmGrain.jsx'

export default function ErrorPage({ code, title, message }) {
  const containerRef = useRef(null)
  const codeRef = useRef(null)
  const titleRef = useRef(null)
  const messageRef = useRef(null)
  const btnRef = useRef(null)

  useEffect(() => {
    // Set meta tags for error pages
    document.title = `${code} ${title} — Kaushal Malvi`
    
    // Add noindex meta tag dynamically
    let meta = document.querySelector('meta[name="robots"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'robots'
      document.head.appendChild(meta)
    }
    meta.content = 'noindex'

    return () => {
      // Cleanup meta tag if unmounted (though this is an SPA, good practice)
      if (meta) {
        meta.content = 'index, follow'
      }
    }
  }, [code, title])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      // Mask reveal from bottom
      gsap.from([codeRef.current, titleRef.current, messageRef.current, btnRef.current], {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.1, // small delay to let page load
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative grain-dark overflow-hidden flex flex-col justify-center items-center"
      style={{
        minHeight: '100dvh',
        background: 'var(--color-charcoal)', // #1E1E1E
      }}
    >
      <FilmGrain opacity={0.11} />

      {/* Corner labels */}
      <div className="absolute top-8 left-0 right-0 flex justify-between px-8 md:px-14 z-10">
        <span className="corner-label-dark">Portfolio 2026</span>
        <span className="corner-label-dark">Error {code}</span>
      </div>

      <div className="relative z-10 text-center px-6" style={{ overflow: 'hidden' }}>
        {/* Error Code (Giant Anton, white to red gradient) */}
        <div ref={codeRef}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(6rem, 20vw, 15rem)',
              lineHeight: 0.85,
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              background: 'linear-gradient(to bottom, #FFFFFF 0%, #E02A1F 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            {code}
          </span>
        </div>

        {/* Title (Dusty Red, Montserrat) */}
        <div ref={titleRef}>
          <h1
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1.2rem, 4vw, 2rem)',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-red-dusty)', // #B85C5C
              marginBottom: '1.5rem',
            }}
          >
            {title}
          </h1>
        </div>

        {/* Short message */}
        <div ref={messageRef}>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.65)',
              marginBottom: '3rem',
              maxWidth: '400px',
              marginInline: 'auto',
              lineHeight: 1.6,
            }}
          >
            {message}
          </p>
        </div>

        {/* Back to Home Button */}
        <div ref={btnRef}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#fff',
              textDecoration: 'none',
              background: 'var(--color-red)', // #E02A1F
              padding: '14px 28px',
              borderRadius: '100px',
              transition: 'opacity 0.2s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.85'
              e.currentTarget.style.transform = 'scale(0.97)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            <span style={{ fontWeight: 700 }}>//</span> Back to Home
          </Link>
        </div>
      </div>
    </section>
  )
}
