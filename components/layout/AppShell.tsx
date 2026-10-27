'use client'

import { useState, type ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { SearchModal } from '@/components/ui/SearchModal'
import { ToastContainer } from '@/components/ui/ToastContainer'

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [mobileNav, setMobileNav] = useState(false)

  return (
    <div className="app-shell">
      <Sidebar mobileOpen={mobileNav} onClose={() => setMobileNav(false)} />

      <main className="main">
        <Topbar onMenuClick={() => setMobileNav(true)} />
        <div className="content">
          {children}
        </div>
      </main>

      <SearchModal />
      <ToastContainer />
    </div>
  )
}
