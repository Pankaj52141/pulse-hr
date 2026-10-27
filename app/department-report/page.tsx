'use client'

import { Download, FileText, Printer } from 'lucide-react'
import { useComputedMetrics } from '@/lib/hooks'
import { useToast } from '@/lib/contexts'
import type { Employee } from '@/lib/types'
import { Methodology } from '@/components/dashboard/Methodology'
import { FilterBar } from '@/components/dashboard/FilterBar'
import { EmptyState } from '@/components/ui/EmptyState'

export default function DepartmentReportPage() {
  const { filtered, departmentData } = useComputedMetrics()
  const { addToast } = useToast()

  function exportCsv() {
    const rows = [
      ['Department', 'Employees', 'Engagement', 'Satisfaction', 'Attrition rate'],
      ...departmentData.map(d => {
        const group = filtered.filter(e => e.department === d.name)
        const sat = group.length
          ? Math.round(group.reduce((a, e) => a + e.satisfaction, 0) / group.length)
          : 0
        const attr = group.length
          ? Math.round((group.filter(e => e.attrition).length / group.length) * 100)
          : 0
        return [d.name, group.length, d.score, sat, attr]
      }),
    ]
    const blob = new Blob([rows.map(row => row.join(',')).join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'peoplepulse-department-report.csv'
    link.click()
    URL.revokeObjectURL(url)
    addToast('Department report exported successfully', 'success')
  }

  function printReport() {
    addToast('Opening print dialog for PDF export...', 'info')
    window.print()
  }

  if (filtered.length === 0) {
    return (
      <>
        <div className="report-head">
          <div>
            <div className="eyebrow">Department report</div>
            <h2>Compare the shape of each team.</h2>
            <p>Export a filtered aggregate summary for your next people review.</p>
          </div>
        </div>
        <FilterBar />
        <EmptyState />
      </>
    )
  }

  return (
    <>
      <div className="report-head">
        <div>
          <div className="eyebrow">Department report</div>
          <h2>Compare the shape of each team.</h2>
          <p>Export a filtered aggregate summary for your next people review.</p>
        </div>
        <div className="report-actions">
          <button className="secondary-button" onClick={printReport} aria-label="Print or save department report as PDF">
            <Printer aria-hidden="true" /> Print / PDF
          </button>
          <button className="export-button" onClick={exportCsv} aria-label="Export department report as CSV">
            <Download aria-hidden="true" /> Export CSV
          </button>
        </div>
      </div>
      <FilterBar />

      <div className="report-table" role="table" aria-label="Department comparison">
        <div className="report-row report-header" role="row">
          <span role="columnheader">Department</span>
          <span role="columnheader">Employees</span>
          <span role="columnheader">Engagement</span>
          <span role="columnheader">Satisfaction</span>
          <span role="columnheader">Attrition</span>
        </div>
        {departmentData.map(d => {
          const group = filtered.filter((e: Employee) => e.department === d.name)
          const sat = group.length
            ? Math.round(group.reduce((a: number, e: Employee) => a + e.satisfaction, 0) / group.length)
            : 0
          const attr = group.length
            ? Math.round((group.filter((e: Employee) => e.attrition).length / group.length) * 100)
            : 0
          return (
            <div className="report-row" key={d.name} role="row">
              <span role="cell">
                <i className="table-dot" />
                {d.name}
              </span>
              <span role="cell">{group.length}</span>
              <span role="cell">
                <b>{d.score}</b>/100
              </span>
              <span role="cell">
                <b>{sat}</b>/100
              </span>
              <span role="cell" className={attr > 8 ? 'red-text' : ''}>
                {attr}%
              </span>
            </div>
          )
        })}
      </div>

      <div className="participation">
        <FileText aria-hidden="true" />
        <div>
          <strong>Survey participation is healthy at 89%</strong>
          <p>Participation is shown at group level to protect employee privacy. Minimum reporting group size: 5.</p>
        </div>
      </div>

      <Methodology />
    </>
  )
}
