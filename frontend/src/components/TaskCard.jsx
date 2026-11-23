import { ArrowLeft, ArrowRight, Trash2 } from 'lucide-react'

const priorityStyles = {
  Low: 'bg-slate-100 text-slate-600',
  Medium: 'bg-amber-100 text-amber-700',
  High: 'bg-red-100 text-red-700',
}

export default function TaskCard({ task, onMove, onDelete, canLeft, canRight }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <p className="font-medium text-slate-900">{task.title}</p>
        <button
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
          className="text-slate-400 hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${priorityStyles[task.priority]}`}
        >
          {task.priority}
        </span>

        <div className="flex gap-1">
          <button
            onClick={() => onMove(task.id, -1)}
            disabled={!canLeft}
            aria-label="Move left"
            className="rounded p-1 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => onMove(task.id, 1)}
            disabled={!canRight}
            aria-label="Move right"
            className="rounded p-1 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}