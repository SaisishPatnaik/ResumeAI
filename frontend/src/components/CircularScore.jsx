function CircularScore({ score }) {
  const value = Number(score || 0);

  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference - (value / 100) * circumference;

  return (
    <div className="relative flex h-56 w-56 items-center justify-center">

      <svg
        className="h-full w-full -rotate-90"
        viewBox="0 0 180 180"
      >
        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke="currentColor"
          strokeWidth="10"
          fill="none"
          className="text-slate-800"
        />

        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke="currentColor"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          className="text-blue-500"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      <div className="absolute text-center">
        <p className="text-5xl font-black text-white">
          {value.toFixed(0)}
        </p>

        <p className="mt-1 text-xs uppercase tracking-widest text-slate-500">
          ATS Score
        </p>
      </div>

    </div>
  );
}

export default CircularScore;