/**
 * src/App.jsx
 * ──────────────────────────────────────────────
 * Application router configuration.
 * ──────────────────────────────────────────────
 */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import Forbidden from './pages/Forbidden.jsx'
import CustomCursor from './components/CustomCursor.jsx'

export default function App() {
  return (
    <BrowserRouter>
      {/* Global custom cursor */}
      <CustomCursor />
      
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* App-level Redirects */}
        <Route path="/main" element={<Navigate to="/" replace />} />
        <Route path="/photography" element={<Navigate to="/" replace />} />
        <Route path="/photography/*" element={<Navigate to="/" replace />} />
        
        {/* Error Pages */}
        <Route path="/403" element={<Forbidden />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
