import { useState, useEffect } from 'react'
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import Sidebar from '../components/Sidebar'
import { api } from '../lib/api'

const statusColors = {
  Done: '#14B8A6',
  'In Progress': '#4F46E5',
  'To Do': '#CBD5E1',
}

export default function Analytics() {
  const [range, setRange] = useState('week')
  const [data, setData] = useState([])
  const [status, setStatus] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    setError('')
    api
      .getAnalytics(range)
      .then((res) => {
        setData(res.data)
        setStatus(res.status)
      })
      .catch(() => setError('Could not load analytics. Is the backend running?'))
  }, [range])

  const totalFocus = data.reduce((sum, d) => sum + d.focus, 0).toFixed(1)
  const totalTasks = data.reduce((sum, d) => sum + d.tasks, 0)
  const best =
    data.length && Number(totalFocus) > 0
      ? data.reduce((a, b) => (b.focus > a.focus ? b : a)).label
      : '—'

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-6 pt-20 md:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
            <p className="mt-1 text-slate-500">See how your focus and tasks change over time.</p>
          </div>

          {/* Week / Month toggle */}
          <div className="inline-flex rounded-lg bg-slate-200 p-1">
            {['week', 'month'].map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`rounded-md px-4 py-1.5 text-sm font-medium capitalize ${
                  range === r ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}

        {/* Summary numbers */}
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <Summary label="Total focus hours" value={`${totalFocus}h`} />
          <Summary label="Tasks completed" value={totalTasks} />
          <Summary label="Best period" value={best} />
        </div>

        {/* Charts */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <ChartCard title="Focus hours">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="label" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip />
              <Bar dataKey="focus" fill="#4F46E5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ChartCard>

          <ChartCard title="Tasks completed">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="label" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="tasks" stroke="#14B8A6" strokeWidth={2} />
            </LineChart>
          </ChartCard>
        </div>

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900">Task status</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={status} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90}>
                  {status.map((s) => (
                    <Cell key={s.name} fill={statusColors[s.name]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  )
}

function Summary({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
    </div>
  )
}

function ChartCard({ title, children }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="font-semibold text-slate-900">{title}</h2>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  )
}