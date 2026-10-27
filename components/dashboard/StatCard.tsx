'use client'

import { TrendingUp } from 'lucide-react'
import type { ElementType } from 'react'

type StatCardProps = {
  label: string
  value: string
  delta: string
  icon: ElementType
  tone: string
}

export function StatCard({ label, value, delta, icon: Icon, tone }: StatCardProps) {
  return (
    <div className="stat-card" role="region" aria-label={label}>
      <div className={`stat-icon ${tone}`}>
        <Icon aria-hidden="true" />
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-delta">
        <TrendingUp aria-hidden="true" /> {delta} <span>vs previous period</span>
      </div>
    </div>
  )
}
