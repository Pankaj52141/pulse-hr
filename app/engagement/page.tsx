'use client'

import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useComputedMetrics } from '@/lib/hooks'
import { survey } from '@/lib/data'
import type { Employee } from '@/lib/types'
import { ChartCard } from '@/components/dashboard/ChartCard'
import { Methodology } from '@/components/dashboard/Methodology'
import { FilterBar } from '@/components/dashboard/FilterBar'
import { EmptyState } from '@/components/ui/EmptyState'

export default function EngagementPage() {
  const { filtered, avgEngagement } = useComputedMetrics()

  if (filtered.length === 0) {
    return (
      <>
        <div className="section-intro">
          <div>
            <div className="eyebrow">Survey intelligence</div>
            <h2>What shapes the employee experience?</h2>
            <p>Survey scores describe sentiment and are not a measure of individual performance.</p>
          </div>
        </div>
        <FilterBar />
        <EmptyState />
      </>
    )
  }

  const distData = [
    { band: '0–59', count: filtered.filter((e: Employee) => e.engagement < 60).length },
    { band: '60–69', count: filtered.filter((e: Employee) => e.engagement < 70 && e.engagement >= 60).length },
    { band: '70–79', count: filtered.filter((e: Employee) => e.engagement < 80 && e.engagement >= 70).length },
    { band: '80–89', count: filtered.filter((e: Employee) => e.engagement < 90 && e.engagement >= 80).length },
    { band: '90–100', count: filtered.filter((e: Employee) => e.engagement >= 90).length },
  ]

  return (
    <>
      <div className="section-intro">
        <div>
          <div className="eyebrow">Survey intelligence</div>
          <h2>What shapes the employee experience?</h2>
          <p>Survey scores describe sentiment and are not a measure of individual performance.</p>
        </div>
        <div className="response-card">
          <strong>89%</strong>
          <span>
            response rate
            <br />
            {filtered.length * 2} responses
          </span>
        </div>
      </div>
      <FilterBar />

      <div className="chart-grid">
        <ChartCard title="Score distribution" caption="Employees by engagement band" className="wide">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={distData}>
              <CartesianGrid stroke="var(--chart-grid)" vertical={false} />
              <XAxis dataKey="band" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} />
              <Tooltip contentStyle={{ background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 8 }} />
              <Bar dataKey="count" fill="var(--blue)" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Survey question results" caption="Favorability score across all responses">
          <div className="question-list">
            {survey.map((item, i) => (
              <div className="question" key={item.question}>
                <div>
                  <span>{item.question}</span>
                  <b>{item.score}</b>
                </div>
                <div className="question-track" role="progressbar" aria-valuenow={item.score} aria-valuemin={0} aria-valuemax={100} aria-label={`${item.question}: ${item.score}%`}>
                  <i style={{ width: `${item.score}%` }} className={i === 3 ? 'warning' : ''} />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="breakdown-card">
        <h2>Breakdowns available</h2>
        <div className="breakdown-grid">
          {['Department', 'Tenure band', 'Work arrangement'].map((x, i) => (
            <div key={x}>
              <span>{x}</span>
              <strong>{i === 0 ? '5 groups' : i === 1 ? '4 groups' : '3 groups'}</strong>
              <small>Use filters above to compare</small>
            </div>
          ))}
        </div>
      </div>

      <Methodology />
    </>
  )
}
