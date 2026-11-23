import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Sparkles, LayoutDashboard, Brain, ListChecks, BarChart3, Settings, Menu, X,
} from 'lucide-react'

const items = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Analyzer', to: '/analyzer', icon: Brain },
  { label: 'Tasks', to: '/tasks', icon: ListChecks },
  { label: 'Analytics', to: '/analytics', icon: BarChart3 },
  { label: 'Settings', to: '/settings', icon: Settings },
]

function Logo() {
  return (
    <NavLink to="/" className="flex items-center gap-2 text-xl font-bold text-slate-900">
      <Sparkles className="h-6 w-6 text-indigo-600" />
      FlowMind
    </NavLink>
  )
}

function NavItems({ onNavigate }) {
  return (
    <nav className="mt-8 space-y-1">
      {items.map(({ label, to, icon: Icon }) => (
        <NavLink
          key={label}
          to={to}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
              isActive
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
            }`
          }
        >
          <Icon className="h-5 w-5" />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

export default function Sidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white p-6 md:block">
        <Logo />
        <NavItems />
      </aside>

      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden">
        <Logo />
        <button onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu className="h-6 w-6 text-slate-700" />
        </button>
      </header>

      {/* Mobile slide-in menu */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-slate-900/40"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-64 bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <Logo />
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6 text-slate-700" />
              </button>
            </div>
            <NavItems onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}
    </>
  )
}