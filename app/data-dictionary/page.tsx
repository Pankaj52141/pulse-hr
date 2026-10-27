'use client'

import { useState } from 'react'
import { BookOpen, Search, Database, BarChart3, Users, TrendingUp } from 'lucide-react'
import { dataDictionary } from '@/lib/data'

const categoryIcons: Record<string, typeof BookOpen> = {
  'Core Metrics': TrendingUp,
  'Survey Dimensions': BarChart3,
  'Demographic Dimensions': Users,
  'Derived Indicators': Database,
}

export default function DataDictionaryPage() {
  const [search, setSearch] = useState('')
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Core Metrics')

  const filtered = dataDictionary
    .map(cat => ({
      ...cat,
      metrics: cat.metrics.filter(
        m =>
          m.name.toLowerCase().includes(search.toLowerCase()) ||
          m.definition.toLowerCase().includes(search.toLowerCase()),
      ),
    }))
    .filter(cat => cat.metrics.length > 0)

  return (
    <>
      <div className="section-intro">
        <div>
          <div className="eyebrow">Reference</div>
          <h2>Data dictionary</h2>
          <p>Definitions, calculations, and data sources for every metric used in PeoplePulse.</p>
        </div>
      </div>

      <div className="dict-search">
        <Search aria-hidden="true" />
        <input
          type="text"
          placeholder="Search metrics..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search data dictionary"
        />
      </div>

      <div className="dict-content">
        {filtered.length === 0 ? (
          <div className="dict-empty">
            <BookOpen />
            <p>No metrics match &ldquo;{search}&rdquo;</p>
          </div>
        ) : (
          filtered.map(cat => {
            const Icon = categoryIcons[cat.category] || BookOpen
            const isExpanded = expandedCategory === cat.category

            return (
              <div key={cat.category} className="dict-category">
                <button
                  className={`dict-category-header ${isExpanded ? 'expanded' : ''}`}
                  onClick={() => setExpandedCategory(isExpanded ? null : cat.category)}
                  aria-expanded={isExpanded}
                >
                  <div className="dict-category-icon">
                    <Icon aria-hidden="true" />
                  </div>
                  <div>
                    <strong>{cat.category}</strong>
                    <span>{cat.metrics.length} metric{cat.metrics.length !== 1 ? 's' : ''}</span>
                  </div>
                  <svg
                    className={`dict-chevron ${isExpanded ? 'rotated' : ''}`}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>

                {isExpanded && (
                  <div className="dict-metrics">
                    {cat.metrics.map(metric => (
                      <div key={metric.name} className="dict-metric">
                        <div className="dict-metric-header">
                          <h3>{metric.name}</h3>
                        </div>
                        <p className="dict-metric-def">{metric.definition}</p>
                        <div className="dict-metric-details">
                          <div>
                            <span>Calculation</span>
                            <code>{metric.calculation}</code>
                          </div>
                          <div>
                            <span>Source</span>
                            <strong>{metric.source}</strong>
                          </div>
                          <div>
                            <span>Frequency</span>
                            <strong>{metric.frequency}</strong>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </>
  )
}
