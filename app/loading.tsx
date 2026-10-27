export default function Loading() {
  return (
    <div className="loading-container" aria-busy="true" aria-label="Loading workspace data...">
      {/* Header skeleton */}
      <div className="skeleton-header">
        <div className="skeleton-line skeleton-eyebrow" />
        <div className="skeleton-line skeleton-title" />
        <div className="skeleton-line skeleton-desc" />
      </div>

      {/* Filter bar skeleton */}
      <div className="skeleton-filter-bar">
        <div className="skeleton-pill" />
        <div className="skeleton-pill" />
        <div className="skeleton-pill" />
      </div>

      {/* Stats cards grid skeleton */}
      <div className="stats-grid">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="stat-card skeleton-card">
            <div className="skeleton-icon" />
            <div className="skeleton-line skeleton-stat-label" />
            <div className="skeleton-line skeleton-stat-value" />
            <div className="skeleton-line skeleton-stat-delta" />
          </div>
        ))}
      </div>

      {/* Chart grid skeleton */}
      <div className="chart-grid">
        <div className="chart-card skeleton-card wide">
          <div className="skeleton-line skeleton-chart-title" />
          <div className="skeleton-line skeleton-chart-caption" />
          <div className="skeleton-chart-body" />
        </div>
        <div className="chart-card skeleton-card">
          <div className="skeleton-line skeleton-chart-title" />
          <div className="skeleton-line skeleton-chart-caption" />
          <div className="skeleton-donut-body" />
        </div>
      </div>
    </div>
  )
}
