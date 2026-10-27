'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Activity,
  BarChart3,
  BookOpen,
  ChevronRight,
  LayoutDashboard,
  Settings2,
  Sparkles,
  TrendingDown,
  X,
} from 'lucide-react'

const navItems = [
  { label: 'Overview', href: '/', icon: LayoutDashboard },
  { label: 'Engagement', href: '/engagement', icon: Activity },
  { label: 'Attrition', href: '/attrition', icon: TrendingDown },
  { label: 'Department report', href: '/department-report', icon: BarChart3 },
  { label: 'Recommendations', href: '/recommendations', icon: Sparkles },
]

const resourceItems = [
  { label: 'Data dictionary', href: '/data-dictionary', icon: BookOpen },
  { label: 'Settings', href: '/settings', icon: Settings2 },
]

type SidebarProps = {
  mobileOpen: boolean
  onClose: () => void
}

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {mobileOpen && <div className="sidebar-backdrop" onClick={onClose} aria-hidden="true" />}
      <aside className={mobileOpen ? 'sidebar sidebar-open' : 'sidebar'} role="navigation" aria-label="Main navigation">
        <div className="brand">
          <span className="brand-icon">
            <Sparkles aria-hidden="true" />
          </span>
          <span>
            <strong>PeoplePulse</strong>
            <small>HR intelligence</small>
          </span>
          <button className="close-nav" onClick={onClose} aria-label="Close navigation">
            <X />
          </button>
        </div>

        <div className="demo-label">
          DEMO DATA <span>•</span> FY 2026
        </div>

        <nav>
          <p className="nav-label">Workspace</p>
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={pathname === href ? 'nav-link active' : 'nav-link'}
              onClick={onClose}
            >
              <Icon aria-hidden="true" />
              {label}
            </Link>
          ))}

          <p className="nav-label second">Resources</p>
          {resourceItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={pathname === href ? 'nav-link active' : 'nav-link'}
              onClick={onClose}
            >
              <Icon aria-hidden="true" />
              {label}
            </Link>
          ))}
        </nav>

        <Link
          href="/settings"
          className="sidebar-profile"
          onClick={onClose}
          aria-label="User settings: Riley Morgan"
        >
          <div className="profile-avatar">RM</div>
          <div>
            <strong>Riley Morgan</strong>
            <small>People ops admin</small>
          </div>
          <ChevronRight aria-hidden="true" />
        </Link>
      </aside>
    </>
  )
}
