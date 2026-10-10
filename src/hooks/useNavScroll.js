/**
 * src/hooks/useNavScroll.js
 * ──────────────────────────────────────────────
 * Returns { visible } boolean.
 * Navbar is hidden when scrollY ≤ THRESHOLD.
 * Appears on first scroll past THRESHOLD.
 * Hides again when user scrolls back to top.
 * ──────────────────────────────────────────────
 */
import { useState, useEffect } from 'react'

const THRESHOLD = 80 // px

export function useNavScroll() {
  const [visible, setVisible] = useState(false)
  const [lastY,   setLastY]   = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY

      if (y <= THRESHOLD) {
        // Always hide at the very top
        setVisible(false)
      } else {
        // Show when past threshold (regardless of direction)
        setVisible(true)
      }

      setLastY(y)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastY])

  return { visible }
}
