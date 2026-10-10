/**
 * src/components/DividerCard.jsx
 * ──────────────────────────────────────────────
 * Full-viewport cinematic chapter-break card.
 * Matches ref-divider.png: dark charcoal, film dust,
 * corner labels, giant white + dusty-red headline,
 * mask-reveal on scroll via GSAP ScrollTrigger.
 *
 * Props:
 *   id          string  — section id for anchor links
 *   topLeft     string  — corner label (e.g. "PORTFOLIO 2026")
 *   topRight    string  — corner label (e.g. "SELECTED WORK — 2024–2025")
 *   line1       string  — white headline word (e.g. "PRESENTATION")
 *   line2       string  — dusty-red headline word (e.g. "VIDEOS")
 * ──────────────────────────────────────────────
 */
import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '../utils/gsap.js'
import FilmGrain from './FilmGrain.jsx'

export default function DividerCard({ id, topLeft, topRight, line1, line2 }) {
  const sectionRef  = useRef(null)
  const line1Ref    = useRef(null)
  const line2Ref    = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      /* Mask-reveal: text starts clipped (y +60, opacity 0) then lifts into view */
      gsap.from([line1Ref.current, line2Ref.current], {
        y:       60,
        opacity: 0,
        duration:1.0,
        ease:   'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start:   'top 70%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative grain-dark overflow-hidden"
      style={{
        minHeight:       '100dvh',
        background:      'var(--color-charcoal)',
        display:         'flex',
        flexDirection:   'column',
        justifyContent:  'center',
        alignItems:      'center',
      }}
    >
      {/* Animated film-grain overlay */}
      <FilmGrain opacity={0.11} />

      {/* Corner labels */}
      <div
        className="absolute top-8 left-0 right-0 flex justify-between px-8 md:px-14 z-10"
      >
        <span className="corner-label-dark">{topLeft}</span>
        <span className="corner-label-dark">{topRight}</span>
      </div>

      {/* Central headline */}
      <div
        className="relative z-10 text-center px-6"
        style={{ overflow: 'hidden' }}
      >
        <div ref={line1Ref}>
          <span
            style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(3.5rem, 10vw, 9rem)',
              lineHeight:    0.92,
              letterSpacing: '0.01em',
              textTransform: 'uppercase',
              color:         '#FFFFFF',
              display:       'block',
            }}
          >
            {line1}
          </span>
        </div>
        <div ref={line2Ref}>
          <span
            style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(3.5rem, 10vw, 9rem)',
              lineHeight:    0.92,
              letterSpacing: '0.01em',
              textTransform: 'uppercase',
              color:         'var(--color-red-dusty)',
              display:       'block',
            }}
          >
            {line2}
          </span>
        </div>
      </div>
    </section>
  )
}
