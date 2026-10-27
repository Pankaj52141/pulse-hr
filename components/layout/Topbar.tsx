'use client'

import { usePathname } from 'next/navigation'
import { Menu, Search } from 'lucide-react'
import { useSearch } from '@/lib/contexts'
import { NotificationPanel } from '@/components/ui/NotificationPanel'
import { ProfileDropdown } from '@/components/ui/ProfileDropdown'

const pageNames: Record<string, string> = {
  '/': 'Overview',
  '/engagement': 'Engagement',
  '/attrition': 'Attrition',
  '/department-report': 'Department report',
  '/recommendations': 'Recommendations',
  '/data-dictionary': 'Data dictionary',
  '/settings': 'Settings',
}

type TopbarProps = {
  onMenuClick: () => void
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const pathname = usePathname()
  const { openSearch } = useSearch()
  const currentPage = pageNames[pathname] || 'PeoplePulse'

  return (
    <header className="topbar" role="banner">
      <button className="menu-button" onClick={onMenuClick} aria-label="Open navigation menu">
        <Menu />
      </button>

      <div className="crumb">
        PeoplePulse <span>/</span> {currentPage}
      </div>

      <div className="top-actions">
        <button className="global-search" onClick={openSearch} aria-label="Search (Ctrl+K)">
          <Search aria-hidden="true" />
          <span>Search insights...</span>
          <kbd>⌘K</kbd>
        </button>
        <NotificationPanel />
        <ProfileDropdown />
      </div>
    </header>
  )
}
