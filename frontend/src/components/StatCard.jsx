export default function StatCard({ icon: Icon, label, value, change }) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
            <Icon className="h-5 w-5 text-indigo-600" />
          </div>
        </div>
        <p className="mt-4 text-3xl font-bold text-slate-900">{value}</p>
        <p className="mt-1 text-sm text-teal-600">{change}</p>
      </div>
    )
  }
  