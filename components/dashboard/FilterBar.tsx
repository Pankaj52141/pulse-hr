'use client'

import { useFilters } from '@/lib/contexts'
import { departments, tenureBands, arrangements } from '@/lib/data'
import { useFilteredEmployees } from '@/lib/hooks'

export function FilterBar() {
  const { tenure, setTenure, arrangement, setArrangement } = useFilters()
  const filtered = useFilteredEmployees()

  return (
    <div className="filter-bar" role="toolbar" aria-label="Data filters">
      <span className="filter-title">Filters</span>
      <select
        value={tenure}
        onChange={e => setTenure(e.target.value)}
        aria-label="Filter by tenure band"
      >
        {tenureBands.map(x => (
          <option key={x}>{x}</option>
        ))}
      </select>
      <select
        value={arrangement}
        onChange={e => setArrangement(e.target.value)}
        aria-label="Filter by work arrangement"
      >
        {arrangements.map(x => (
          <option key={x}>{x}</option>
        ))}
      </select>
      <span className="filter-result">
        Showing <b>{filtered.length}</b> synthetic employees
      </span>
    </div>
  )
}
