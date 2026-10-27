'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, Moon, Sun, Settings2, LogOut, ShieldCheck, User } from 'lucide-react'
import { useTheme, useToast } from '@/lib/contexts'

export function ProfileDropdown() {
  const { theme, toggleTheme } = useTheme()
  const { addToast } = useToast()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <div className="profile-dropdown-wrapper" ref={dropdownRef}>
      <button
        className="top-avatar"
        onClick={() => setOpen(o => !o)}
        aria-label="User menu: Riley Morgan"
        aria-expanded={open}
      >
        RM
      </button>

      {open && (
        <div className="profile-dropdown" role="menu" aria-label="User menu">
          <div className="profile-dropdown-header">
            <div className="profile-dropdown-avatar">RM</div>
            <div className="profile-dropdown-user">
              <strong>Riley Morgan</strong>
              <small>People ops admin</small>
              <span className="role-tag">Workspace Admin</span>
            </div>
          </div>
          <div className="profile-dropdown-divider" />
          <button
            className="profile-dropdown-item"
            role="menuitem"
            onClick={() => {
              toggleTheme()
              addToast(`Switched to ${theme === 'light' ? 'dark' : 'light'} mode`, 'info')
            }}
          >
            {theme === 'light' ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
            <span>{theme === 'light' ? 'Dark mode' : 'Light mode'}</span>
          </button>
          <button
            className="profile-dropdown-item"
            role="menuitem"
            onClick={() => {
              router.push('/settings')
              setOpen(false)
            }}
          >
            <Settings2 aria-hidden="true" />
            <span>Workspace Settings</span>
          </button>
          <div className="profile-dropdown-divider" />
          <button
            className="profile-dropdown-item logout"
            role="menuitem"
            onClick={() => {
              addToast('Signed out of demo session', 'info')
              setOpen(false)
            }}
          >
            <LogOut aria-hidden="true" />
            <span>Sign out</span>
          </button>
        </div>
      )}
    </div>
  )
}
