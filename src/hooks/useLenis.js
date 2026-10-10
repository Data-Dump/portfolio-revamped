/**
 * src/hooks/useLenis.js
 * ──────────────────────────────────────────────
 * Initialises Lenis smooth scroll once on mount.
 * Exposes the Lenis instance via a ref so other
 * components can call lenis.scrollTo() etc.
 * ──────────────────────────────────────────────
 */
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useLenis() {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Honour prefers-reduced-motion — disable smooth scroll
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const lenis = new Lenis({
      duration:    prefersReduced ? 0 : 1.2,
      easing:      (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReduced,
    })

    lenisRef.current = lenis

    // Wire Lenis into GSAP's ScrollTrigger so scrub animations sync
    lenis.on('scroll', ScrollTrigger.update)

    // RAF loop
    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return lenisRef
}
