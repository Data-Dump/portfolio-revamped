/**
 * src/components/FilmGrain.jsx
 * ──────────────────────────────────────────────
 * Reusable film-dust and scratch overlay.
 * Renders an animated SVG filter canvas that
 * simulates analogue film grain on dark sections.
 *
 * Usage: wrap any dark section or place absolutely
 *        inside it, then pointer-events: none.
 * ──────────────────────────────────────────────
 */
import { useEffect, useRef } from 'react'

/**
 * @param {{ opacity?: number, className?: string }} props
 */
export default function FilmGrain({ opacity = 0.12, className = '' }) {
  const canvasRef = useRef(null)
  const rafRef    = useRef(null)

  useEffect(() => {
    // Honour reduced-motion — skip grain animation
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas  = canvasRef.current
    if (!canvas) return
    const ctx     = canvas.getContext('2d')
    let   w = 0, h = 0

    const resize = () => {
      w = canvas.width  = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Draw one frame of random grain + occasional scratch lines
    const draw = () => {
      const imageData = ctx.createImageData(w, h)
      const data      = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() > 0.98
          ? 255                   // bright dust speck
          : Math.random() * 30    // subtle noise field
        data[i]     = v
        data[i + 1] = v
        data[i + 2] = v
        data[i + 3] = Math.random() * 60  // alpha varies
      }
      ctx.putImageData(imageData, 0, 0)

      // Occasional thin scratch line (~2% chance per frame)
      if (Math.random() < 0.02) {
        ctx.save()
        ctx.strokeStyle = `rgba(255,255,255,${Math.random() * 0.3})`
        ctx.lineWidth   = Math.random() < 0.5 ? 0.5 : 1
        const x = Math.random() * w
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x + (Math.random() - 0.5) * 20, h)
        ctx.stroke()
        ctx.restore()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
      style={{ opacity, mixBlendMode: 'screen', zIndex: 2 }}
    />
  )
}
