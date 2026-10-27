'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles } from 'lucide-react'
import { useComputedMetrics } from '@/lib/hooks'
import { Methodology } from '@/components/dashboard/Methodology'

export default function RecommendationsPage() {
  const { avgEngagement, avgSatisfaction, attrition } = useComputedMetrics()
  const router = useRouter()
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const cards = [
    {
      title: 'Build a recognition rhythm',
      reason: 'Recognition favorability is 71%, 15 points below manager support.',
      action: 'Pilot peer recognition moments in the monthly team ritual.',
      tone: 'blue',
      supportingData: {
        metric: 'Recognition Score',
        current: 71,
        benchmark: 86,
        trend: 'Stable over last 3 quarters',
        recommendation: 'Introduce a lightweight peer recognition tool (e.g., shout-outs in team meetings). Track recognition score monthly to measure impact.',
      },
    },
    {
      title: 'Make career paths visible',
      reason: 'Career growth is the lowest survey dimension at 67%.',
      action: 'Create a simple role progression guide and quarterly growth conversations.',
      tone: 'amber',
      supportingData: {
        metric: 'Career Growth Score',
        current: 67,
        benchmark: 78,
        trend: 'Declined 3 points since Q1',
        recommendation: 'Publish role progression frameworks per department. Schedule quarterly 1:1 career conversations between managers and direct reports.',
      },
    },
    {
      title: 'Listen earlier in tenure',
      reason: `Attrition is elevated in the earliest tenure band; overall rate is ${attrition}%.`,
      action: 'Add a 30-day listening check-in and close the loop on themes.',
      tone: 'green',
      supportingData: {
        metric: 'Early Tenure Attrition',
        current: attrition,
        benchmark: 5,
        trend: 'Highest among all tenure bands',
        recommendation: 'Implement a structured 30-day check-in for new hires. Use themes from these conversations to improve onboarding. Review attrition by cohort monthly.',
      },
    },
  ]

  return (
    <>
      <div className="section-intro">
        <div>
          <div className="eyebrow">Decision support</div>
          <h2>Small experiments, grounded in signals.</h2>
          <p>Exploratory suggestions generated from the aggregate demo data shown in this workspace.</p>
        </div>
      </div>

      <div className="recommendation-grid">
        {cards.map(card => (
          <div className={`recommendation ${card.tone}`} key={card.title}>
            <div className="recommendation-icon">
              <Sparkles aria-hidden="true" />
            </div>
            <h3>{card.title}</h3>
            <div className="reason">
              <span>Signal</span>
              {card.reason}
            </div>
            <p>{card.action}</p>

            <button
              onClick={() => setExpandedCard(expandedCard === card.title ? null : card.title)}
              aria-expanded={expandedCard === card.title}
            >
              {expandedCard === card.title ? 'Hide supporting data ↑' : 'View supporting data →'}
            </button>

            {expandedCard === card.title && (
              <div className="supporting-data">
                <div className="supporting-data-row">
                  <span>Metric</span>
                  <strong>{card.supportingData.metric}</strong>
                </div>
                <div className="supporting-data-row">
                  <span>Current</span>
                  <strong>{card.supportingData.current}%</strong>
                </div>
                <div className="supporting-data-row">
                  <span>Benchmark</span>
                  <strong>{card.supportingData.benchmark}%</strong>
                </div>
                <div className="supporting-data-row">
                  <span>Trend</span>
                  <strong>{card.supportingData.trend}</strong>
                </div>
                <div className="supporting-data-detail">
                  <strong>Recommended action</strong>
                  <p>{card.supportingData.recommendation}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="callout">
        <Sparkles aria-hidden="true" />
        <div>
          <strong>Suggestions, not established facts</strong>
          <p>
            Recommendations are designed to prompt conversation and further investigation. They are not automated
            decisions about hiring, firing, promotion, or individual risk.
          </p>
        </div>
      </div>

      <Methodology />
    </>
  )
}
