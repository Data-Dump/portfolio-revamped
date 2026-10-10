/**
 * src/components/Hero.jsx
 * ──────────────────────────────────────────────
 * Hero section: paper background, giant "PORTFOLIO"
 * text with black→red vertical gradient, portrait
 * cutout sandwiched between two text layers, corner
 * labels, tagline, GSAP intro timeline, ambient loop,
 * mouse parallax, and a scroll indicator.
 * ──────────────────────────────────────────────
 */
import { useEffect, useRef } from 'react'
import { gsap } from '../utils/gsap.js'

/* ─── Sub-components ────────────────────────── */

/** Top corner labels ("VIDEO EDITOR" / "PORTFOLIO") */
function CornerLabels() {
  return (
    <div
      ref={null}
      className="absolute top-6 left-0 right-0 flex justify-between px-6 md:px-10 z-20"
      id="hero-corner-labels"
    >
      <span className="corner-label">Video Editor</span>
      <span className="corner-label">Portfolio</span>
    </div>
  )
}

/** Scroll indicator at bottom-right */
function ScrollIndicator() {
  return (
    <div
      id="hero-scroll-indicator"
      className="absolute bottom-8 right-6 md:right-10 flex flex-col items-center gap-2 z-20 opacity-0"
    >
      <span
        className="text-label"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.6rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--color-label)',
          writingMode: 'vertical-rl',
        }}
      >
        Scroll
      </span>
      {/* Animated line */}
      <div
        id="scroll-line"
        style={{
          width: 1,
          height: 48,
          background: 'linear-gradient(to bottom, var(--color-label) 0%, transparent 100%)',
          animation: 'scrollLinePulse 1.8s ease-in-out infinite',
        }}
      />
    </div>
  )
}

/* ─── Main Hero ─────────────────────────────── */
export default function Hero({ ready }) {
  const sectionRef  = useRef(null)
  const textBackRef = useRef(null)   // "PORTFOLIO" — behind portrait
  const portraitRef = useRef(null)
  const labelsRef   = useRef(null)
  const taglineRef  = useRef(null)
  const scrollIndRef= useRef(null)

  /* Store mouse position for parallax */
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const section  = sectionRef.current
    const textBack = textBackRef.current
    const portrait = portraitRef.current
    const labels   = labelsRef.current
    const tagline  = taglineRef.current
    const scrollInd= scrollIndRef.current

    if (!section || !ready) return

    if (prefersReduced) {
      // Skip animation — show everything instantly
      gsap.set([textBack, portrait, labels, tagline, scrollInd], {
        opacity: 1, y: 0, scale: 1, x: 0,
      })
      return
    }

    /* ── Initial hidden states ── */
    gsap.set(textBack,  { y: 80, opacity: 0, skewX: 3 })
    gsap.set(portrait,  { scale: 1.12, opacity: 0, filter: 'blur(4px)' })
    gsap.set(labels,    { opacity: 0, y: -12 })
    gsap.set(tagline,   { opacity: 0, y: 20 })
    gsap.set(scrollInd, { opacity: 0 })

    /* ── Intro timeline ── */
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // 0.0s — paper + grain already visible (section is opaque)
    // 0.1s — giant text rises with overshoot
    tl.to(textBack, {
      y: 0,
      opacity: 1,
      skewX: 0,
      duration: 1.0,
      ease: 'back.out(1.4)',
    }, 0.1)

    // 0.25s — corner labels slide down and fade
    tl.to(labels, {
      opacity: 1,
      y: 0,
      duration: 0.7,
    }, 0.25)

    // 0.7s — portrait: scale + RGB-split glitch then settle
    tl.to(portrait, {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.9,
      ease: 'power2.out',
      onStart() {
        // Brief RGB-split glitch
        gsap.fromTo(portrait,
          { filter: 'drop-shadow(3px 0 0 rgba(224,42,31,0.6)) drop-shadow(-3px 0 0 rgba(0,100,255,0.4)) blur(0px)' },
          { filter: 'drop-shadow(0px 0 0 transparent) blur(0px)', duration: 0.4, ease: 'steps(4)' }
        )
      },
    }, 0.7)

    // 1.2s — tagline slides up
    tl.to(tagline, {
      opacity: 1,
      y: 0,
      duration: 0.6,
    }, 1.2)

    // 1.7s — scroll indicator fades in
    tl.to(scrollInd, {
      opacity: 1,
      duration: 0.5,
    }, 1.7)

    /* ── Ambient idle loop: gentle "breathing" on the word ── */
    gsap.to(textBack, {
      scaleY: 1.008,
      scaleX: 0.998,
      duration: 3.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 2.2,
    })

    /* ── Mouse parallax ── */
    const onMouseMove = (e) => {
      const { innerWidth: W, innerHeight: H } = window
      // Normalise to [-0.5, 0.5]
      const nx = (e.clientX / W) - 0.5
      const ny = (e.clientY / H) - 0.5

      mouseRef.current = { x: nx, y: ny }

      // Text moves opposite to mouse (push-away feel)
      gsap.to(textBack, {
        x: -nx * 18,
        y: -ny * 10,
        duration: 1.2,
        ease: 'power1.out',
        overwrite: 'auto',
      })

      // Portrait moves WITH the mouse (slightly less)
      gsap.to(portrait, {
        x: nx * 12,
        y: ny * 6,
        duration: 1.0,
        ease: 'power1.out',
        overwrite: 'auto',
      })
    }

    window.addEventListener('mousemove', onMouseMove)

    return () => {
      tl.kill()
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [ready])

  return (
    <>
      {/* ── Scroll-line keyframe animation ── */}
      <style>{`
        @keyframes scrollLinePulse {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
          50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
        }
      `}</style>

      <section
        id="hero"
        ref={sectionRef}
        className="grain-paper relative w-full overflow-hidden"
        style={{
          background: 'var(--color-paper)',
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* ── Corner labels ── */}
        <div
          ref={labelsRef}
          className="absolute top-6 left-0 right-0 flex justify-between px-6 md:px-10 z-20"
        >
          <span className="corner-label">Video Editor</span>
          <span className="corner-label">Portfolio</span>
        </div>

        {/* ── Z-layer stack ─────────────────────────
            z=1  textBack  (PORTFOLIO)
            z=2  portrait
            ──────────────────────────────────────── */}

        {/* Layer 1 — text */}
        <div
          ref={textBackRef}
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none select-none"
          style={{ paddingBottom: '4vh' }}
        >
          <HeroWord />
        </div>

        {/* Layer 2 — Portrait (centre) */}
        <div
          ref={portraitRef}
          className="relative z-20 pointer-events-none select-none"
          style={{
            width: 'clamp(280px, 65vw, 520px)',
            marginTop: '2vh',
          }}
        >
          <img
            src="/assets/portrait-cutout.png"
            alt="Kaushal Malvi"
            draggable="false"
            style={{
              width: '100%',
              objectFit: 'contain',
              /* Soft fade at the bottom */
              WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
              filter: 'grayscale(1)',  /* match B&W reference */
            }}
          />
        </div>

        {/* ── Tagline: // VIDEO EDITOR / MOTION DESIGNER ── */}
        <div
          ref={taglineRef}
          className="absolute bottom-10 left-6 md:left-10 z-40 flex items-start gap-3"
        >
          {/* Red "//" */}
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: 'clamp(1rem, 2.2vw, 1.5rem)',
              color: 'var(--color-red)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            //
          </span>
          {/* Roles */}
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: 'clamp(0.75rem, 1.6vw, 1.05rem)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#444',
              lineHeight: 1.4,
            }}
          >
            <div>Video Editor</div>
            <div>Motion Designer</div>
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <div
          ref={scrollIndRef}
          className="absolute bottom-8 right-6 md:right-10 flex flex-col items-center gap-2 z-40"
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.58rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-label)',
              writingMode: 'vertical-rl',
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: 1,
              height: 44,
              background: 'linear-gradient(to bottom, var(--color-label) 0%, transparent 100%)',
              animation: 'scrollLinePulse 1.8s ease-in-out infinite',
            }}
          />
        </div>
      </section>
    </>
  )
}

/* ─── HeroWord ──────────────────────────────────
   "PORTFOLIO" with black→red vertical gradient.
   ─────────────────────────────────────────────── */
function HeroWord() {
  return (
    <span
      style={{
        fontFamily:   'var(--font-display)',
        fontSize:     'clamp(4.5rem, 18.5vw, 20rem)',
        lineHeight:   0.88,
        letterSpacing:'-0.01em',
        textTransform: 'uppercase',
        /* Black → deep red gradient */
        background: `linear-gradient(
          to bottom,
          #0A0A0A   0%,
          #0A0A0A  30%,
          #8B1010  58%,
          #E02A1F  78%,
          #5C0000  95%
        )`,
        WebkitBackgroundClip: 'text',
        backgroundClip:       'text',
        WebkitTextFillColor:  'transparent',
        color:                'transparent',
        /* Slight dithered blur at the very bottom — simulated with filter */
        filter: 'drop-shadow(0 12px 24px rgba(180,0,0,0.35))',
        display: 'block',
        whiteSpace: 'nowrap',
        userSelect: 'none',
      }}
    >
      Portfolio
    </span>
  )
}
