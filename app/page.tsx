'use client'

import {
  BarChart, Bar, CartesianGrid, Cell, Legend, LineChart, Line, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'
import { Activity, Sparkles, TrendingDown, Users } from 'lucide-react'
import { useComputedMetrics } from '@/lib/hooks'
import { monthly, chartColors } from '@/lib/data'
import { StatCard } from '@/components/dashboard/StatCard'
import { ChartCard } from '@/components/dashboard/ChartCard'
import { Methodology } from '@/components/dashboard/Methodology'
import { InsightStrip } from '@/components/dashboard/InsightStrip'
import { FilterBar } from '@/components/dashboard/FilterBar'
import { PageHeading } from '@/components/dashboard/PageHeading'
import { EmptyState } from '@/components/ui/EmptyState'

export default function OverviewPage() {
  const { filtered, avgEngagement, avgSatisfaction, attrition, departmentData, tenureData, donut } =
    useComputedMetrics()

  if (filtered.length === 0) {
    return (
      <>
        <PageHeading
          eyebrow="People analytics"
          title="Know your people. Grow your culture."
          description="Clear signals for better employee experiences — never employee-level decisions."
          pill="Synthetic demo"
        />
        <FilterBar />
        <EmptyState />
      </>
    )
  }

  return (
    <>
      <PageHeading
        eyebrow="People analytics"
        title="Know your people. Grow your culture."
        description="Clear signals for better employee experiences — never employee-level decisions."
        pill="Synthetic demo"
      />
      <FilterBar />

      <div className="stats-grid">
        <StatCard label="Total employees" value={filtered.length.toString()} delta="4.8%" icon={Users} tone="blue" />
        <StatCard label="Avg. engagement" value={`${avgEngagement}/100`} delta="6.2%" icon={Activity} tone="green" />
        <StatCard label="Employee satisfaction" value={`${avgSatisfaction}/100`} delta="3.1%" icon={Sparkles} tone="amber" />
        <StatCard label="Attrition rate" value={`${attrition}%`} delta="1.4%" icon={TrendingDown} tone="red" />
      </div>

      <div className="chart-grid">
        <ChartCard title="Engagement trend" caption="Monthly average score · May–Oct 2026" className="wide">
          <ResponsiveContainer width="100%" height={255}>
            <LineChart data={monthly}>
              <CartesianGrid stroke="var(--chart-grid)" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} />
              <YAxis domain={[60, 100]} axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} />
              <Tooltip contentStyle={{ background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 8 }} />
              <Line type="monotone" dataKey="score" stroke="var(--blue)" strokeWidth={3} dot={{ fill: 'var(--blue)', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Employees by department" caption="Distribution of active employees">
          <ResponsiveContainer width="100%" height={255}>
            <PieChart>
              <Pie data={donut} dataKey="value" nameKey="name" innerRadius={72} outerRadius={94} paddingAngle={3}>
                {donut.map((_, i) => (
                  <Cell key={i} fill={chartColors[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 8 }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Engagement by department" caption="Average engagement score">
          <ResponsiveContainer width="100%" height={225}>
            <BarChart data={departmentData} layout="vertical">
              <CartesianGrid stroke="var(--chart-grid)" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis dataKey="name" type="category" width={82} axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 8 }} />
              <Bar dataKey="score" fill="#7e8ce0" radius={[0, 6, 6, 0]} barSize={22} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Attrition by tenure" caption="Exploratory group comparison">
          <ResponsiveContainer width="100%" height={225}>
            <BarChart data={tenureData}>
              <CartesianGrid stroke="var(--chart-grid)" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 11 }} />
              <YAxis unit="%" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 8 }} />
              <Bar dataKey="rate" fill="#efaa61" radius={[6, 6, 0, 0]} barSize={34} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <InsightStrip
        title="Three signals worth exploring"
        description="Recognition scores trail manager support by 15 points, while employees under one year show the highest exploratory attrition rate. Consider a 30-day listening loop for new hires."
      />

      <Methodology />
    </>
  )
}
