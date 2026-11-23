import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote: 'FlowMind turned my messy meeting notes into clear action items in seconds.',
    name: 'Aisha Khan',
    role: 'Product Manager',
  },
  {
    quote: 'The focus tracking showed me when I actually do my best work. Game changer.',
    name: 'Rahul Mehta',
    role: 'Freelance Designer',
  },
  {
    quote: 'Our whole team finally manages tasks in one calm, simple place.',
    name: 'Sara Lopez',
    role: 'Startup Founder',
  },
]

function TestimonialCard({ quote, name, role }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <Quote className="h-6 w-6 text-indigo-600" />
      <p className="mt-4 flex-1 text-slate-600">{quote}</p>
      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-sm font-semibold text-indigo-600">
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{name}</p>
          <p className="text-sm text-slate-500">{role}</p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
          Loved by people who value focus
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
          See how FlowMind helps people get more done with less stress.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <TestimonialCard key={t.name} {...t} />
        ))}
      </div>
    </section>
  )
}