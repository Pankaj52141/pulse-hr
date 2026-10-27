'use client'

import { useState } from 'react'
import { Moon, Sun, Bell, BellOff, Shield, Lock, Info, Monitor, Smartphone, Eye, EyeOff } from 'lucide-react'
import { useTheme, useToast } from '@/lib/contexts'

type Section = 'general' | 'notifications' | 'privacy' | 'about'

const sections: { id: Section; label: string; icon: typeof Moon }[] = [
  { id: 'general', label: 'General', icon: Monitor },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'privacy', label: 'Privacy', icon: Shield },
  { id: 'about', label: 'About', icon: Info },
]

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme()
  const { addToast } = useToast()
  const [activeSection, setActiveSection] = useState<Section>('general')
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [weeklyDigest, setWeeklyDigest] = useState(true)
  const [attritionAlerts, setAttritionAlerts] = useState(true)
  const [surveyReminders, setSurveyReminders] = useState(false)
  const [anonymizeData, setAnonymizeData] = useState(true)
  const [minGroupSize, setMinGroupSize] = useState(5)
  const [compactMode, setCompactMode] = useState(false)

  function saveSettings() {
    addToast('Settings saved successfully', 'success')
  }

  return (
    <>
      <div className="section-intro">
        <div>
          <div className="eyebrow">Configuration</div>
          <h2>Settings</h2>
          <p>Customize your PeoplePulse workspace preferences.</p>
        </div>
      </div>

      <div className="settings-layout">
        <nav className="settings-nav" aria-label="Settings sections">
          {sections.map(s => (
            <button
              key={s.id}
              className={`settings-nav-item ${activeSection === s.id ? 'active' : ''}`}
              onClick={() => setActiveSection(s.id)}
            >
              <s.icon aria-hidden="true" />
              {s.label}
            </button>
          ))}
        </nav>

        <div className="settings-content">
          {activeSection === 'general' && (
            <div className="settings-section">
              <h3>Appearance</h3>
              <div className="settings-group">
                <div className="settings-row">
                  <div className="settings-row-info">
                    <strong>Theme</strong>
                    <span>Choose light or dark mode for the interface.</span>
                  </div>
                  <button className="theme-toggle-button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
                    {theme === 'light' ? <Sun /> : <Moon />}
                    {theme === 'light' ? 'Light' : 'Dark'}
                  </button>
                </div>
                <div className="settings-row">
                  <div className="settings-row-info">
                    <strong>Compact mode</strong>
                    <span>Reduce spacing and card sizes for denser information display.</span>
                  </div>
                  <label className="toggle" aria-label="Compact mode">
                    <input type="checkbox" checked={compactMode} onChange={e => setCompactMode(e.target.checked)} />
                    <span className="toggle-slider" />
                  </label>
                </div>
              </div>

              <h3>Display</h3>
              <div className="settings-group">
                <div className="settings-row">
                  <div className="settings-row-info">
                    <strong>Default department</strong>
                    <span>Set the default department filter when loading the dashboard.</span>
                  </div>
                  <select defaultValue="All departments" aria-label="Default department">
                    <option>All departments</option>
                    <option>Engineering</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Sales</option>
                    <option>People</option>
                  </select>
                </div>
              </div>

              <button className="settings-save" onClick={saveSettings}>
                Save changes
              </button>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="settings-section">
              <h3>Email notifications</h3>
              <div className="settings-group">
                <div className="settings-row">
                  <div className="settings-row-info">
                    <strong>Email alerts</strong>
                    <span>Receive important updates and alerts via email.</span>
                  </div>
                  <label className="toggle" aria-label="Email alerts">
                    <input type="checkbox" checked={emailAlerts} onChange={e => setEmailAlerts(e.target.checked)} />
                    <span className="toggle-slider" />
                  </label>
                </div>
                <div className="settings-row">
                  <div className="settings-row-info">
                    <strong>Weekly digest</strong>
                    <span>Get a summary of key metrics and changes every Monday.</span>
                  </div>
                  <label className="toggle" aria-label="Weekly digest">
                    <input type="checkbox" checked={weeklyDigest} onChange={e => setWeeklyDigest(e.target.checked)} />
                    <span className="toggle-slider" />
                  </label>
                </div>
              </div>

              <h3>In-app alerts</h3>
              <div className="settings-group">
                <div className="settings-row">
                  <div className="settings-row-info">
                    <strong>Attrition threshold alerts</strong>
                    <span>Notify when any group exceeds 8% attrition rate.</span>
                  </div>
                  <label className="toggle" aria-label="Attrition alerts">
                    <input type="checkbox" checked={attritionAlerts} onChange={e => setAttritionAlerts(e.target.checked)} />
                    <span className="toggle-slider" />
                  </label>
                </div>
                <div className="settings-row">
                  <div className="settings-row-info">
                    <strong>Survey reminders</strong>
                    <span>Get reminders when survey response rates are below target.</span>
                  </div>
                  <label className="toggle" aria-label="Survey reminders">
                    <input type="checkbox" checked={surveyReminders} onChange={e => setSurveyReminders(e.target.checked)} />
                    <span className="toggle-slider" />
                  </label>
                </div>
              </div>

              <button className="settings-save" onClick={saveSettings}>
                Save changes
              </button>
            </div>
          )}

          {activeSection === 'privacy' && (
            <div className="settings-section">
              <h3>Data protection</h3>
              <div className="settings-group">
                <div className="settings-row">
                  <div className="settings-row-info">
                    <strong>Anonymize small groups</strong>
                    <span>Suppress data for groups below the minimum reporting size to protect identity.</span>
                  </div>
                  <label className="toggle" aria-label="Anonymize small groups">
                    <input type="checkbox" checked={anonymizeData} onChange={e => setAnonymizeData(e.target.checked)} />
                    <span className="toggle-slider" />
                  </label>
                </div>
                <div className="settings-row">
                  <div className="settings-row-info">
                    <strong>Minimum group size</strong>
                    <span>The smallest group size that will display individual metrics.</span>
                  </div>
                  <select
                    value={minGroupSize}
                    onChange={e => setMinGroupSize(Number(e.target.value))}
                    aria-label="Minimum group size"
                  >
                    <option value={3}>3 employees</option>
                    <option value={5}>5 employees</option>
                    <option value={10}>10 employees</option>
                    <option value={15}>15 employees</option>
                  </select>
                </div>
              </div>

              <div className="settings-info-card">
                <Lock aria-hidden="true" />
                <div>
                  <strong>Privacy by design</strong>
                  <p>
                    PeoplePulse never displays individual employee scores or responses.
                    All data is aggregated and anonymized. Protected characteristics
                    are never used in any analysis or recommendation.
                  </p>
                </div>
              </div>

              <button className="settings-save" onClick={saveSettings}>
                Save changes
              </button>
            </div>
          )}

          {activeSection === 'about' && (
            <div className="settings-section">
              <h3>About PeoplePulse</h3>
              <div className="settings-group">
                <div className="settings-row">
                  <div className="settings-row-info">
                    <strong>Version</strong>
                    <span>Current application version.</span>
                  </div>
                  <span className="settings-value">1.0.0</span>
                </div>
                <div className="settings-row">
                  <div className="settings-row-info">
                    <strong>Environment</strong>
                    <span>Current deployment environment.</span>
                  </div>
                  <span className="settings-value demo-pill">Demo</span>
                </div>
                <div className="settings-row">
                  <div className="settings-row-info">
                    <strong>Last data refresh</strong>
                    <span>When the synthetic dataset was last generated.</span>
                  </div>
                  <span className="settings-value">Oct 28, 2026</span>
                </div>
                <div className="settings-row">
                  <div className="settings-row-info">
                    <strong>Data mode</strong>
                    <span>All data shown is synthetic and fictional.</span>
                  </div>
                  <span className="settings-value demo-pill">Synthetic</span>
                </div>
              </div>

              <div className="settings-info-card">
                <Info aria-hidden="true" />
                <div>
                  <strong>Open source</strong>
                  <p>
                    PeoplePulse is designed to demonstrate responsible people analytics.
                    Metrics describe group-level trends and are never used for individual
                    employee decisions.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
