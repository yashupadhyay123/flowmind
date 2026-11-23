import { NavLink } from 'react-router-dom'
import { Sparkles, LayoutDashboard, Brain, ListChecks, BarChart3, Settings } from 'lucide-react'

const items = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Analyzer', to: '/analyzer', icon: Brain },
  { label: 'Tasks', to: '/tasks', icon: ListChecks },
  { label: 'Analytics', to: '/analytics', icon: BarChart3 },
  { label: 'Settings', to: '/settings', icon: Settings },
]

export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white p-6 md:block">
      <NavLink to="/" className="flex items-center gap-2 text-xl font-bold text-slate-900">
        <Sparkles className="h-6 w-6 text-indigo-600" />
        FlowMind
      </NavLink>

      <nav className="mt-8 space-y-1">
        {items.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={label}
            to={to}
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
    </aside>
  )
}

