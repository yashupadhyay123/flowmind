import { useState } from 'react'
import { Plus } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import TaskCard from '../components/TaskCard'

const columns = ['To Do', 'In Progress', 'Done']

const initialTasks = [
  { id: 1, title: 'Design the settings page', status: 'To Do', priority: 'Medium' },
  { id: 2, title: 'Write weekly report', status: 'In Progress', priority: 'High' },
  { id: 3, title: 'Review project proposal', status: 'Done', priority: 'Low' },
]

export default function Tasks() {
  const [tasks, setTasks] = useState(initialTasks)
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('Medium')

  const addTask = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    setTasks([
      ...tasks,
      { id: Date.now(), title: title.trim(), status: 'To Do', priority },
    ])
    setTitle('')
  }

  const moveTask = (id, direction) => {
    setTasks(
      tasks.map((t) => {
        if (t.id !== id) return t
        const index = columns.indexOf(t.status) + direction
        return { ...t, status: columns[index] }
      })
    )
  }

  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id))

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-6 pt-20 md:p-8">
        <h1 className="text-2xl font-bold text-slate-900">Task Board</h1>
        <p className="mt-1 text-slate-500">Plan your work and move tasks as you go.</p>

        {/* Add task form */}
        <form onSubmit={addTask} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </form>

        {/* Columns */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {columns.map((col, colIndex) => {
            const colTasks = tasks.filter((t) => t.status === col)
            return (
              <div key={col} className="rounded-xl bg-slate-100 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-semibold text-slate-900">{col}</h2>
                  <span className="rounded-full bg-white px-2.5 py-0.5 text-sm text-slate-500">
                    {colTasks.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {colTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onMove={moveTask}
                      onDelete={deleteTask}
                      canLeft={colIndex > 0}
                      canRight={colIndex < columns.length - 1}
                    />
                  ))}
                  {colTasks.length === 0 && (
                    <p className="py-6 text-center text-sm text-slate-400">No tasks</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}