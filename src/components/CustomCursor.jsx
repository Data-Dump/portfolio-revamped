/**
 * src/components/CustomCursor.jsx
 * ──────────────────────────────────────────────
 * Custom red dot cursor that follows mouse.
 * Expands on hover over interactable elements.
 * Hidden on touch devices.
 * ──────────────────────────────────────────────
 */
import { useEffect, useRef } from 'react'
import { gsap } from '../utils/gsap.js'

export default function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    // Only enable on fine pointer devices (desktop)
    if (window.matchMedia('(pointer: coarse)').matches) return

    const cursor = cursorRef.current
    if (!cursor) return

    // Show cursor when mouse moves initially
    gsap.set(cursor, { opacity: 0 })

    const onMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        duration: 0.15,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    // Expand cursor on hoverable elements
    const onMouseOver = (e) => {
      const isInteractable = e.target.closest('a, button, video, .group, [role="button"]')
      gsap.to(cursor, {
        scale: isInteractable ? 2.5 : 1,
        background: isInteractable ? 'rgba(224,42,31,0.2)' : 'rgba(224,42,31,1)',
        border: isInteractable ? '1px solid rgba(224,42,31,0.8)' : 'none',
        duration: 0.2,
      })
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseover', onMouseOver)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="hidden md:block pointer-events-none fixed z-[9999]"
      style={{
        width: 12,
        height: 12,
        borderRadius: '50%',
        background: 'var(--color-red)',
        transform: 'translate(-50%, -50%)',
        mixBlendMode: 'difference',
        left: 0,
        top: 0,
      }}
    />
  )
}
