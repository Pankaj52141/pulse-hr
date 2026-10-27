'use client'

import { Sparkles } from 'lucide-react'

type InsightStripProps = {
  title: string
  description: string
  note?: string
}

export function InsightStrip({ title, description, note = 'Observational only' }: InsightStripProps) {
  return (
    <div className="insight-strip" role="status" aria-label="Insight">
      <div className="insight-mark">
        <Sparkles aria-hidden="true" />
      </div>
      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
      <span className="insight-note">{note}</span>
    </div>
  )
}
