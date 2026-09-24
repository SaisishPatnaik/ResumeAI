function ScoreCard({ title, value, color = "blue" }) {
  const colors = {
    blue: "text-blue-400",
    green: "text-green-400",
    red: "text-red-400",
    yellow: "text-yellow-400",
    purple: "text-purple-400",
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-800/80 hover:shadow-xl hover:shadow-black/20">
      <p className="text-xs uppercase tracking-widest text-slate-500">
        {title}
      </p>

      <p
        className={`mt-4 text-3xl font-black ${
          colors[color] || colors.blue
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export default ScoreCard;