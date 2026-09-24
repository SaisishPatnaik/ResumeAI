function RecommendationCard({ item }) {
  const priorityStyles = {
    High: "bg-red-500/10 text-red-400 border-red-500/20",
    Medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Low: "bg-slate-800 text-slate-400 border-slate-700",
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900 hover:shadow-xl hover:shadow-black/20">

      <div className="flex items-start justify-between gap-4">

        <div>

          <h3 className="font-semibold capitalize">
            {item.skill}
          </h3>

          <p className="mt-2 text-xs leading-5 text-slate-500">
            {item.reason}
          </p>

        </div>

        <span
          className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase ${
            priorityStyles[item.priority] ||
            priorityStyles.Low
          }`}
        >
          {item.priority}
        </span>

      </div>

    </div>  
  );
}

export default RecommendationCard;