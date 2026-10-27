'use client'

import { LineChart, Line, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { AlertTriangle, TrendingDown, Users } from 'lucide-react'
import { useComputedMetrics } from '@/lib/hooks'
import { monthly } from '@/lib/data'
import type { Employee, TenureRate } from '@/lib/types'
import { StatCard } from '@/components/dashboard/StatCard'
import { ChartCard } from '@/components/dashboard/ChartCard'
import { Methodology } from '@/components/dashboard/Methodology'
import { FilterBar } from '@/components/dashboard/FilterBar'
import { EmptyState } from '@/components/ui/EmptyState'

export default function AttritionPage() {
  const { filtered, attrition, tenureData } = useComputedMetrics()

  if (filtered.length === 0) {
    return (
      <>
        <FilterBar />
        <EmptyState />
      </>
    )
  }

  const retainedData = monthly.map((x, i) => ({ ...x, retained: 91 + i }))
  const sortedTenure = [...tenureData].sort((a, b) => b.rate - a.rate)

  return (
    <>
      <FilterBar />

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <StatCard label="Current attrition" value={`${attrition}%`} delta="1.4%" icon={TrendingDown} tone="red" />
        <StatCard
          label="Retained employees"
          value={`${filtered.length - filtered.filter((e: Employee) => e.attrition).length}`}
          delta="2.8%"
          icon={Users}
          tone="green"
        />
        <StatCard
          label="Highest group rate"
          value={`${Math.max(...tenureData.map(x => x.rate))}%`}
          delta="Exploratory"
          icon={AlertTriangle}
          tone="amber"
        />
      </div>

      <div className="chart-grid">
        <ChartCard title="Retention trend" caption="Monthly retained employee index" className="wide">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={retainedData}>
              <CartesianGrid stroke="var(--chart-grid)" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} />
              <YAxis domain={[85, 100]} axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} />
              <Tooltip contentStyle={{ background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 8 }} />
              <Line type="monotone" dataKey="retained" stroke="var(--green)" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Risk exploration" caption="Aggregate groups with elevated attrition">
          <div className="risk-list">
            {sortedTenure.map((x: TenureRate) => (
              <div className="risk-row" key={x.name}>
                <span className={x.rate > 8 ? 'risk-dot high' : 'risk-dot'} />
                <div>
                  <strong>{x.name}</strong>
                  <small>Tenure group · {x.rate}% attrition</small>
                </div>
                <span className="risk-tag">Explore</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="callout">
        <AlertTriangle aria-hidden="true" />
        <div>
          <strong>Correlation is not causation</strong>
          <p>
            These comparisons are exploratory and based on synthetic aggregate data. They should not be used to label,
            rank, or make decisions about any individual employee.
          </p>
        </div>
      </div>

      <Methodology />
    </>
  )
}
