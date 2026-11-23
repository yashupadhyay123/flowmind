import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
      <h1 className="text-3xl font-bold text-slate-900">Dashboard coming soon</h1>
      <Link to="/" className="mt-4 text-indigo-600 hover:underline">
        Back to home
      </Link>
    </div>
  )
}