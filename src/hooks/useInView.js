/**
 * src/hooks/useInView.js
 * ──────────────────────────────────────────────
 * Lightweight IntersectionObserver hook.
 * Returns [ref, isInView].
 * Used to lazy-load and pause off-screen videos.
 * ──────────────────────────────────────────────
 */
import { useEffect, useRef, useState } from 'react'

/**
 * @param {IntersectionObserverInit} options
 * @returns {[React.RefObject, boolean]}
 */
export function useInView(options = {}) {
  const ref     = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px', ...options }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, inView]
}
