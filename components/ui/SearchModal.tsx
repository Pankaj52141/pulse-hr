'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ArrowRight, FileText, BarChart3, Building2, X } from 'lucide-react'
import { useSearch, useFilters } from '@/lib/contexts'
import { searchableItems } from '@/lib/data'

const categoryIcons = {
  page: FileText,
  metric: BarChart3,
  department: Building2,
}

const categoryLabels = {
  page: 'Pages',
  metric: 'Metrics',
  department: 'Departments',
}

export function SearchModal() {
  const { isSearchOpen, closeSearch } = useSearch()
  const { setDepartment } = useFilters()
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (isSearchOpen) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isSearchOpen])

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isSearchOpen])

  if (!isSearchOpen) return null

  const filtered = query.trim()
    ? searchableItems.filter(
        item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()),
      )
    : searchableItems

  const grouped = (['page', 'metric', 'department'] as const).map(cat => ({
    category: cat,
    items: filtered.filter(item => item.category === cat),
  })).filter(g => g.items.length > 0)

  function handleSelect(item: (typeof searchableItems)[0]) {
    if (item.category === 'department') {
      setDepartment(item.title)
    }
    router.push(item.href)
    closeSearch()
  }

  return (
    <div className="search-overlay" onClick={closeSearch} role="dialog" aria-modal="true" aria-label="Search">
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-modal-header">
          <Search aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search pages, metrics, departments..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Escape') closeSearch()
              if (e.key === 'Enter' && grouped.length > 0 && grouped[0].items.length > 0) {
                handleSelect(grouped[0].items[0])
              }
            }}
            aria-label="Search input"
          />
          <kbd>ESC</kbd>
          <button className="search-close" onClick={closeSearch} aria-label="Close search">
            <X />
          </button>
        </div>
        <div className="search-modal-body">
          {grouped.length === 0 ? (
            <div className="search-empty">
              <p>No results for &ldquo;{query}&rdquo;</p>
              <small>Try a different search term</small>
            </div>
          ) : (
            grouped.map(group => {
              const Icon = categoryIcons[group.category]
              return (
                <div key={group.category} className="search-group">
                  <div className="search-group-label">{categoryLabels[group.category]}</div>
                  {group.items.map(item => (
                    <button
                      key={item.id}
                      className="search-result"
                      onClick={() => handleSelect(item)}
                    >
                      <Icon className="search-result-icon" aria-hidden="true" />
                      <div className="search-result-text">
                        <strong>{item.title}</strong>
                        <span>{item.description}</span>
                      </div>
                      <ArrowRight className="search-result-arrow" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              )
            })
          )}
        </div>
        <div className="search-modal-footer">
          <span><kbd>↵</kbd> to select</span>
          <span><kbd>ESC</kbd> to close</span>
          <span><kbd>⌘K</kbd> to toggle</span>
        </div>
      </div>
    </div>
  )
}
