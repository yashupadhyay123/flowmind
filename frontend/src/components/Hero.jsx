export default function Hero() {
    return (
      <section className="mx-auto max-w-7xl px-6 py-16 text-center md:py-24">
        <span className="inline-block rounded-full bg-indigo-50 px-4 py-1 text-sm font-medium text-indigo-600">
          AI-powered productivity
        </span>
  
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
          Work smarter with <span className="text-indigo-600">AI</span>
        </h1>
  
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-500">
          Analyse your notes, track your focus, and manage your tasks, all in one calm, simple workspace.
        </p>
  
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#"
            className="w-full rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-indigo-700 sm:w-auto"
          >
            Get Started Free
          </a>
          <a
            href="#"
            className="w-full rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100 sm:w-auto"
          >
            Watch Demo
          </a>
        </div>
  
        {/* Dashboard preview placeholder */}
        <div className="mt-16 flex h-64 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 shadow-lg md:h-96">
          Dashboard preview goes here
        </div>
      </section>
    )
  }
  