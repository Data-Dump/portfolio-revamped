/**
 * src/components/Preloader.jsx
 * ──────────────────────────────────────────────
 * Initial loading screen that fades out when done.
 * Displays a counting percentage.
 * ──────────────────────────────────────────────
 */
import { useEffect, useState, useRef } from 'react'
import { gsap } from '../utils/gsap.js'

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const overlayRef = useRef(null)

  useEffect(() => {
    // Fake loading progress (in a real app, bind this to actual asset loading)
    const obj = { val: 0 }
    
    gsap.to(obj, {
      val: 100,
      duration: 2.0, // 2-second fake loading
      ease: 'power1.inOut',
      onUpdate: () => {
        setProgress(Math.floor(obj.val))
      },
      onComplete: () => {
        // Fade out overlay
        gsap.to(overlayRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: onComplete
        })
      }
    })

    // Lock scroll during preloader
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [onComplete])

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        padding: '2rem',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 10vw, 8rem)',
          color: '#fff',
          lineHeight: 0.8,
        }}
      >
        {progress}%
      </div>
    </div>
  )
}
