export type Employee = {
  id: number
  department: string
  level: string
  tenure: string
  arrangement: string
  engagement: number
  satisfaction: number
  attrition: boolean
}

export type MonthlyData = {
  month: string
  score: number
  response: number
}

export type SurveyItem = {
  question: string
  score: number
}

export type DepartmentScore = {
  name: string
  score: number
}

export type TenureRate = {
  name: string
  rate: number
}

export type DonutSlice = {
  name: string
  value: number
}

export type AppNotification = {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  type: 'info' | 'warning' | 'success'
  icon: string
}

export type SearchResult = {
  id: string
  title: string
  category: 'page' | 'metric' | 'department'
  description: string
  href: string
}

export type ToastItem = {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

export type MetricDefinition = {
  name: string
  definition: string
  calculation: string
  source: string
  frequency: string
}

export type DictionaryCategory = {
  category: string
  metrics: MetricDefinition[]
}
