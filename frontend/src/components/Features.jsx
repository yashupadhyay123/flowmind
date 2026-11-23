import { Sparkles, BarChart3, LayoutList } from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'Analyse',
    text: 'Paste notes or documents and get clear summaries, key points, and action items in seconds.',
  },
  {
    icon: BarChart3,
    title: 'Track',
    text: 'Log focus sessions and see simple charts of how your productivity changes each week.',
  },
  {
    icon: LayoutList,
    title: 'Manage',
    text: 'Organise work on a task board and plan your day without the clutter.',
  },
]

function FeatureCard({ icon: Icon, title, text }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50">
        <Icon className="h-6 w-6 text-indigo-600" />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-slate-500">{text}</p>
    </div>
  )
}

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
          Everything you need to stay in flow
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
          Three simple tools, one calm workspace.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {features.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </div>
    </section>
  )
}