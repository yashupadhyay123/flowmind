import { useState, useEffect } from 'react'
import { Sparkles, Loader2, ListChecks, Lightbulb, History } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { api } from '../lib/api'

export default function Analyzer() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [past, setPast] = useState([])
  const [error, setError] = useState('')

  const loadHistory = () =>
    api.getAnalyses().then(setPast).catch(() => {})

  useEffect(() => {
    loadHistory()
  }, [])

  const handleAnalyze = async () => {
    setLoading(true)
    setResult(null)
    setError('')
    try {
      const data = await api.analyze(text)
      setResult({
        summary: data.summary,
        keyPoints: data.key_points,
        actions: data.actions,
      })
      loadHistory()
    } catch {
      setError('Analysis failed. Is the backend running?')
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-6 pt-20 md:p-8">
        <h1 className="text-2xl font-bold text-slate-900">AI Analyzer</h1>
        <p className="mt-1 text-slate-500">
          Paste your notes and get a summary, key points, and action items.
        </p>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Input panel */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <label className="font-semibold text-slate-900">Your text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste meeting notes, an article, or a to-do brain dump..."
              className="mt-3 h-72 w-full resize-none rounded-lg border border-slate-300 p-4 text-slate-900 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-slate-500">{text.length} characters</span>
              <button
                onClick={handleAnalyze}
                disabled={!text.trim() || loading}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                {loading ? 'Analysing...' : 'Analyse'}
              </button>
            </div>
          </div>

          {/* Results panel */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-slate-900">Results</h2>

            {!result && !loading && (
              <p className="mt-6 text-slate-400">Your analysis will appear here.</p>
            )}

            {loading && (
              <p className="mt-6 flex items-center gap-2 text-slate-500">
                <Loader2 className="h-4 w-4 animate-spin" /> Reading your text...
              </p>
            )}

            {result && (
              <div className="mt-4 space-y-6">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Summary
                  </h3>
                  <p className="mt-2 text-slate-700">{result.summary}</p>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                    <Lightbulb className="h-4 w-4" /> Key points
                  </h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
                    {result.keyPoints.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                    <ListChecks className="h-4 w-4" /> Action items
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {result.actions.map((a, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-700">
                        <input type="checkbox" className="h-4 w-4 accent-indigo-600" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* History panel */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-2 font-semibold text-slate-900">
            <History className="h-4 w-4" /> Recent analyses
          </h2>
          {past.length === 0 ? (
            <p className="mt-4 text-slate-400">Nothing yet.</p>
          ) : (
            <ul className="mt-4 divide-y divide-slate-100">
              {past.map((a) => (
                <li key={a.id}>
                  <button
                    onClick={() =>
                      setResult({
                        summary: a.summary,
                        keyPoints: a.key_points,
                        actions: a.actions,
                      })
                    }
                    className="w-full py-3 text-left hover:bg-slate-50"
                  >
                    <p className="truncate text-slate-700">{a.input_text}</p>
                    <p className="text-xs text-slate-400">
                      {new Date(a.created_at).toLocaleString()}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}