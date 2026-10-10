/**
 * src/components/Services.jsx
 * ──────────────────────────────────────────────
 * Services section: card grid with hover effects.
 * Six services listed per the project spec.
 * ──────────────────────────────────────────────
 */
import { useRef, useEffect } from 'react'
import { gsap } from '../utils/gsap.js'

const SERVICES = [
  {
    id:    'editing',
    icon:  '✂',
    title: 'Video Editing',
    desc:  'Precise cuts, seamless transitions, and narrative pacing that holds attention from first frame to last.',
  },
  {
    id:    'motion',
    icon:  '⚡',
    title: 'Motion Graphics',
    desc:  'Animated titles, lower-thirds, and kinetic sequences that add energy and polish to any production.',
  },
  {
    id:    'reels',
    icon:  '📱',
    title: 'Reels & Short-form',
    desc:  'Scroll-stopping vertical content optimised for Instagram, YouTube Shorts, and every platform in between.',
  },
  {
    id:    'color',
    icon:  '🎨',
    title: 'Colour Grading',
    desc:  'Cinematic looks crafted in DaVinci Resolve — from warm golden-hour tones to moody, desaturated film stock.',
  },
  {
    id:    'sound',
    icon:  '🎵',
    title: 'Sound Design',
    desc:  'Music selection, SFX layering, and audio balancing that make the visuals feel complete and immersive.',
  },
  {
    id:    'event',
    icon:  '🎥',
    title: 'Event Filmmaking',
    desc:  'Capturing the energy and emotion of live events — from college fests to brand activations.',
  },
]

export default function Services() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.service-card', {
        y:       50,
        opacity: 0,
        duration:0.7,
        ease:    'power2.out',
        stagger: 0.08,
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
      id="services"
      ref={sectionRef}
      className="section-dark grain-dark relative overflow-hidden"
      style={{ padding: '100px 0 120px', background: '#161616' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <p className="corner-label-dark" style={{ marginBottom: '1rem' }}>What I Do</p>
          <h2 style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(2.5rem, 6vw, 5rem)',
            color:         '#fff',
            textTransform: 'uppercase',
            lineHeight:    0.92,
            letterSpacing: '0.01em',
          }}>
            Services
          </h2>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap:                 '1.25rem',
          }}
        >
          {SERVICES.map((svc) => (
            <ServiceCard key={svc.id} svc={svc} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ svc }) {
  const cardRef = useRef(null)

  return (
    <div
      ref={cardRef}
      id={`service-${svc.id}`}
      className="service-card"
      style={{
        background:   'rgba(255,255,255,0.04)',
        border:       '1px solid rgba(255,255,255,0.08)',
        borderRadius: '1.5rem',
        padding:      '2rem',
        transition:   'background 0.3s, border-color 0.3s, transform 0.3s',
        cursor:       'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background    = 'rgba(224,42,31,0.08)'
        e.currentTarget.style.borderColor   = 'rgba(224,42,31,0.3)'
        e.currentTarget.style.transform     = 'translateY(-4px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background    = 'rgba(255,255,255,0.04)'
        e.currentTarget.style.borderColor   = 'rgba(255,255,255,0.08)'
        e.currentTarget.style.transform     = 'translateY(0)'
      }}
    >
      {/* Icon */}
      <div style={{ fontSize: '1.8rem', marginBottom: '1rem', lineHeight: 1 }}>
        {svc.icon}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily:    'var(--font-sans)',
        fontSize:      '1rem',
        fontWeight:    700,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        color:         '#fff',
        marginBottom:  '0.75rem',
      }}>
        {svc.title}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize:   '0.85rem',
        lineHeight: 1.7,
        color:      'rgba(255,255,255,0.5)',
      }}>
        {svc.desc}
      </p>

      {/* Red accent line on hover (always rendered, opacity toggles via parent) */}
      <div style={{
        marginTop:  '1.5rem',
        height:     1,
        background: 'var(--color-red)',
        opacity:    0.3,
      }} />
    </div>
  )
}
