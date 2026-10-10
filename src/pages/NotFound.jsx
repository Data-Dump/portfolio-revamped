/**
 * src/pages/NotFound.jsx
 * ──────────────────────────────────────────────
 * 404 Error page
 * ──────────────────────────────────────────────
 */
import ErrorPage from '../components/ErrorPage.jsx'

export default function NotFound() {
  return (
    <ErrorPage
      code="404"
      title="Page Not Found"
      message="This frame doesn't exist."
    />
  )
}
