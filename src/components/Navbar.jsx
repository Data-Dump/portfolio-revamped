/**
 * src/components/Navbar.jsx
 * ──────────────────────────────────────────────
 * Glassmorphic floating pill navbar.
 * - Hidden on load (translateY(-100%))
 * - Slides down after 80px of scroll
 * - Hides again when back at the top
 * - Active link highlighted by IntersectionObserver
 * - Mobile: hamburger → full-screen overlay menu
 * ──────────────────────────────────────────────
 */
import { useEffect, useRef, useState } from 'react'
import { gsap } from '../utils/gsap.js'
import { useNavScroll } from '../hooks/useNavScroll.js'

/* Section IDs that map to nav links */
const NAV_LINKS = [
  { label: 'Work',     href: '#work'     },
  { label: 'About',    href: '#about'    },
  { label: 'Services', href: '#services' },
  { label: 'Contact',  href: '#contact'  },
]

export default function Navbar() {
  const navRef        = useRef(null)
  const { visible }   = useNavScroll()
  const [activeId, setActiveId] = useState('')
  const [menuOpen,  setMenuOpen] = useState(false)

  /* ── GSAP slide in/out when visible changes ── */
  useEffect(() => {
    if (!navRef.current) return
    gsap.to(navRef.current, {
      y:        visible ? 0 : '-120%',
      duration: visible ? 0.45 : 0.35,
      ease:     visible ? 'power3.out' : 'power2.in',
    })
  }, [visible])

  /* ── IntersectionObserver — highlight active section ── */
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.slice(1))
    const observers  = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id)
        },
        { threshold: 0.35 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  /* ── Smooth scroll on link click ── */
  const handleLinkClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    document.body.classList.toggle('no-scroll', menuOpen)
    return () => document.body.classList.remove('no-scroll')
  }, [menuOpen])

  return (
    <>
      {/* ── Navbar pill ── */}
      <nav
        ref={navRef}
        id="navbar"
        aria-label="Main navigation"
        className="fixed top-4 left-1/2 z-50"
        style={{
          transform:       'translateX(-50%) translateY(-120%)',
          width:           'min(92vw, 780px)',
          background:      'rgba(18, 18, 18, 0.75)',
          backdropFilter:  'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border:          '1px solid rgba(255,255,255,0.08)',
          borderRadius:    '100px',
          padding:         '10px 18px',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'space-between',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="flex items-center gap-1 select-none"
          style={{ textDecoration: 'none' }}
        >
          <span style={{ color: 'var(--color-red)', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1rem' }}>//</span>
          <span style={{ color: '#fff', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            KM
          </span>
        </a>

        {/* Desktop links */}
        <ul
          className="hidden md:flex items-center gap-1"
          style={{ listStyle: 'none', margin: 0, padding: 0 }}
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.href.slice(1)
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  style={{
                    fontFamily:    'var(--font-sans)',
                    fontSize:      '0.78rem',
                    fontWeight:    isActive ? 600 : 400,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color:         isActive ? '#fff' : 'rgba(255,255,255,0.55)',
                    textDecoration: 'none',
                    padding:       '6px 14px',
                    borderRadius:  '100px',
                    position:      'relative',
                    transition:    'color 0.25s',
                    /* Active red indicator */
                    ...(isActive && {
                      background: 'rgba(224,42,31,0.18)',
                    }),
                  }}
                >
                  {/* Red dot for active */}
                  {isActive && (
                    <span
                      style={{
                        position:    'absolute',
                        top:         4,
                        right:       6,
                        width:       4,
                        height:      4,
                        borderRadius:'50%',
                        background:  'var(--color-red)',
                      }}
                    />
                  )}
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* CTA button (desktop) */}
        <a
          href="#contact"
          onClick={(e) => handleLinkClick(e, '#contact')}
          className="hidden md:block"
          style={{
            fontFamily:    'var(--font-sans)',
            fontSize:      '0.75rem',
            fontWeight:    600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color:         '#fff',
            textDecoration:'none',
            background:    'var(--color-red)',
            padding:       '8px 20px',
            borderRadius:  '100px',
            transition:    'opacity 0.2s, transform 0.2s',
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
          Hire Me
        </a>

        {/* Hamburger (mobile) */}
        <button
          id="hamburger-btn"
          className="md:hidden flex flex-col gap-[5px] p-2"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display:       'block',
                width:         22,
                height:        1.5,
                background:    '#fff',
                borderRadius:  2,
                transition:    'transform 0.3s, opacity 0.3s',
                ...(menuOpen && i === 0 && { transform: 'translateY(6.5px) rotate(45deg)' }),
                ...(menuOpen && i === 1 && { opacity: 0 }),
                ...(menuOpen && i === 2 && { transform: 'translateY(-6.5px) rotate(-45deg)' }),
              }}
            />
          ))}
        </button>
      </nav>

      {/* ── Mobile full-screen overlay ── */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col items-center justify-center"
          style={{
            background:     'rgba(14,14,14,0.97)',
            backdropFilter: 'blur(24px)',
          }}
        >
          <ul style={{ listStyle: 'none', textAlign: 'center', padding: 0 }}>
            {NAV_LINKS.map((link, i) => (
              <li key={link.href} style={{ marginBottom: '2rem' }}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  style={{
                    fontFamily:    'var(--font-display)',
                    fontSize:      'clamp(2.5rem, 10vw, 4.5rem)',
                    color:         activeId === link.href.slice(1) ? 'var(--color-red)' : '#fff',
                    textDecoration:'none',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                style={{
                  display:       'inline-block',
                  fontFamily:    'var(--font-sans)',
                  fontSize:      '0.9rem',
                  fontWeight:    600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color:         '#fff',
                  textDecoration:'none',
                  background:    'var(--color-red)',
                  padding:       '14px 40px',
                  borderRadius:  '100px',
                  marginTop:     '1rem',
                }}
              >
                Hire Me
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}
