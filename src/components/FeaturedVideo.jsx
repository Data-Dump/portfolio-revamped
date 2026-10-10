/**
 * src/components/FeaturedVideo.jsx
 * ──────────────────────────────────────────────
 * Full-width horizontal (16:9) featured reel.
 * - ~40px rounded corners
 * - Bottom gradient fade over the video
 * - Muted autoplay loop when in viewport (via IntersectionObserver)
 * - Click → opens Lightbox with audio + controls
 * - Scroll-triggered reveal: scale + opacity
 * ──────────────────────────────────────────────
 */
import { useRef, useEffect, useState } from 'react'
import { gsap, ScrollTrigger } from '../utils/gsap.js'
import { useInView }  from '../hooks/useInView.js'
import Lightbox       from './Lightbox.jsx'
import { featuredVideo } from '../data/videos.js'

export default function FeaturedVideo() {
  const wrapRef            = useRef(null)
  const videoRef           = useRef(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [inViewRef, inView] = useInView({ threshold: 0.25 })

  /* Autoplay muted when in viewport, pause when out */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (inView) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [inView])

  /* Scroll-reveal: scale from 0.96 → 1, opacity 0 → 1 */
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !wrapRef.current) return

    gsap.from(wrapRef.current, {
      scale:   0.96,
      opacity: 0,
      duration:0.9,
      ease:   'power2.out',
      scrollTrigger: {
        trigger: wrapRef.current,
        start:   'top 80%',
        toggleActions: 'play none none none',
      },
    })
  }, [])

  return (
    <>
      <div
        id="featured-video-section"
        className="section-dark grain-dark relative overflow-hidden"
        style={{ padding: '60px 0 80px' }}
      >
        {/* Outer wrapper for reveal animation */}
        <div
          ref={(el) => {
            wrapRef.current = el
            inViewRef.current = el
          }}
          onClick={() => setLightboxOpen(true)}
          style={{
            position:     'relative',
            width:        'min(92vw, 1300px)',
            margin:       '0 auto',
            borderRadius: '2.5rem',      /* ~40px */
            overflow:     'hidden',
            cursor:       'pointer',
            aspectRatio:  '16 / 9',
            background:   '#0A0A0A',
            boxShadow:    '0 24px 80px rgba(0,0,0,0.7)',
          }}
        >
          {/* Video — muted autoplay loop */}
          <video
            ref={videoRef}
            src={featuredVideo.src}
            preload="metadata"
            muted
            loop
            playsInline
            style={{
              width:      '100%',
              height:     '100%',
              objectFit:  'cover',
              display:    'block',
              borderRadius: '2.5rem',
            }}
          />

          {/* Bottom gradient fade */}
          <div
            style={{
              position:   'absolute',
              bottom:     0,
              left:       0,
              right:      0,
              height:     '40%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
              pointerEvents: 'none',
              borderRadius: '0 0 2.5rem 2.5rem',
            }}
          />

          {/* Play button overlay */}
          <div
            style={{
              position:   'absolute',
              inset:      0,
              display:    'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0)',
              transition: 'background 0.25s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.25)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0)')}
          >
            <div
              style={{
                width:         72,
                height:        72,
                borderRadius:  '50%',
                background:    'rgba(255,255,255,0.15)',
                backdropFilter:'blur(8px)',
                border:        '1px solid rgba(255,255,255,0.3)',
                display:       'flex',
                alignItems:    'center',
                justifyContent:'center',
                transition:    'transform 0.2s, background 0.2s',
              }}
            >
              {/* Play triangle */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M8 5l13 7-13 7V5z" fill="#fff" />
              </svg>
            </div>
          </div>

          {/* Video title bottom-left */}
          <div
            style={{
              position:   'absolute',
              bottom:     '1.5rem',
              left:       '1.75rem',
              zIndex:     5,
            }}
          >
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>
              {featuredVideo.client}
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 600, color: '#fff', letterSpacing: '0.04em' }}>
              {featuredVideo.title}
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox video={featuredVideo} onClose={() => setLightboxOpen(false)} />
      )}
    </>
  )
}
