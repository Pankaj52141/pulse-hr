'use client'

import type { ReactNode } from 'react'

type ChartCardProps = {
  title: string
  caption: string
  children: ReactNode
  className?: string
}

export function ChartCard({ title, caption, children, className = '' }: ChartCardProps) {
  return (
    <section className={`chart-card ${className}`} role="region" aria-label={title}>
      <div className="card-heading">
        <div>
          <h2>{title}</h2>
          <p>{caption}</p>
        </div>
      </div>
      {children}
    </section>
  )
}
