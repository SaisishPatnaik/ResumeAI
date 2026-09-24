function SkillPanel({
  title,
  skills = [],
  positive = false,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-7">

      <div className="flex items-center justify-between">

        <h2 className="text-lg font-bold">
          {title}
        </h2>

        <span className="text-xs text-slate-600">
          {skills.length} detected
        </span>

      </div>

      <div className="mt-5 flex flex-wrap gap-2">

        {skills.length > 0 ? (
          skills.map((skill) => (
            <span
              key={skill}
              className={`rounded-lg px-3 py-2 text-xs capitalize transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                positive
                  ? "bg-green-500/10 text-green-400"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              {skill}
            </span>
          ))
        ) : (
          <p className="text-sm text-slate-500">
            None detected.
          </p>
        )}

      </div>

    </div>
  );
}

export default SkillPanel;