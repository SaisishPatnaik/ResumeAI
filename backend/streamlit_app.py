import streamlit as st
import tempfile
import os

from parser import extract_text_from_pdf
from matcher import calculate_match_score, calculate_skill_match
from semantic_matcher import calculate_semantic_score
from scoring import calculate_final_score
from recommendations import generate_recommendations
from resume_analyzer import analyze_resume


# -----------------------------
# Page configuration
# -----------------------------

st.set_page_config(
    page_title="ResumeAI — ATS Intelligence",
    page_icon="📄",
    layout="wide"
)


# -----------------------------
# Custom styling
# -----------------------------

st.markdown("""
<style>

.stApp {
    background-color: #020617;
    color: #f8fafc;
}

.main-title {
    font-size: 3rem;
    font-weight: 800;
    text-align: center;
    margin-bottom: 0.3rem;
}

.subtitle {
    text-align: center;
    color: #94a3b8;
    font-size: 1.1rem;
    margin-bottom: 2.5rem;
}

.score-box {
    background: linear-gradient(
        135deg,
        #0f172a,
        #172554
    );
    border: 1px solid #1e40af;
    border-radius: 20px;
    padding: 30px;
    text-align: center;
}

.score-number {
    font-size: 4rem;
    font-weight: 800;
    color: #38bdf8;
}

.metric-card {
    background: #0f172a;
    border: 1px solid #1e293b;
    border-radius: 15px;
    padding: 20px;
    text-align: center;
}

.skill {
    display: inline-block;
    background: #172554;
    color: #7dd3fc;
    padding: 7px 12px;
    border-radius: 999px;
    margin: 4px;
    font-size: 0.9rem;
}

.missing {
    display: inline-block;
    background: #450a0a;
    color: #fca5a5;
    padding: 7px 12px;
    border-radius: 999px;
    margin: 4px;
    font-size: 0.9rem;
}

</style>
""", unsafe_allow_html=True)


# -----------------------------
# Header
# -----------------------------

st.markdown(
    '<div class="main-title">📄 ResumeAI</div>',
    unsafe_allow_html=True
)

st.markdown(
    '<div class="subtitle">ATS Intelligence Platform — Analyze your resume against any job description</div>',
    unsafe_allow_html=True
)


# -----------------------------
# Input section
# -----------------------------

col1, col2 = st.columns(2)

with col1:

    st.subheader("Upload Resume")

    resume_file = st.file_uploader(
        "Upload your resume PDF",
        type=["pdf"]
    )


with col2:

    st.subheader("Job Description")

    job_description = st.text_area(
        "Paste the job description here",
        height=220,
        placeholder="Paste the complete job description..."
    )


# -----------------------------
# Analyze button
# -----------------------------

analyze = st.button(
    "🚀 Analyze Resume",
    use_container_width=True
)


# -----------------------------
# Analysis
# -----------------------------

if analyze:

    if resume_file is None:
        st.error("Please upload a resume PDF.")

    elif not job_description.strip():
        st.error("Please enter a job description.")

    else:

        with st.spinner("Analyzing your resume..."):

            temp_path = None

            try:

                # Save uploaded PDF temporarily

                with tempfile.NamedTemporaryFile(
                    delete=False,
                    suffix=".pdf"
                ) as temp_file:

                    temp_file.write(resume_file.getbuffer())
                    temp_path = temp_file.name


                # Extract resume text

                resume_text = extract_text_from_pdf(
                    temp_path
                )


                # Text similarity

                text_score = calculate_match_score(
                    resume_text,
                    job_description
                )


                # Semantic similarity

                semantic_score = calculate_semantic_score(
                    resume_text,
                    job_description
                )


                # Skill matching

                skill_results = calculate_skill_match(
                    resume_text,
                    job_description
                )


                # Overall ATS score

                overall_score = calculate_final_score(
                    semantic_score,
                    skill_results["skill_match_score"],
                    text_score
                )


                # Recommendations

                recommendations = generate_recommendations(
                    skill_results["missing_skills"]
                )


                # Resume quality

                resume_quality = analyze_resume(
                    resume_text
                )


                # -----------------------------
                # Overall score
                # -----------------------------

                st.markdown("---")

                st.subheader("Overall ATS Score")

                st.markdown(
                    f"""
                    <div class="score-box">
                        <div class="score-number">
                            {overall_score}%
                        </div>
                        <p>Overall Resume–Job Alignment</p>
                    </div>
                    """,
                    unsafe_allow_html=True
                )


                # -----------------------------
                # Score breakdown
                # -----------------------------

                st.subheader("Score Breakdown")

                c1, c2, c3 = st.columns(3)

                with c1:
                    st.metric(
                        "Semantic Match",
                        f"{semantic_score}%"
                    )

                with c2:
                    st.metric(
                        "Skill Match",
                        f"{skill_results['skill_match_score']}%"
                    )

                with c3:
                    st.metric(
                        "Text Match",
                        f"{text_score}%"
                    )


                # -----------------------------
                # Skills
                # -----------------------------

                st.markdown("---")

                st.subheader("Skills Analysis")

                matched = skill_results["matched_skills"]
                missing = skill_results["missing_skills"]

                c1, c2 = st.columns(2)

                with c1:

                    st.markdown("### ✅ Matched Skills")

                    if matched:

                        html = ""

                        for skill in matched:
                            html += (
                                f'<span class="skill">{skill}</span>'
                            )

                        st.markdown(
                            html,
                            unsafe_allow_html=True
                        )

                    else:
                        st.info("No matching skills detected.")


                with c2:

                    st.markdown("### ❌ Missing Skills")

                    if missing:

                        html = ""

                        for skill in missing:
                            html += (
                                f'<span class="missing">{skill}</span>'
                            )

                        st.markdown(
                            html,
                            unsafe_allow_html=True
                        )

                    else:
                        st.success(
                            "No missing skills detected."
                        )


                # -----------------------------
                # Recommendations
                # -----------------------------

                st.markdown("---")

                st.subheader("💡 Recommendations")

                if recommendations:

                    for recommendation in recommendations:

                        priority = recommendation["priority"]

                        with st.expander(
                            f"{priority} Priority — {recommendation['skill'].title()}"
                        ):

                            st.write(
                                recommendation["reason"]
                            )

                else:

                    st.success(
                        "No specific skill recommendations."
                    )


                # -----------------------------
                # Resume quality
                # -----------------------------

                st.markdown("---")

                st.subheader("📋 Resume Quality")

                sections = resume_quality.get(
                    "sections_found",
                    []
                )

                missing_sections = resume_quality.get(
                    "missing_sections",
                    []
                )

                warnings = resume_quality.get(
                    "warnings",
                    []
                )

                st.write(
                    f"**Sections detected:** {len(sections)}"
                )

                if sections:
                    st.write(
                        ", ".join(sections)
                    )

                if missing_sections:

                    st.warning(
                        "Missing sections: "
                        + ", ".join(missing_sections)
                    )

                if warnings:

                    for warning in warnings:
                        st.info(warning)


            except Exception as e:

                st.error(
                    f"Analysis failed: {str(e)}"
                )

            finally:

                if temp_path and os.path.exists(temp_path):

                    os.remove(temp_path)