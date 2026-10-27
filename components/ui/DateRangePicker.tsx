'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Calendar } from 'lucide-react'
import { useFilters } from '@/lib/contexts'
import { periods } from '@/lib/data'

export function DateRangePicker() {
  const { period, setPeriod } = useFilters()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <div className="date-picker-wrapper" ref={ref}>
      <button
        className="period-button"
        onClick={() => setOpen(o => !o)}
        aria-label="Select reporting period"
        aria-expanded={open}
      >
        <Calendar className="period-icon" aria-hidden="true" />
        {period}
        <ChevronDown aria-hidden="true" />
      </button>

      {open && (
        <div className="date-picker-dropdown" role="listbox" aria-label="Reporting periods">
          {periods.map(p => (
            <button
              key={p}
              className={`date-picker-option ${p === period ? 'active' : ''}`}
              role="option"
              aria-selected={p === period}
              onClick={() => {
                setPeriod(p)
                setOpen(false)
              }}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
