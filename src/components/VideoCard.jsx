/**
 * src/components/VideoCard.jsx
 * ──────────────────────────────────────────────
 * Single 9:16 vertical video card.
 * - Static dark thumb by default (preload="none")
 * - Hover: muted autoplay
 * - Click: opens Lightbox (managed by parent)
 * - Only one video plays at a time (parent ensures this)
 * - Off-screen: paused by useInView
 * - Stagger scroll-reveal (handled by parent VerticalGrid)
 * - Kinetic caption inside frame
 *
 * Props:
 *   video      { id, src, title, client, category, tools }
 *   onPlay     (id) => void   — notify parent a video is playing
 *   playingId  string | null  — currently playing card id
 *   onOpen     (video) => void — open lightbox
 *   index      number          — for stagger delay
 * ──────────────────────────────────────────────
 */
import { useRef, useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView.js'

export default function VideoCard({ video, onPlay, playingId, onOpen, index }) {
  const [inViewRef, inView] = useInView({ threshold: 0.2 })
  const videoRef            = useRef(null)
  const [hovered, setHovered] = useState(false)

  const isPlaying = playingId === video.id

  /* ── Play automatically when in view (muted) ── */
  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return

    if (inView) {
      vid.play().catch(() => {})
    } else {
      vid.pause()
    }
  }, [inView])

  return (
    <div
      ref={inViewRef}
      id={`video-card-${video.id}`}
      className="relative group"
      style={{
        aspectRatio: '9 / 16',
        borderRadius:'2.5rem',       /* ~40px */
        overflow:    'hidden',
        background:  '#0D0D0D',
        cursor:      'pointer',
        boxShadow:   '0 8px 40px rgba(0,0,0,0.6)',
        transition:  'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.4s',
        /* Hover: this card scales up; neighbour dimming handled in VerticalGrid */
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(video)}
    >
      {/* Video element — preload="none" for performance */}
      <video
        ref={videoRef}
        src={video.src}
        preload="none"
        muted
        loop
        playsInline
        style={{
          width:     '100%',
          height:    '100%',
          objectFit: 'cover',
          display:   'block',
          transition:'opacity 0.3s',
          opacity:   hovered ? 1 : 0.85,
        }}
      />

      {/* Bottom gradient */}
      <div
        style={{
          position:   'absolute',
          bottom:     0,
          left:       0,
          right:      0,
          height:     '55%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Kinetic caption inside frame */}
      <div
        style={{
          position:   'absolute',
          bottom:     '1.2rem',
          left:       '1.1rem',
          right:      '1.1rem',
          zIndex:     5,
          pointerEvents: 'none',
        }}
      >
        {/* Category tag */}
        <span style={{
          display:       'inline-block',
          fontFamily:    'var(--font-sans)',
          fontSize:      '0.55rem',
          fontWeight:    600,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color:         'var(--color-red-dusty)',
          marginBottom:  6,
        }}>
          {video.category}
        </span>

        {/* Title with a Playfair italic highlight on the last word */}
        <TitleWithHighlight title={video.title} />

        {/* Client */}
        <p style={{
          fontFamily:    'var(--font-sans)',
          fontSize:      '0.6rem',
          letterSpacing: '0.1em',
          color:         'rgba(255,255,255,0.45)',
          marginTop:     4,
          textTransform: 'uppercase',
        }}>
          {video.client}
        </p>

        {/* Tool tags */}
        <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
          {video.tools.map((t) => (
            <span
              key={t}
              style={{
                fontFamily:    'var(--font-sans)',
                fontSize:      '0.5rem',
                fontWeight:    500,
                letterSpacing: '0.08em',
                color:         'rgba(255,255,255,0.4)',
                border:        '1px solid rgba(255,255,255,0.15)',
                borderRadius:  '100px',
                padding:       '2px 8px',
                textTransform: 'uppercase',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Hover "PLAY" label */}
      <div
        style={{
          position:    'absolute',
          top:         '50%',
          left:        '50%',
          transform:   'translate(-50%, -50%)',
          opacity:     hovered ? 1 : 0,
          transition:  'opacity 0.25s',
          zIndex:      10,
          pointerEvents: 'none',
          display:     'flex',
          flexDirection:'column',
          alignItems:  'center',
          gap:         8,
        }}
      >
        {/* Circle play button */}
        <div style={{
          width:          52,
          height:         52,
          borderRadius:   '50%',
          background:     'rgba(255,255,255,0.18)',
          backdropFilter: 'blur(6px)',
          border:         '1px solid rgba(255,255,255,0.3)',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M8 5l13 7-13 7V5z" fill="#fff" />
          </svg>
        </div>
        <span style={{
          fontFamily:    'var(--font-sans)',
          fontSize:      '0.6rem',
          fontWeight:    700,
          letterSpacing: '0.25em',
          color:         '#fff',
          textTransform: 'uppercase',
        }}>
          Play
        </span>
      </div>
    </div>
  )
}

/* ── Title with the last word in Playfair italic (gold glow) ── */
function TitleWithHighlight({ title }) {
  const words = title.split(' ')
  if (words.length <= 1) {
    return (
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize:   '0.85rem',
        fontWeight: 600,
        color:      '#fff',
        lineHeight: 1.3,
        marginBottom: 2,
      }}>
        {title}
      </p>
    )
  }
  const body = words.slice(0, -1).join(' ')
  const last = words[words.length - 1]
  return (
    <p style={{
      fontFamily: 'var(--font-sans)',
      fontSize:   '0.85rem',
      fontWeight: 600,
      color:      '#fff',
      lineHeight: 1.3,
      marginBottom: 2,
    }}>
      {body}{' '}
      <em style={{
        fontFamily: 'var(--font-serif)',
        fontStyle:  'italic',
        fontWeight: 400,
        color:      '#D4AF6A',   /* warm gold */
        textShadow: '0 0 12px rgba(212,175,106,0.5)',
      }}>
        {last}
      </em>
    </p>
  )
}
