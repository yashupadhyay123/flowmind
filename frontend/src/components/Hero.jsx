export default function Hero() {
    return (
      <section className="mx-auto max-w-7xl px-6 py-16 text-center md:py-24">
        <span className="inline-flex rounded-full bg-indigo-50 px-4 py-1 text-sm font-medium text-indigo-600">
        <svg width="15" height="20" viewBox="0 0 15 13  " fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.1499 0.899994L7.60824 4.69166L11.3999 6.14999L7.60824 7.60833L6.1499 11.4L4.69157 7.60833L0.899902 6.14999L4.69157 4.69166L6.1499 0.899994Z" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" stroke="#4F46E5"/>
</svg>
 Less busywork. More flow.
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
            className="flex w-full rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100 sm:w-auto"
          ><svg width="18" height="18" viewBox="6 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.75 3.75L14.25 9L6.75 14.25V3.75Z" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" stroke="#0F172A"/>
          </svg>
          
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
  