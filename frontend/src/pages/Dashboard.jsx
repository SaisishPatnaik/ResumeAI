import {
  calculateSkillCoverage,
  getScoreInterpretation,
} from "../utils/scoreUtils";

import CircularScore from "../components/CircularScore";
import ScoreBreakdown from "../components/ScoreBreakdown";
import ScoreCard from "../components/ScoreCard";
import SkillPanel from "../components/SkillPanel";
import RecommendationCard from "../components/RecommendationCard";
import ResumeQuality from "../components/ResumeQuality";


function Dashboard({
  result,
  resume,
  onNewAnalysis,
}) {
  if (!result) {
    return null;
  }

  const overallScore = Number(
    result.overall_ats_score || 0
  );

  const matchedSkills =
    result.matched_skills || [];

  const missingSkills =
    result.missing_skills || [];

  const recommendations =
    result.recommendations || [];

  const sections =
    result.resume_quality?.sections_found || [];

  const warnings =
    result.resume_quality?.warnings || [];

  const skillCoverage =
    calculateSkillCoverage(
      matchedSkills,
      missingSkills
    );

  const interpretation =
    getScoreInterpretation(overallScore);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>

            <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
              Analysis Complete
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Resume Dashboard
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {resume?.name || result.resume}
            </p>

          </div>

          <button
            type="button"
            onClick={onNewAnalysis}
            className="rounded-xl border border-slate-700 px-5 py-3 text-sm text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-600 hover:bg-slate-800 hover:text-white hover:shadow-lg hover:shadow-black/20 active:translate-y-0"
          >
            ← New Analysis
          </button>

        </div>


        {/* SCORE SECTION */}

        <section className="grid gap-6 lg:grid-cols-2">

          {/* ATS SCORE */}

          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-8">

            <p className="text-xs uppercase tracking-widest text-blue-400">
              Overall ATS Score
            </p>

            <div className="mt-8 flex flex-col items-center">

              <CircularScore
                score={overallScore}
              />

              <h2
                className={`mt-6 text-xl font-bold ${interpretation.color}`}
              >
                {interpretation.title}
              </h2>

              <p className="mt-2 max-w-md text-center text-sm leading-6 text-slate-500">
                {interpretation.description}
              </p>

            </div>

          </div>


          {/* BREAKDOWN */}

          <ScoreBreakdown
            semanticScore={
              result.semantic_match_score
            }
            skillScore={
              result.skill_match_score
            }
            textScore={
              result.text_match_score
            }
          />

        </section>


        {/* STATS */}

        <section className="mt-6 grid gap-5 md:grid-cols-3">

          <ScoreCard
            title="Matched Skills"
            value={matchedSkills.length}
            color="green"
          />

          <ScoreCard
            title="Missing Skills"
            value={missingSkills.length}
            color="red"
          />

          <ScoreCard
            title="Skill Coverage"
            value={`${skillCoverage}%`}
            color="blue"
          />

        </section>


        {/* SKILLS */}

        <section className="mt-6 grid gap-6 lg:grid-cols-2">

          <SkillPanel
            title="Matched Skills"
            skills={matchedSkills}
            positive
          />

          <SkillPanel
            title="Missing Skills"
            skills={missingSkills}
          />

        </section>


        {/* RECOMMENDATIONS */}

        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-7">

          <p className="text-xs uppercase tracking-widest text-purple-400">
            Skill Gap Analysis
          </p>

          <h2 className="mt-2 text-xl font-bold">
            Recommended Improvements
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">

            {recommendations.length > 0 ? (
              recommendations.map(
                (item, index) => (
                  <RecommendationCard
                    key={`${item.skill}-${index}`}
                    item={item}
                  />
                )
              )
            ) : (
              <p className="text-sm text-slate-500">
                No recommendations available.
              </p>
            )}

          </div>

        </section>


        {/* RESUME QUALITY */}

        <div className="mt-6">

          <ResumeQuality
            sections={sections}
            warnings={warnings}
          />

        </div>

      </div>

    </main>
  );
}

export default Dashboard;