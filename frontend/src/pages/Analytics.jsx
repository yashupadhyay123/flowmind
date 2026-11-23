import { useState } from 'react'
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import Sidebar from '../components/Sidebar'

const weeklyData = [
  { label: 'Mon', focus: 2.5, tasks: 4 },
  { label: 'Tue', focus: 3.8, tasks: 6 },
  { label: 'Wed', focus: 2.1, tasks: 3 },
  { label: 'Thu', focus: 4.2, tasks: 7 },
  { label: 'Fri', focus: 3.5, tasks: 5 },
  { label: 'Sat', focus: 1.2, tasks: 2 },
  { label: 'Sun', focus: 1.0, tasks: 1 },
]

const monthlyData = [
  { label: 'Week 1', focus: 14, tasks: 22 },
  { label: 'Week 2', focus: 18, tasks: 27 },
  { label: 'Week 3', focus: 16, tasks: 24 },
  { label: 'Week 4', focus: 21, tasks: 31 },
]

const taskStatus = [
  { name: 'Done', value: 24, color: '#14B8A6' },
  { name: 'In Progress', value: 8, color: '#4F46E5' },
  { name: 'To Do', value: 12, color: '#CBD5E1' },
]

export default function Analytics() {
  const [range, setRange] = useState('week')
  const data = range === 'week' ? weeklyData : monthlyData

  const totalFocus = data.reduce((sum, d) => sum + d.focus, 0).toFixed(1)
  const totalTasks = data.reduce((sum, d) => sum + d.tasks, 0)
  const best = data.reduce((a, b) => (b.focus > a.focus ? b : a))

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8">
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

        {/* Summary numbers */}
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <Summary label="Total focus hours" value={`${totalFocus}h`} />
          <Summary label="Tasks completed" value={totalTasks} />
          <Summary label="Best period" value={best.label} />
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
              <YAxis stroke="#64748B" fontSize={12} />
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
                <Pie data={taskStatus} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90}>
                  {taskStatus.map((s) => (
                    <Cell key={s.name} fill={s.color} />
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