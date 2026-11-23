import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'For individuals getting started.',
    features: [
      '10 AI analyses per month',
      'Basic task board',
      'Weekly productivity chart',
      '1 project',
    ],
    button: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$12',
    description: 'For people who want to do more.',
    features: [
      'Unlimited AI analyses',
      'Advanced task board',
      'Monthly analytics',
      'Unlimited projects',
    ],
    button: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Team',
    price: '$29',
    description: 'For small teams working together.',
    features: [
      'Everything in Pro',
      'Up to 10 members',
      'Shared projects',
      'Priority support',
    ],
    button: 'Contact Sales',
    popular: false,
  },
]

function PricingCard({ name, price, description, features, button, popular }) {
  return (
    <div
      className={`relative flex flex-col rounded-xl bg-white p-8 shadow-sm ${
        popular
          ? 'border-2 border-indigo-600 shadow-lg md:-mt-4 md:mb-4'
          : 'border border-slate-200'
      }`}
    >
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
          Most popular
        </span>
      )}

      <h3 className="text-xl font-semibold text-slate-900">{name}</h3>
      <p className="mt-2 text-sm text-slate-500">{description}</p>

      <p className="mt-6">
        <span className="text-4xl font-bold text-slate-900">{price}</span>
        <span className="text-slate-500"> / month</span>
      </p>

      <ul className="mt-6 flex-1 space-y-3">
        {features.map((item) => (
          <li key={item} className="flex items-start gap-2 text-slate-600">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-teal-500" />
            {item}
          </li>
        ))}
      </ul>

      <a
        href="#"
        className={`mt-8 rounded-lg px-4 py-3 text-center font-semibold ${
          popular
            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
            : 'border border-slate-300 text-slate-700 hover:bg-slate-100'
        }`}
      >
        {button}
      </a>
    </div>
  )
}

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
          Simple, honest pricing
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
          Start free. Upgrade when you're ready.
        </p>
      </div>

      <div className="mt-12 grid items-stretch gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <PricingCard key={plan.name} {...plan} />
        ))}
      </div>
    </section>
  )
}