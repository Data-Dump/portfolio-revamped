/**
 * src/components/VerticalGrid.jsx
 * ──────────────────────────────────────────────
 * 3×2 grid of vertical VideoCards.
 * - Charcoal bg with film-dust overlay (matches ref-frames.png)
 * - Cards stagger in with rise + slight rotation on scroll
 * - Hover: hovered card scales up; all others dim
 * - One video plays at a time
 * - Mobile: horizontal scroll snap carousel
 * ──────────────────────────────────────────────
 */
import { useRef, useEffect, useState } from 'react'
import { gsap, ScrollTrigger } from '../utils/gsap.js'
import FilmGrain   from './FilmGrain.jsx'
import VideoCard   from './VideoCard.jsx'
import Lightbox    from './Lightbox.jsx'
import { verticalVideos } from '../data/videos.js'

export default function VerticalGrid() {
  const sectionRef   = useRef(null)
  const cardRefs     = useRef([])
  const [playingId,   setPlayingId]   = useState(null)
  const [lightboxVideo, setLightboxVideo] = useState(null)

  /* ── Stagger scroll-reveal ── */
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !sectionRef.current) return

    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, {
          y:       70,
          opacity: 0,
          rotate:  i % 2 === 0 ? -1.5 : 1.5,
          duration:0.8,
          ease:    'power3.out',
          scrollTrigger: {
            trigger: card,
            start:   'top 88%',
            toggleActions: 'play none none none',
          },
          delay: (i % 3) * 0.1,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  /* ── Hover dim logic: dim all cards except the hovered one ── */
  const handleHoverEnter = (hoveredIdx) => {
    cardRefs.current.forEach((card, i) => {
      if (!card) return
      gsap.to(card, {
        opacity: i === hoveredIdx ? 1 : 0.45,
        scale:   i === hoveredIdx ? 1.03 : 0.97,
        duration: 0.35,
        ease:    'power2.out',
      })
    })
  }
  const handleHoverLeave = () => {
    cardRefs.current.forEach((card) => {
      if (!card) return
      gsap.to(card, {
        opacity: 1,
        scale:   1,
        duration: 0.35,
        ease:    'power2.out',
      })
    })
  }

  return (
    <>
      <section
        id="reels"
        ref={sectionRef}
        className="section-dark relative overflow-hidden"
        style={{
          padding: '80px 0 100px',
          background: 'var(--color-charcoal)',
        }}
      >
        {/* Film grain overlay */}
        <FilmGrain opacity={0.10} />

        {/* ── Desktop: 3-column grid ── */}
        <div
          className="hidden md:grid relative z-10"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap:                 '1.25rem',
            maxWidth:            '1280px',
            margin:              '0 auto',
            padding:             '0 2rem',
          }}
        >
          {verticalVideos.map((video, i) => (
            <div
              key={video.id}
              ref={(el) => (cardRefs.current[i] = el)}
              onMouseEnter={() => handleHoverEnter(i)}
              onMouseLeave={handleHoverLeave}
            >
              <VideoCard
                video={video}
                index={i}
                playingId={playingId}
                onPlay={setPlayingId}
                onOpen={(v) => setLightboxVideo(v)}
              />
            </div>
          ))}
        </div>

        {/* ── Mobile: horizontal snap carousel ── */}
        <div
          className="md:hidden relative z-10"
          style={{
            display:             'flex',
            overflowX:           'auto',
            gap:                 '1rem',
            padding:             '0 1.25rem 1rem',
            scrollSnapType:      'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth:      'none',
          }}
        >
          {verticalVideos.map((video, i) => (
            <div
              key={video.id}
              style={{
                flex:       '0 0 72vw',
                scrollSnapAlign: 'center',
                maxWidth:   320,
              }}
            >
              <VideoCard
                video={video}
                index={i}
                playingId={playingId}
                onPlay={setPlayingId}
                onOpen={(v) => setLightboxVideo(v)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxVideo && (
        <Lightbox
          video={lightboxVideo}
          onClose={() => {
            setLightboxVideo(null)
            setPlayingId(null)
          }}
        />
      )}
    </>
  )
}
