function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-xl">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 ring-1 ring-blue-500/20">
            <span className="text-lg font-black text-blue-400">
              R
            </span>
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight">
              Resume<span className="text-blue-500">AI</span>
            </h1>

            <p className="text-[10px] uppercase tracking-widest text-slate-600">
              ATS Intelligence
            </p>
          </div>

        </div>


        <div className="hidden items-center gap-3 sm:flex">

          <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-4 py-2">

            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

            <span className="text-xs text-slate-400">
              AI Analysis Engine
            </span>

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;