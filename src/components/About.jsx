/**
 * src/components/About.jsx
 * ──────────────────────────────────────────────
 * About section: split layout — portrait left,
 * bio + skills + animated counters right.
 * Scroll-reveal on each element.
 * ──────────────────────────────────────────────
 */
import { useRef, useEffect, useState } from 'react'
import { gsap } from '../utils/gsap.js'
import { useInView } from '../hooks/useInView.js'

/* ── Animated counter ── */
function Counter({ target, suffix = '', label }) {
  const [count,    setCount]    = useState(0)
  const [inViewRef, inView]     = useInView({ threshold: 0.5 })
  const animated = useRef(false)

  useEffect(() => {
    if (!inView || animated.current) return
    animated.current = true
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) { setCount(target); return }

    const obj = { val: 0 }
    gsap.to(obj, {
      val:      target,
      duration: 1.8,
      ease:     'power2.out',
      onUpdate() { setCount(Math.floor(obj.val)) },
    })
  }, [inView])

  return (
    <div ref={inViewRef} style={{ textAlign: 'center' }}>
      <p style={{
        fontFamily:    'var(--font-display)',
        fontSize:      'clamp(2.8rem, 6vw, 5rem)',
        lineHeight:    1,
        color:         '#fff',
        letterSpacing: '0.02em',
      }}>
        {count}{suffix}
      </p>
      <p style={{
        fontFamily:    'var(--font-sans)',
        fontSize:      '0.65rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color:         'var(--color-label-dark)',
        marginTop:     8,
      }}>
        {label}
      </p>
    </div>
  )
}

/* Skills list */
const SKILLS = [
  'Video Editing',
  'Motion Graphics',
  'Colour Grading',
  'Sound Design',
  'Short-form Reels',
  'Event Filmmaking',
]

export default function About() {
  const sectionRef = useRef(null)
  const leftRef    = useRef(null)
  const rightRef   = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -50, opacity: 0, duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' },
      })
      gsap.from(rightRef.current, {
        x:  50, opacity: 0, duration: 1.0, ease: 'power3.out', delay: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-dark grain-dark relative overflow-hidden"
      style={{ padding: '100px 0 120px', background: 'var(--color-charcoal)' }}
    >
      <div
        style={{
          maxWidth:      '1200px',
          margin:        '0 auto',
          padding:       '0 2rem',
          display:       'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap:           '4rem',
          alignItems:    'center',
        }}
      >
        {/* ── Left: Portrait ── */}
        <div ref={leftRef} style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              position:    'relative',
              width:       'min(100%, 380px)',
              borderRadius:'2rem',
              overflow:    'hidden',
              background:  '#111',
              boxShadow:   '0 24px 80px rgba(0,0,0,0.7)',
            }}
          >
            <img
              src="/assets/portrait-cutout.png"
              alt="Kaushal Malvi"
              loading="lazy"
              style={{
                width:      '100%',
                objectFit:  'cover',
                display:    'block',
                filter:     'grayscale(1)',
                mixBlendMode:'luminosity',
              }}
            />
            {/* Red accent strip */}
            <div style={{
              position:   'absolute',
              bottom:     0,
              left:       0,
              right:      0,
              height:     3,
              background: 'var(--color-red)',
            }} />
          </div>
        </div>

        {/* ── Right: Bio + Skills + Counters ── */}
        <div ref={rightRef}>
          {/* Label */}
          <p className="corner-label-dark" style={{ marginBottom: '1.2rem' }}>
            About Me
          </p>

          {/* Name */}
          <h2 style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(2.5rem, 5vw, 4rem)',
            color:         '#fff',
            lineHeight:    0.95,
            letterSpacing: '0.01em',
            textTransform: 'uppercase',
            marginBottom:  '1.5rem',
          }}>
            Kaushal{' '}
            <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--color-red-dusty)', fontWeight: 400 }}>
              Malvi
            </em>
          </h2>

          {/* Bio */}
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize:   '0.95rem',
            lineHeight: 1.8,
            color:      'rgba(255,255,255,0.65)',
            marginBottom:'1.5rem',
            maxWidth:   480,
          }}>
            I craft stories through motion — from raw footage to finished
            films that leave an impression. Specialising in cinematic
            reels, event coverage, and creator content, I bring a sharp
            eye for rhythm, pacing, and visual language to every project.
          </p>

          {/* Skills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
            {SKILLS.map((skill) => (
              <span
                key={skill}
                style={{
                  fontFamily:    'var(--font-sans)',
                  fontSize:      '0.65rem',
                  fontWeight:    500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color:         'rgba(255,255,255,0.7)',
                  border:        '1px solid rgba(255,255,255,0.15)',
                  borderRadius:  '100px',
                  padding:       '6px 14px',
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Counters */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <Counter target={3}  suffix="+"  label="Years Experience" />
            <Counter target={40} suffix="+"  label="Projects Completed" />
            <Counter target={10} suffix="+"  label="Happy Clients" />
          </div>
        </div>
      </div>
    </section>
  )
}
