'use client'

import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { useToast } from '@/lib/contexts'

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
}

export function ToastContainer() {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="toast-container" aria-live="polite" aria-relevant="additions">
      {toasts.map(toast => {
        const Icon = icons[toast.type]
        return (
          <div key={toast.id} className={`toast toast-${toast.type}`} role="alert">
            <Icon className="toast-icon" aria-hidden="true" />
            <span className="toast-message">{toast.message}</span>
            <button
              className="toast-close"
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss notification"
            >
              <X />
            </button>
          </div>
        )
      })}
    </div>
  )
}
