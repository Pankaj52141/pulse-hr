'use client'

import { ChevronDown } from 'lucide-react'
import { useFilters } from '@/lib/contexts'
import { departments } from '@/lib/data'
import { DateRangePicker } from '@/components/ui/DateRangePicker'
import type { ReactNode } from 'react'

type PageHeadingProps = {
  eyebrow: string
  title: string
  description: string
  pill?: string
  showControls?: boolean
  children?: ReactNode
}

export function PageHeading({ eyebrow, title, description, pill, showControls = true, children }: PageHeadingProps) {
  const { department, setDepartment } = useFilters()

  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow">
          {eyebrow}
          {pill && <span className="demo-pill">{pill}</span>}
        </div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {showControls && (
        <div className="heading-controls">
          <select
            value={department}
            onChange={e => setDepartment(e.target.value)}
            aria-label="Filter by department"
          >
            {departments.map(x => (
              <option key={x}>{x}</option>
            ))}
          </select>
          <DateRangePicker />
        </div>
      )}
      {children}
    </div>
  )
}
