/**
 * src/main.jsx
 * ──────────────────────────────────────────────
 * Vite entry point.
 * Registers GSAP globally, then mounts React.
 * ──────────────────────────────────────────────
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import './utils/gsap.js'  // register GSAP plugins before any component loads
import './index.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
