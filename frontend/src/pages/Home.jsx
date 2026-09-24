import { useState } from "react";

import { analyzeResume } from "../services/api";

import FileUpload from "../components/FileUpload";
import JobDescription from "../components/JobDescription";
import AnalyzeButton from "../components/AnalyzeButton";


function Home({ onAnalysisComplete }) {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  const handleFileSelect = (
    file,
    fileError
  ) => {
    setResume(file);
    setError(fileError || "");
  };


  const handleAnalyze = async () => {

    if (!resume) {
      setError("Please upload your resume.");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please enter a job description.");
      return;
    }


    try {

      setLoading(true);
      setError("");


      const data = await analyzeResume(
        resume,
        jobDescription
      );


      onAnalysisComplete(
        data,
        resume
      );

    } catch (error) {

      console.error(error);

      setError(
        "Unable to analyze the resume. Make sure the backend is running."
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* HERO */}

      <section className="relative mx-auto max-w-5xl px-6 pb-16 pt-20 text-center">

  <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />

  <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-medium text-blue-400">

    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />

    AI-Powered Resume Analysis

  </span>


  <h1 className="mx-auto mt-7 max-w-4xl text-5xl font-black tracking-tight text-white md:text-7xl">

    See how your resume

    <span className="block bg-linear-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
      matches the job.
    </span>

  </h1>


  <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">

    Analyze your resume against any job description using
    semantic similarity, skill matching and ATS intelligence.

  </p>


  <div className="mt-8 flex flex-wrap justify-center gap-3">

    {[
      "Semantic AI",
      "Skill Analysis",
      "ATS Scoring",
      "Actionable Insights",
    ].map((feature) => (
      <span
        key={feature}
        className="rounded-full border border-slate-800 bg-slate-900/70 px-4 py-2 text-xs text-slate-400"
      >
        {feature}
      </span>
    ))}

  </div>

</section>


      {/* INPUT AREA */}

      <section className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-2">


        {/* RESUME */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <div className="mb-6">

            <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
              Step 01
            </p>

            <h2 className="mt-2 text-xl font-bold">
              Upload Resume
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Upload your resume in PDF format.
            </p>

          </div>


          <FileUpload
            resume={resume}
            onFileSelect={handleFileSelect}
          />

        </div>


        {/* JOB DESCRIPTION */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <div className="mb-6">

            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400">
              Step 02
            </p>

            <h2 className="mt-2 text-xl font-bold">
              Job Description
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Paste the job description you're applying for.
            </p>

          </div>


          <JobDescription
            value={jobDescription}
            onChange={setJobDescription}
          />

        </div>

      </section>


      {/* ERROR */}

      {error && (
        <div className="mx-auto mt-6 max-w-2xl rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center text-sm text-red-400">
          {error}
        </div>
      )}


      {/* ANALYZE */}

      <div className="flex flex-col items-center px-6 py-10">

        <AnalyzeButton
          loading={loading}
          onClick={handleAnalyze}
        />

        <p className="mt-4 text-xs text-slate-600">
          TF-IDF • Sentence Transformers • Skill Analysis
        </p>

      </div>

    </main>
  );
}


export default Home;