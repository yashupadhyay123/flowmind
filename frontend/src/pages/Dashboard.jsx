import { useState, useEffect } from 'react'
import { CheckCircle2, Clock, Flame, Target, Sparkles } from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import Sidebar from '../components/Sidebar'
import StatCard from '../components/StatCard'
import FocusTimer from '../components/FocusTimer'
import { api } from '../lib/api'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState('')

  const loadStats = () =>
    api
      .getStats()
      .then(setStats)
      .catch(() => setError('Could not load stats. Is the backend running?'))

  useEffect(() => {
    loadStats()
    api.getTasks().then(setTasks).catch(() => {})
  }, [])

  const handleSave = async (minutes) => {
    await api.saveSession(minutes)
    loadStats()
  }

  const cards = stats
    ? [
        { icon: CheckCircle2, label: 'Tasks done', value: stats.tasks_done, change: 'All time' },
        { icon: Clock, label: 'Focus hours', value: `${stats.focus_hours}h`, change: 'All time' },
        { icon: Flame, label: 'Day streak', value: stats.streak, change: 'Days in a row' },
        { icon: Target, label: 'Productivity score', value: `${stats.score}%`, change: 'Done vs total tasks' },
      ]
    : []

  const todo = tasks.filter((t) => t.status !== 'Done').slice(0, 5)

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-6 pt-20 md:p-8">
        <h1 className="text-2xl font-bold text-slate-900">Good morning, Yash</h1>
        <p className="mt-1 text-slate-500">Here's how your week is going.</p>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}

        {/* Stat cards */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((c) => (
            <StatCard key={c.label} {...c} />
          ))}
        </div>

        {/* Chart + timer */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="font-semibold text-slate-900">Focus hours, last 7 days</h2>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats ? stats.weekly : []}>
                  <defs>
                    <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="day" stroke="#64748B" fontSize={12} />
                  <YAxis stroke="#64748B" fontSize={12} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="hours"
                    stroke="#4F46E5"
                    strokeWidth={2}
                    fill="url(#fill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <FocusTimer onSave={handleSave} />
        </div>

        {/* AI insight + tasks */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl bg-indigo-600 p-6 text-white shadow-sm">
            <div className="flex items-center gap-2 font-semibold">
              <Sparkles className="h-5 w-5" />
              AI insight
            </div>
            <p className="mt-4 text-indigo-100">
              Short, regular focus sessions build your streak. Try one 25-minute
              session today.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="font-semibold text-slate-900">Open tasks</h2>
            {todo.length === 0 ? (
              <p className="mt-4 text-slate-400">No open tasks. Add some on the Task Board.</p>
            ) : (
              <ul className="mt-4 divide-y divide-slate-100">
                {todo.map((t) => (
                  <li key={t.id} className="flex items-center gap-3 py-3">
                    <CheckCircle2 className="h-5 w-5 text-slate-300" />
                    <span className="text-slate-700">{t.title}</span>
                    <span className="ml-auto text-xs text-slate-400">{t.status}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}