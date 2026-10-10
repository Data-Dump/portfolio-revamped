/**
 * src/pages/Forbidden.jsx
 * ──────────────────────────────────────────────
 * 403 Forbidden page
 * ──────────────────────────────────────────────
 */
import ErrorPage from '../components/ErrorPage.jsx'

export default function Forbidden() {
  return (
    <ErrorPage
      code="403"
      title="Access Denied"
      message="You don't have permission to view this page."
    />
  )
}
