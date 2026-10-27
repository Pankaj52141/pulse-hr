'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertCircle, RotateCcw, Home } from 'lucide-react'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Unhandled app error:', error)
  }, [error])

  return (
    <div className="error-container" role="alert">
      <div className="error-card">
        <div className="error-icon">
          <AlertCircle aria-hidden="true" />
        </div>
        <h2>Something went wrong</h2>
        <p>
          An unexpected error occurred while rendering this view. Your local preferences have been preserved.
        </p>
        {error.message && (
          <div className="error-details">
            <code>{error.message}</code>
          </div>
        )}
        <div className="error-actions">
          <button className="primary-action-btn" onClick={() => reset()}>
            <RotateCcw aria-hidden="true" /> Try again
          </button>
          <Link href="/" className="secondary-action-btn">
            <Home aria-hidden="true" /> Return to Overview
          </Link>
        </div>
      </div>
    </div>
  )
}
