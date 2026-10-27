import type { Employee, MonthlyData, SurveyItem, AppNotification, SearchResult, DictionaryCategory } from './types'

export const departments = ['All departments', 'Engineering', 'Design', 'Marketing', 'Sales', 'People']
export const tenureBands = ['All tenure bands', '< 1 year', '1–3 years', '3–5 years', '5+ years']
export const arrangements = ['All arrangements', 'Hybrid', 'Remote', 'On-site']
export const chartColors = ['#4057c8', '#7e8ce0', '#efaa61', '#6d9d85', '#d56f72']
export const periods = ['Oct 2026', 'Sep 2026', 'Aug 2026', 'Q3 2026', 'Q2 2026', 'H1 2026', 'FY 2026']

export const employees: Employee[] = Array.from({ length: 120 }, (_, i) => {
  const department = ['Engineering', 'Design', 'Marketing', 'Sales', 'People'][i % 5]
  const level = ['Individual contributor', 'Manager', 'Senior leader'][i % 3]
  const tenure = ['< 1 year', '1–3 years', '3–5 years', '5+ years'][i % 4]
  const arrangement = ['Hybrid', 'Remote', 'On-site'][i % 3]
  const engagement = 62 + ((i * 7) % 31)
  const satisfaction = 64 + ((i * 11) % 29)
  return { id: i + 1, department, level, tenure, arrangement, engagement, satisfaction, attrition: (i * 13) % 17 === 0 }
})

export const monthly: MonthlyData[] = [
  { month: 'May', score: 74, response: 82 },
  { month: 'Jun', score: 76, response: 84 },
  { month: 'Jul', score: 75, response: 86 },
  { month: 'Aug', score: 79, response: 88 },
  { month: 'Sep', score: 81, response: 91 },
  { month: 'Oct', score: 83, response: 89 },
]

export const survey: SurveyItem[] = [
  { question: 'Manager support', score: 86 },
  { question: 'Recognition', score: 71 },
  { question: 'Work-life balance', score: 78 },
  { question: 'Career growth', score: 67 },
  { question: 'Workplace culture', score: 84 },
]

export const sampleNotifications: AppNotification[] = [
  { id: '1', title: 'Q3 survey results available', description: 'The latest engagement survey results are ready for review.', time: '2 hours ago', read: false, type: 'success', icon: '📊' },
  { id: '2', title: 'Attrition alert: Engineering', description: 'Engineering attrition rate has increased by 2.3% this month.', time: '5 hours ago', read: false, type: 'warning', icon: '⚠️' },
  { id: '3', title: 'Department report exported', description: 'Your CSV export for Marketing is ready for download.', time: '1 day ago', read: true, type: 'info', icon: '📁' },
  { id: '4', title: 'New hire onboarding milestone', description: '12 new hires have completed their 30-day check-in.', time: '2 days ago', read: true, type: 'success', icon: '🎉' },
  { id: '5', title: 'Survey reminder sent', description: 'Automated reminders sent to 15 pending survey respondents.', time: '3 days ago', read: true, type: 'info', icon: '📧' },
]

export const searchableItems: SearchResult[] = [
  { id: 'p1', title: 'Overview', category: 'page', description: 'Dashboard overview with key metrics', href: '/' },
  { id: 'p2', title: 'Engagement', category: 'page', description: 'Survey intelligence and score distribution', href: '/engagement' },
  { id: 'p3', title: 'Attrition', category: 'page', description: 'Retention trends and risk exploration', href: '/attrition' },
  { id: 'p4', title: 'Department Report', category: 'page', description: 'Compare teams and export data', href: '/department-report' },
  { id: 'p5', title: 'Recommendations', category: 'page', description: 'AI-powered decision support', href: '/recommendations' },
  { id: 'p6', title: 'Data Dictionary', category: 'page', description: 'Metric definitions and methodology', href: '/data-dictionary' },
  { id: 'p7', title: 'Settings', category: 'page', description: 'Preferences and configuration', href: '/settings' },
  { id: 'm1', title: 'Engagement Score', category: 'metric', description: 'Average engagement rating (0-100)', href: '/engagement' },
  { id: 'm2', title: 'Satisfaction Score', category: 'metric', description: 'Average satisfaction rating (0-100)', href: '/' },
  { id: 'm3', title: 'Attrition Rate', category: 'metric', description: 'Percentage of employees who have left', href: '/attrition' },
  { id: 'm4', title: 'Response Rate', category: 'metric', description: 'Survey participation percentage', href: '/engagement' },
  { id: 'd1', title: 'Engineering', category: 'department', description: 'Engineering department analytics', href: '/' },
  { id: 'd2', title: 'Design', category: 'department', description: 'Design department analytics', href: '/' },
  { id: 'd3', title: 'Marketing', category: 'department', description: 'Marketing department analytics', href: '/' },
  { id: 'd4', title: 'Sales', category: 'department', description: 'Sales department analytics', href: '/' },
  { id: 'd5', title: 'People', category: 'department', description: 'People department analytics', href: '/' },
]

export const dataDictionary: DictionaryCategory[] = [
  {
    category: 'Core Metrics',
    metrics: [
      { name: 'Total Employees', definition: 'Count of active employees matching current filter criteria.', calculation: 'COUNT(employees) WHERE status = active AND filters match', source: 'HRIS', frequency: 'Real-time' },
      { name: 'Average Engagement', definition: 'Mean engagement score across all filtered employees, measured on a 0–100 scale derived from pulse survey responses.', calculation: 'SUM(engagement_score) / COUNT(employees)', source: 'Pulse Survey', frequency: 'Monthly' },
      { name: 'Employee Satisfaction', definition: 'Mean satisfaction score across all filtered employees, measured on a 0–100 scale.', calculation: 'SUM(satisfaction_score) / COUNT(employees)', source: 'Pulse Survey', frequency: 'Monthly' },
      { name: 'Attrition Rate', definition: 'Percentage of employees who have separated from the organization within the reporting period.', calculation: '(Separations / Total headcount) × 100', source: 'HRIS', frequency: 'Monthly' },
    ],
  },
  {
    category: 'Survey Dimensions',
    metrics: [
      { name: 'Manager Support', definition: 'Favorability score measuring employee perception of direct manager effectiveness, coaching quality, and support.', calculation: 'Percentage of favorable responses (4–5 on 5-point Likert scale)', source: 'Engagement Survey', frequency: 'Quarterly' },
      { name: 'Recognition', definition: 'Favorability score measuring how valued and recognized employees feel for their contributions.', calculation: 'Percentage of favorable responses (4–5 on 5-point Likert scale)', source: 'Engagement Survey', frequency: 'Quarterly' },
      { name: 'Work-Life Balance', definition: 'Favorability score measuring employee perception of workload sustainability, schedule flexibility, and boundary respect.', calculation: 'Percentage of favorable responses (4–5 on 5-point Likert scale)', source: 'Engagement Survey', frequency: 'Quarterly' },
      { name: 'Career Growth', definition: 'Favorability score measuring perception of development opportunities, skill-building, and career advancement paths.', calculation: 'Percentage of favorable responses (4–5 on 5-point Likert scale)', source: 'Engagement Survey', frequency: 'Quarterly' },
      { name: 'Workplace Culture', definition: 'Favorability score measuring sense of belonging, psychological safety, inclusion, and cultural alignment.', calculation: 'Percentage of favorable responses (4–5 on 5-point Likert scale)', source: 'Engagement Survey', frequency: 'Quarterly' },
    ],
  },
  {
    category: 'Demographic Dimensions',
    metrics: [
      { name: 'Department', definition: 'Organizational unit the employee belongs to. Used as a primary segmentation axis.', calculation: 'Categorical grouping from org chart', source: 'HRIS', frequency: 'Real-time' },
      { name: 'Tenure Band', definition: 'Length of continuous employment grouped into bands: < 1 year, 1–3 years, 3–5 years, 5+ years.', calculation: 'DATEDIFF(TODAY, hire_date), bucketed into predefined ranges', source: 'HRIS', frequency: 'Real-time' },
      { name: 'Work Arrangement', definition: 'Employee work model classification: Hybrid (mix of office and remote), Remote (fully remote), or On-site (fully in-office).', calculation: 'Categorical from employee profile', source: 'HRIS', frequency: 'Real-time' },
      { name: 'Level', definition: 'Career level within the organization: Individual Contributor, Manager, or Senior Leader.', calculation: 'Categorical from job architecture mapping', source: 'HRIS', frequency: 'Real-time' },
    ],
  },
  {
    category: 'Derived Indicators',
    metrics: [
      { name: 'Response Rate', definition: 'Percentage of eligible employees who completed the most recent survey cycle.', calculation: '(Completed surveys / Eligible employees) × 100', source: 'Survey Platform', frequency: 'Per survey cycle' },
      { name: 'Retention Index', definition: 'Monthly index tracking the percentage of employees retained relative to the start-of-period headcount.', calculation: '((Start headcount - Separations) / Start headcount) × 100', source: 'HRIS', frequency: 'Monthly' },
      { name: 'Risk Group Flag', definition: 'Aggregate-level exploratory flag indicating tenure groups with attrition rates exceeding 8%. Not used for individual-level decisions.', calculation: 'IF group_attrition_rate > 8% THEN "Elevated" ELSE "Normal"', source: 'Computed', frequency: 'Monthly' },
    ],
  },
]
