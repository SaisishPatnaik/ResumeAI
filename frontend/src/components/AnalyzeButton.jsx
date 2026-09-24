function AnalyzeButton({
  loading,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="rounded-xl bg-blue-600 px-10 py-4 font-semibold shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/20 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading
        ? "Analyzing Resume..."
        : "Analyze Resume →"}
    </button>
  );
}

export default AnalyzeButton;