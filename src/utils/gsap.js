/**
 * src/utils/gsap.js
 * ──────────────────────────────────────────────
 * Central GSAP registration.
 * Import this once at the app root so all plugins
 * are available without re-registering.
 * ──────────────────────────────────────────────
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
