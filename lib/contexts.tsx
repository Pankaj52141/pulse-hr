'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { ToastItem, AppNotification } from './types'
import { sampleNotifications } from './data'

/* ─── Filter Context ─── */
type FilterContextType = {
  department: string
  setDepartment: (v: string) => void
  tenure: string
  setTenure: (v: string) => void
  arrangement: string
  setArrangement: (v: string) => void
  period: string
  setPeriod: (v: string) => void
}

const FilterContext = createContext<FilterContextType | null>(null)

export function useFilters() {
  const ctx = useContext(FilterContext)
  if (!ctx) throw new Error('useFilters must be used within Providers')
  return ctx
}

/* ─── Theme Context ─── */
type ThemeContextType = {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within Providers')
  return ctx
}

/* ─── Toast Context ─── */
type ToastContextType = {
  toasts: ToastItem[]
  addToast: (message: string, type?: ToastItem['type']) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within Providers')
  return ctx
}

/* ─── Notification Context ─── */
type NotificationContextType = {
  notifications: AppNotification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
}

const NotificationContext = createContext<NotificationContextType | null>(null)

export function useNotifications() {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error('useNotifications must be used within Providers')
  return ctx
}

/* ─── Search Modal Context ─── */
type SearchContextType = {
  isSearchOpen: boolean
  openSearch: () => void
  closeSearch: () => void
}

const SearchContext = createContext<SearchContextType | null>(null)

export function useSearch() {
  const ctx = useContext(SearchContext)
  if (!ctx) throw new Error('useSearch must be used within Providers')
  return ctx
}

/* ─── Combined Provider ─── */
export function Providers({ children }: { children: ReactNode }) {
  // ── Filters ──
  const [department, setDepartment] = useState('All departments')
  const [tenure, setTenure] = useState('All tenure bands')
  const [arrangement, setArrangement] = useState('All arrangements')
  const [period, setPeriod] = useState('Oct 2026')

  // ── Theme ──
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('peoplepulse-theme') as 'light' | 'dark' | null
    if (saved) {
      setTheme(saved)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('peoplepulse-theme', theme)
    }
  }, [theme, mounted])

  const toggleTheme = useCallback(() => setTheme(t => (t === 'light' ? 'dark' : 'light')), [])

  // ── Toasts ──
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const addToast = useCallback((message: string, type: ToastItem['type'] = 'success') => {
    const id = Date.now().toString()
    setToasts(t => [...t, { id, message, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4000)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(t => t.filter(x => x.id !== id))
  }, [])

  // ── Notifications ──
  const [notifications, setNotifications] = useState<AppNotification[]>(sampleNotifications)
  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = useCallback((id: string) => {
    setNotifications(ns => ns.map(n => (n.id === id ? { ...n, read: true } : n)))
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications(ns => ns.map(n => ({ ...n, read: true })))
  }, [])

  // ── Search ──
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const openSearch = useCallback(() => setIsSearchOpen(true), [])
  const closeSearch = useCallback(() => setIsSearchOpen(false), [])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <FilterContext.Provider value={{ department, setDepartment, tenure, setTenure, arrangement, setArrangement, period, setPeriod }}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
          <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead }}>
            <SearchContext.Provider value={{ isSearchOpen, openSearch, closeSearch }}>
              {children}
            </SearchContext.Provider>
          </NotificationContext.Provider>
        </ToastContext.Provider>
      </ThemeContext.Provider>
    </FilterContext.Provider>
  )
}
