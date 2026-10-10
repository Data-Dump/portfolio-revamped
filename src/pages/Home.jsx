/**
 * src/pages/Home.jsx
 * ──────────────────────────────────────────────
 * Main single-page portfolio.
 * ──────────────────────────────────────────────
 */
import { useLenis }      from '../hooks/useLenis.js'
import Navbar            from '../components/Navbar.jsx'
import Hero              from '../components/Hero.jsx'
import DividerCard       from '../components/DividerCard.jsx'
import VerticalGrid      from '../components/VerticalGrid.jsx'
import About             from '../components/About.jsx'
import Services          from '../components/Services.jsx'
import Contact           from '../components/Contact.jsx'
import Preloader         from '../components/Preloader.jsx'
import CustomCursor      from '../components/CustomCursor.jsx'
import { useState, useEffect } from 'react'

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  /* Lenis smooth scroll — initialised once, runs for app lifetime */
  useLenis()
  
  /* Make sure the page has a proper title and resets any error-page state */
  useEffect(() => {
    document.title = 'Kaushal Malvi — Video Editor & Motion Designer'
  }, [])

  return (
    <div id="home">
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      {/* Fixed glassmorphic navbar — hidden until 80px scroll */}
      <Navbar />

      {/* ── 1. Hero ── */}
      <Hero ready={loaded} />

      {/* ── 4. Divider: Recent Work ── */}
      <DividerCard
        id="work"
        topLeft="Portfolio 2026"
        topRight="Short-form Content"
        line1="Recent"
        line2="Work"
      />

      {/* ── 5. 6-card vertical video grid ── */}
      <VerticalGrid />

      {/* ── 6. About ── */}
      <About />

      {/* ── 7. Services ── */}
      <Services />

      {/* ── 8. Contact + Footer ── */}
      <Contact />
    </div>
  )
}
