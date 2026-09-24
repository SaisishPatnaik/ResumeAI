import re


SKILLS = [
    "python",
    "java",
    "c++",
    "javascript",
    "typescript",
    "sql",
    "mongodb",
    "mysql",
    "postgresql",

    "pandas",
    "numpy",
    "scikit-learn",
    "tensorflow",
    "pytorch",
    "keras",
    "matplotlib",

    "machine learning",
    "deep learning",
    "reinforcement learning",
    "natural language processing",
    "computer vision",

    "data analysis",
    "data visualization",
    "statistics",

    "git",
    "github",
    "docker",
    "kubernetes",
    "aws",
    "gcp",

    "fastapi",
    "flask",
    "django",

    "html",
    "css",
    "react",
    "tailwind css",
    
    "power bi",
    "tableau",

    "xgboost",
    "opencv",
    "speech recognition",
]


def extract_skills(text):

    text = text.lower()

    found_skills = []

    for skill in SKILLS:

        pattern = r"\b" + re.escape(skill) + r"\b"

        if re.search(pattern, text):
            found_skills.append(skill)

    return found_skills