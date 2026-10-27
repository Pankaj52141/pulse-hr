import Link from 'next/link'
import { LayoutDashboard, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-card">
        <span className="not-found-code">404</span>
        <h2>Page not found</h2>
        <p>
          The analytics view or resource you are looking for doesn&apos;t exist or has moved.
        </p>
        <div className="not-found-actions">
          <Link href="/" className="primary-action-btn">
            <LayoutDashboard aria-hidden="true" /> Go to Overview
          </Link>
          <Link href="/data-dictionary" className="secondary-action-btn">
            <Search aria-hidden="true" /> Explore Data Dictionary
          </Link>
        </div>
      </div>
    </div>
  )
}
