import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, Check } from 'lucide-react'
import Sidebar from '../components/Sidebar'

function Toggle({ enabled, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        enabled ? 'bg-indigo-600' : 'bg-slate-300'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          enabled ? 'translate-x-5' : ''
        }`}
      />
    </button>
  )
}

export default function Settings() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState({
    name: 'Yash Upadhyay',
    email: 'yash@example.com',
    role: 'Frontend Developer',
  })
  const [prefs, setPrefs] = useState({
    dailySummary: true,
    focusReminders: true,
    weeklyReport: false,
  })
  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
    setSaved(false)
  }

  const togglePref = (key) => {
    setPrefs({ ...prefs, [key]: !prefs[key] })
    setSaved(false)
  }

  const handleSave = (e) => {
    e.preventDefault()
    // Mock save: the real API comes later
    setSaved(true)
  }

  const inputClass =
    'mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-100'

  const prefItems = [
    { key: 'dailySummary', label: 'Daily AI summary', text: 'Get a short summary of your day each evening.' },
    { key: 'focusReminders', label: 'Focus reminders', text: 'Be reminded when it is time for a focus session.' },
    { key: 'weeklyReport', label: 'Weekly report', text: 'Receive your productivity report every Monday.' },
  ]

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="mt-1 text-slate-500">Manage your profile and preferences.</p>

        <form onSubmit={handleSave} className="mt-8 max-w-2xl space-y-6">
          {/* Profile */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-slate-900">Profile</h2>

            <div className="mt-4 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-xl font-semibold text-indigo-600">
                {profile.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <p className="text-sm text-slate-500">Your initials are used as your avatar.</p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">Name</label>
                <input name="name" value={profile.name} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Role</label>
                <input name="role" value={profile.role} onChange={handleChange} className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-slate-700">Email</label>
                <input type="email" name="email" value={profile.email} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-slate-900">Preferences</h2>
            <ul className="mt-4 divide-y divide-slate-100">
              {prefItems.map((item) => (
                <li key={item.key} className="flex items-center justify-between gap-4 py-4">
                  <div>
                    <p className="font-medium text-slate-900">{item.label}</p>
                    <p className="text-sm text-slate-500">{item.text}</p>
                  </div>
                  <Toggle enabled={prefs[item.key]} onChange={() => togglePref(item.key)} />
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-6 py-2.5 font-semibold text-white hover:bg-indigo-700"
            >
              Save changes
            </button>
            {saved && (
              <span className="inline-flex items-center gap-1 text-sm font-medium text-teal-600">
                <Check className="h-4 w-4" /> Saved
              </span>
            )}
            <button
              type="button"
              onClick={() => navigate('/')}
              className="ml-auto inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 font-medium text-slate-700 hover:bg-slate-100"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}



