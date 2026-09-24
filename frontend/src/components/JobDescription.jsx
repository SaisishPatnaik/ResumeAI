function JobDescription({
  value,
  onChange,
}) {
  return (
    <>
      <textarea
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder="Paste the complete job description here..."
        className="h-300px w-full resize-none rounded-xl border border-slate-700 bg-slate-950 p-5 text-sm leading-6 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
      />

      <div className="mt-3 text-right text-xs text-slate-600">
        {value.length} characters
      </div>
    </>
  );
}

export default JobDescription;