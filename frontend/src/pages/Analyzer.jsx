import { useState } from 'react'
import { Sparkles, Loader2, ListChecks, Lightbulb } from 'lucide-react'
import Sidebar from '../components/Sidebar'

// Mock AI: replaced by a FastAPI call later
function mockAnalyze(text) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const clean = text.trim()
        const wordCount = clean.split(/\s+/).length
        const sentences = clean
          .split(/(?<=[.!?])\s+|\n+/)
          .map((s) => s.trim())
          .filter(Boolean)
  
        // Detect times and days in the text
        const times = clean.match(/\b\d{1,2}(:\d{2})?\s?(am|pm)\b/gi) || []
        const days =
          clean.match(
            /\b(today|tonight|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/gi
          ) || []
  
        // Sentences that sound like tasks
        const actionWords =
          /\b(need to|should|must|will|let's|remember|call|send|finish|buy|book|prepare|write|review|ride|go)\b/i
        const actionSentences = sentences.filter((s) => actionWords.test(s))
  
        // Summary: quote the start of the text
        const first = sentences[0] || clean
        const summary = `${first}${/[.!?]$/.test(first) ? '' : '.'} (${wordCount} words, ${sentences.length} ${
          sentences.length === 1 ? 'sentence' : 'sentences'
        })`
  
        // Key points
        const keyPoints = sentences.slice(0, 3)
        if (times.length) keyPoints.push(`Time mentioned: ${[...new Set(times)].join(', ')}`)
        if (days.length) keyPoints.push(`Day mentioned: ${[...new Set(days)].join(', ')}`)
  
        // Action items
        const actions = actionSentences.slice(0, 3)
        if (times.length) actions.push(`Set a reminder for ${times[0]}`)
        if (actions.length === 0) actions.push('Add this to your task board')
  
        resolve({ summary, keyPoints, actions })
      }, 1200)
    })
  }

export default function Analyzer() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleAnalyze = async () => {
    setLoading(true)
    setResult(null)
    const data = await mockAnalyze(text)
    setResult(data)
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
              <p className="mt-6 text-slate-400">
                Your analysis will appear here.
              </p>
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
                    {result.keyPoints.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                    <ListChecks className="h-4 w-4" /> Action items
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {result.actions.map((a) => (
                      <li key={a} className="flex items-center gap-2 text-slate-700">
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
      </main>
    </div>
  )
}

