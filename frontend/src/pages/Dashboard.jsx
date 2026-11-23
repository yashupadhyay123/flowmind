import { CheckCircle2, Clock, Flame, Target, Sparkles } from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import Sidebar from '../components/Sidebar'
import StatCard from '../components/StatCard'

const stats = [
  { icon: CheckCircle2, label: 'Tasks done', value: '24', change: '+12% this week' },
  { icon: Clock, label: 'Focus hours', value: '18.5h', change: '+3.2h this week' },
  { icon: Flame, label: 'Day streak', value: '7', change: 'Personal best' },
  { icon: Target, label: 'Productivity score', value: '86%', change: '+5% this week' },
]

const weekly = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 3.8 },
  { day: 'Wed', hours: 2.1 },
  { day: 'Thu', hours: 4.2 },
  { day: 'Fri', hours: 3.5 },
  { day: 'Sat', hours: 1.2 },
  { day: 'Sun', hours: 1.0 },
]

const tasks = [
  { title: 'Review project proposal', done: true },
  { title: 'Write weekly report', done: true },
  { title: 'Prepare design handoff', done: false },
  { title: 'Reply to client emails', done: false },
]

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8">
        <h1 className="text-2xl font-bold text-slate-900">Good morning, Yash</h1>
        <p className="mt-1 text-slate-500">Here's how your week is going.</p>

        {/* Stat cards */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* Chart + AI insight */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="font-semibold text-slate-900">Focus hours this week</h2>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weekly}>
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

          <div className="rounded-xl bg-indigo-600 p-6 text-white shadow-sm">
            <div className="flex items-center gap-2 font-semibold">
              <Sparkles className="h-5 w-5" />
              AI insight
            </div>
            <p className="mt-4 text-indigo-100">
              You focus best between 9 and 11 AM. Try scheduling your hardest task
              in that window tomorrow.
            </p>
            <button className="mt-6 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50">
              Plan my day
            </button>
          </div>
        </div>

        {/* Today's tasks */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900">Today's tasks</h2>
          <ul className="mt-4 divide-y divide-slate-100">
            {tasks.map((t) => (
              <li key={t.title} className="flex items-center gap-3 py-3">
                <CheckCircle2
                  className={`h-5 w-5 ${t.done ? 'text-teal-500' : 'text-slate-300'}`}
                />
                <span className={t.done ? 'text-slate-400 line-through' : 'text-slate-700'}>
                  {t.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}