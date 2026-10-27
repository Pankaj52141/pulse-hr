'use client'

import { Search } from 'lucide-react'

type EmptyStateProps = {
  title?: string
  description?: string
}

export function EmptyState({
  title = 'No data to display',
  description = 'Try adjusting your filters to see results.',
}: EmptyStateProps) {
  return (
    <div className="empty-state" role="status">
      <div className="empty-state-icon">
        <Search aria-hidden="true" />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}
