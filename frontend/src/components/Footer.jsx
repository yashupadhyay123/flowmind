import { Sparkles } from 'lucide-react'

const columns = [
  { title: 'Product', links: ['Features', 'Pricing', 'Changelog'] },
  { title: 'Company', links: ['About', 'Blog', 'Careers'] },
  { title: 'Support', links: ['Help Center', 'Contact', 'Privacy'] },
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-4">
        <div>
          <a href="#" className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <Sparkles className="h-6 w-6 text-indigo-600" />
            FlowMind
          </a>
          <p className="mt-3 text-sm text-slate-500">
            Less busywork. More flow.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold text-slate-900">{col.title}</h4>
            <ul className="mt-4 space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-slate-500 hover:text-slate-900">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
        © 2026 FlowMind. All rights reserved.
      </div>
    </footer>
  )
}
