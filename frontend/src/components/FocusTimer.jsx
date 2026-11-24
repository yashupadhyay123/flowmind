import { useState, useEffect } from 'react'
import { Play, Pause, Square } from 'lucide-react'

const options = [1, 15, 25, 50]

export default function FocusTimer({ onSave }) {
  const [minutes, setMinutes] = useState(25)
  const [left, setLeft] = useState(25 * 60)
  const [running, setRunning] = useState(false)
  const [message, setMessage] = useState('')

  // Tick every second while running
  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setLeft((l) => l - 1), 1000)
    return () => clearInterval(id)
  }, [running])

  // Timer finished
  useEffect(() => {
    if (running && left <= 0) {
      setRunning(false)
      save(minutes)
      setLeft(minutes * 60)
    }
  }, [left, running])

  const save = async (mins) => {
    if (mins < 1) {
      setMessage('Focus for at least 1 minute to save a session.')
      return
    }
    try {
      await onSave(mins)
      setMessage(`Saved ${mins} min session`)
    } catch {
      setMessage('Could not save the session.')
    }
  }

  const choose = (m) => {
    setMinutes(m)
    setLeft(m * 60)
    setRunning(false)
    setMessage('')
  }

  const stop = () => {
    const elapsed = Math.floor((minutes * 60 - left) / 60)
    setRunning(false)
    setLeft(minutes * 60)
    save(elapsed)
  }

  const mm = String(Math.floor(left / 60)).padStart(2, '0')
  const ss = String(left % 60).padStart(2, '0')

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="font-semibold text-slate-900">Focus timer</h2>

      <div className="mt-4 flex gap-2">
        {options.map((m) => (
          <button
            key={m}
            onClick={() => choose(m)}
            disabled={running}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium disabled:opacity-50 ${
              minutes === m
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {m} min
          </button>
        ))}
      </div>

      <p className="mt-6 text-center text-5xl font-bold tabular-nums text-slate-900">
        {mm}:{ss}
      </p>

      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={() => setRunning(!running)}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700"
        >
          {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {running ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={stop}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 font-medium text-slate-700 hover:bg-slate-100"
        >
          <Square className="h-4 w-4" />
          Stop &amp; save
        </button>
      </div>

      {message && <p className="mt-4 text-center text-sm text-teal-600">{message}</p>}
    </div>
  )
}
