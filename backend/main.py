from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
from semantic_matcher import calculate_semantic_score
from parser import extract_text_from_pdf
from matcher import calculate_match_score, calculate_skill_match
from scoring import calculate_final_score
from recommendations import generate_recommendations
from resume_analyzer import analyze_resume


app = FastAPI(
    title="Resume Job Matcher API",
    description="API for matching resumes with job descriptions",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():

    return {
        "message": "Resume Job Matcher API is running",
        "version": "2.0.0"
    }


@app.post("/match")
async def match_resume(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):

    file_path = f"uploads/{resume.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(resume.file, buffer)

    resume_text = extract_text_from_pdf(file_path)

    text_score = calculate_match_score(
        resume_text,
        job_description
    )
    
    semantic_score = calculate_semantic_score(
    resume_text,
    job_description
)

    skill_results = calculate_skill_match(
        resume_text,
        job_description
    )
    
    overall_score = calculate_final_score(
    semantic_score,
    skill_results["skill_match_score"],
    text_score
)
    recommendations = generate_recommendations(
        skill_results["missing_skills"]
    )
    
    resume_quality = analyze_resume(resume_text)
    
    
    os.remove(file_path)

    return {
        "resume": resume.filename,
        "text_match_score": text_score,
        "semantic_match_score": semantic_score,
        "skill_match_score": skill_results["skill_match_score"],
        "overall_ats_score": overall_score,
        "resume_skills": skill_results["resume_skills"],
        "required_skills": skill_results["required_skills"],
        "matched_skills": skill_results["matched_skills"],
        "missing_skills": skill_results["missing_skills"],
        "recommendations": recommendations,
        "resume_quality": resume_quality
    }