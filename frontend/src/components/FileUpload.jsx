import { useRef } from "react";

function FileUpload({ resume, onFileSelect }) {
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) {
      return;
    }

    if (file.type !== "application/pdf") {
      onFileSelect(null, "Please upload a PDF resume.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      onFileSelect(
        null,
        "Resume must be smaller than 10 MB."
      );
      return;
    }

    onFileSelect(file, "");
  };

  const handleFileChange = (event) => {
    handleFile(event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];

    handleFile(file);
  };

  return (
    <div
      onDragOver={(event) =>
        event.preventDefault()
      }
      onDrop={handleDrop}
      onClick={() =>
        fileInputRef.current?.click()
      }
      className={`flex min-h-300px cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-all  duration-300 ${
        resume
          ? "border-blue-500 bg-blue-500/5"
          : "border-slate-700 bg-slate-950 hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-500/0.03 hover:shadow-xl hover:shadow-blue-500/5"
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="mb-5 text-5xl">
        📄
      </div>

      {resume ? (
        <>
          <p className="max-w-full truncate font-semibold">
            {resume.name}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            {(resume.size / 1024 / 1024).toFixed(2)} MB
          </p>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onFileSelect(null, "");
            }}
            className="mt-5 text-sm text-blue-400 hover:text-blue-300"
          >
            Choose another file
          </button>
        </>
      ) : (
        <>
          <p className="font-semibold">
            Drop your resume here
          </p>

          <p className="mt-2 text-sm text-slate-500">
            or click to browse
          </p>

          <p className="mt-5 text-xs text-slate-600">
            PDF files • Maximum 10 MB
          </p>
        </>
      )}
    </div>
  );
}

export default FileUpload;