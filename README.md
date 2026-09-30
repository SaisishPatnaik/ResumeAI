# ResumeAI — ATS Intelligence Platform

ResumeAI is an AI-powered Applicant Tracking System (ATS) intelligence platform that analyzes resumes against job descriptions and provides an overall ATS compatibility score, skill analysis, recommendations, and resume quality insights.

## 🚀 Live Demo

[Try ResumeAI] - [Live Link](https://resumeai-ckvfwv36tco4wj59wtycmm.streamlit.app/)

## ✨ Features

- Resume PDF upload
- Job description analysis
- TF-IDF text similarity
- Semantic similarity using Sentence Transformers
- Automated skill extraction
- Matched and missing skill detection
- Weighted ATS compatibility score
- Skill-based recommendations
- Resume section analysis
- Resume quality warnings
- Interactive Streamlit dashboard

## 🧠 How It Works

ResumeAI combines multiple signals to calculate an overall ATS score:

| Component | Weight |
|---|---:|
| Semantic Similarity | 50% |
| Skill Match | 35% |
| Text Similarity | 15% |

### Semantic Similarity

Uses the `all-MiniLM-L6-v2` Sentence Transformer model to compare the semantic meaning of the resume and job description.

### Skill Matching

Extracts technical skills from both documents and identifies:

- Matched skills
- Missing skills
- Required skills
- Resume skills

### Text Similarity

Uses TF-IDF vectorization and cosine similarity to measure textual overlap between the resume and job description.

## 🛠️ Tech Stack

- Python
- Streamlit
- Scikit-learn
- Sentence Transformers
- PyMuPDF
- FastAPI
- Uvicorn

## 📁 Project Structure

```text
ResumeAI/
├── backend/
│   ├── main.py
│   ├── streamlit_app.py
│   ├── matcher.py
│   ├── parser.py
│   ├── semantic_matcher.py
│   ├── skills.py
│   ├── scoring.py
│   ├── recommendations.py
│   ├── resume_analyzer.py
│   ├── requirements.txt
│   └── uploads/
│
├── .gitignore
└── README.md