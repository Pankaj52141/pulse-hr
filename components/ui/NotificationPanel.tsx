'use client'

import { useState, useRef, useEffect } from 'react'
import { Bell, Check, CheckCheck } from 'lucide-react'
import { useNotifications } from '@/lib/contexts'

export function NotificationPanel() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <div className="notification-wrapper" ref={panelRef}>
      <button
        className="bell"
        onClick={() => setOpen(o => !o)}
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
        aria-expanded={open}
      >
        <Bell />
        {unreadCount > 0 && <i className="bell-badge">{unreadCount}</i>}
      </button>

      {open && (
        <div className="notification-panel" role="menu" aria-label="Notifications">
          <div className="notification-panel-header">
            <strong>Notifications</strong>
            {unreadCount > 0 && (
              <button className="mark-all-read" onClick={markAllAsRead}>
                <CheckCheck /> Mark all read
              </button>
            )}
          </div>
          <div className="notification-list">
            {notifications.map(n => (
              <div
                key={n.id}
                className={`notification-item ${n.read ? '' : 'unread'}`}
                role="menuitem"
                onClick={() => { markAsRead(n.id) }}
              >
                <span className="notification-emoji">{n.icon}</span>
                <div className="notification-content">
                  <strong>{n.title}</strong>
                  <p>{n.description}</p>
                  <small>{n.time}</small>
                </div>
                {!n.read && (
                  <span className="unread-dot" aria-label="Unread" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
