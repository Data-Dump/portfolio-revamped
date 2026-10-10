/**
 * src/components/Lightbox.jsx
 * ──────────────────────────────────────────────
 * Full-screen video modal with:
 * - Dark overlay + backdrop blur
 * - Auto-plays with audio + controls
 * - Close: Escape key, click outside, ✕ button
 * - GSAP scale-in/out animation
 *
 * Props:
 *   video    { src, title, client }
 *   onClose  () => void
 * ──────────────────────────────────────────────
 */
import { useEffect, useRef } from 'react'
import { gsap } from '../utils/gsap.js'

export default function Lightbox({ video, onClose }) {
  const overlayRef = useRef(null)
  const boxRef     = useRef(null)
  const videoRef   = useRef(null)

  /* ── Open animation ── */
  useEffect(() => {
    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    )
    gsap.fromTo(boxRef.current,
      { scale: 0.92, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.3)' }
    )
    // Play with audio
    videoRef.current?.play().catch(() => {})

    // Lock scroll
    document.body.classList.add('no-scroll')
    return () => document.body.classList.remove('no-scroll')
  }, [])

  /* ── Close with animation ── */
  const close = () => {
    videoRef.current?.pause()
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, onComplete: onClose })
    gsap.to(boxRef.current, { scale: 0.92, opacity: 0, duration: 0.2 })
  }

  /* ── Keyboard: Escape ── */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* Determine aspect ratio for the video box */
  const isVertical = video.orientation === 'vertical'

  return (
    <div
      ref={overlayRef}
      id="lightbox-overlay"
      onClick={close}
      style={{
        position:       'fixed',
        inset:          0,
        zIndex:         100,
        background:     'rgba(0,0,0,0.92)',
        backdropFilter: 'blur(10px)',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        padding:        '24px',
      }}
    >
      {/* Video box — stop propagation so clicking video doesn't close */}
      <div
        ref={boxRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          position:     'relative',
          borderRadius: '1.5rem',
          overflow:     'hidden',
          background:   '#000',
          boxShadow:    '0 32px 100px rgba(0,0,0,0.9)',
          /* Responsive sizing: vertical = tall, horizontal = wide */
          width:        isVertical ? 'min(90vw, 380px)'  : 'min(92vw, 1100px)',
          aspectRatio:  isVertical ? '9 / 16'            : '16 / 9',
          maxHeight:    '90dvh',
        }}
      >
        <video
          ref={videoRef}
          src={video.src}
          controls
          playsInline
          style={{
            width:      '100%',
            height:     '100%',
            objectFit:  'contain',
            display:    'block',
            background: '#000',
          }}
        />

        {/* ✕ close button */}
        <button
          id="lightbox-close"
          onClick={close}
          aria-label="Close video"
          style={{
            position:    'absolute',
            top:         12,
            right:       12,
            width:       36,
            height:      36,
            borderRadius:'50%',
            background:  'rgba(255,255,255,0.15)',
            backdropFilter:'blur(6px)',
            border:      '1px solid rgba(255,255,255,0.2)',
            color:       '#fff',
            fontSize:    '1rem',
            cursor:      'pointer',
            display:     'flex',
            alignItems:  'center',
            justifyContent:'center',
            zIndex:      10,
          }}
        >
          ✕
        </button>

        {/* Title / client overlay at bottom */}
        <div
          style={{
            position:   'absolute',
            bottom:     0,
            left:       0,
            right:      0,
            padding:    '1.5rem',
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
            pointerEvents: 'none',
          }}
        >
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 4 }}>
            {video.client}
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>
            {video.title}
          </p>
        </div>
      </div>
    </div>
  )
}
