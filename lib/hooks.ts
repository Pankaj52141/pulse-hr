'use client'

import { useMemo } from 'react'
import { useFilters } from './contexts'
import { employees, departments, tenureBands } from './data'
import type { Employee, DepartmentScore, TenureRate, DonutSlice } from './types'

/** Returns the employee list filtered by the current global filter state. */
export function useFilteredEmployees(): Employee[] {
  const { department, tenure, arrangement } = useFilters()

  return useMemo(
    () =>
      employees.filter(
        e =>
          (department === 'All departments' || e.department === department) &&
          (tenure === 'All tenure bands' || e.tenure === tenure) &&
          (arrangement === 'All arrangements' || e.arrangement === arrangement),
      ),
    [department, tenure, arrangement],
  )
}

/** Returns all computed metrics derived from the filtered employee list. */
export function useComputedMetrics() {
  const filtered = useFilteredEmployees()

  return useMemo(() => {
    const count = filtered.length
    const avgEngagement = count ? Math.round(filtered.reduce((a, e) => a + e.engagement, 0) / count) : 0
    const avgSatisfaction = count ? Math.round(filtered.reduce((a, e) => a + e.satisfaction, 0) / count) : 0
    const attrition = count ? Math.round((filtered.filter(e => e.attrition).length / count) * 100) : 0

    const departmentData: DepartmentScore[] = departments.slice(1).map(name => {
      const group = filtered.filter(e => e.department === name)
      return { name, score: group.length ? Math.round(group.reduce((a, e) => a + e.engagement, 0) / group.length) : 0 }
    })

    const tenureData: TenureRate[] = tenureBands.slice(1).map(name => {
      const group = filtered.filter(e => e.tenure === name)
      return { name, rate: group.length ? Math.round((group.filter(e => e.attrition).length / group.length) * 100) : 0 }
    })

    const donut: DonutSlice[] = departments.slice(1).map(name => ({
      name,
      value: filtered.filter(e => e.department === name).length,
    }))

    return { filtered, avgEngagement, avgSatisfaction, attrition, departmentData, tenureData, donut }
  }, [filtered])
}
