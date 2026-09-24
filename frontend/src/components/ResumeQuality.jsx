function ResumeQuality({ sections = [], warnings = [] }) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-7">

      <p className="text-xs uppercase tracking-widest text-yellow-400">
        Resume Quality
      </p>

      <h2 className="mt-2 text-xl font-bold">
        Resume Structure
      </h2>

      <div className="mt-6 flex flex-wrap gap-2">

        {sections.length > 0 ? (
          sections.map((section) => (
            <span
              key={section}
              className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-2 text-xs capitalize text-green-400"
            >
              ✓ {section}
            </span>
          ))
        ) : (
          <p className="text-sm text-slate-500">
            No resume sections were detected.
          </p>
        )}

      </div>

      {warnings.length > 0 && (
        <div className="mt-8 space-y-3">

          {warnings.map((warning, index) => (
            <div
              key={index}
              className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-sm text-yellow-400"
            >
              ⚠ {warning}
            </div>
          ))}

        </div>
      )}

    </section>
  );
}

export default ResumeQuality;