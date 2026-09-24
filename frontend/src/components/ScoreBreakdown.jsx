function ScoreBreakdown({
  semanticScore,
  skillScore,
  textScore,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

      <p className="text-xs uppercase tracking-widest text-slate-500">
        Score Breakdown
      </p>

      <h2 className="mt-2 text-xl font-bold">
        Matching performance
      </h2>

      <div className="mt-8 space-y-7">

        <ScoreBar
          title="Semantic Match"
          value={semanticScore}
        />

        <ScoreBar
          title="Skill Match"
          value={skillScore}
        />

        <ScoreBar
          title="Text Match"
          value={textScore}
        />

      </div>

    </div>
  );
}


function ScoreBar({ title, value }) {
  const score = Number(value || 0);

  return (
    <div>

      <div className="mb-2 flex justify-between">

        <span className="text-sm font-medium">
          {title}
        </span>

        <span className="text-sm font-bold">
          {score.toFixed(1)}%
        </span>

      </div>

      <div className="h-2 rounded-full bg-slate-800">

        <div
  className="h-full rounded-full bg-linear-to-r from-blue-600 to-cyan-400 transition-all duration-700 ease-out hover:brightness-125 hover:shadow-lg hover:shadow-blue-500/30"
  style={{
    width: `${Math.min(score, 100)}%`,
  }}
/>

      </div>

    </div>
  );
}

export default ScoreBreakdown;