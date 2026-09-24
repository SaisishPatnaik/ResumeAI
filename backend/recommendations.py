def generate_recommendations(missing_skills):
    recommendations = []

    high_priority = {
        "python",
        "machine learning",
        "scikit-learn",
        "pandas",
        "numpy",
        "sql",
        "tensorflow",
        "pytorch",
        "fastapi",
        "flask",
        "docker",
        "aws",
        "azure",
        "gcp"
    }

    medium_priority = {
        "deep learning",
        "natural language processing",
        "computer vision",
        "data analysis",
        "statistics",
        "git",
        "github",
        "react",
        "mongodb",
        "mysql",
        "postgresql"
    }

    for skill in missing_skills:

        if skill in high_priority:
            priority = "High"
        elif skill in medium_priority:
            priority = "Medium"
        else:
            priority = "Low"

        recommendations.append({
            "skill": skill,
            "priority": priority,
            "reason": f"{skill.title()} is required by the job but was not detected in the resume."
        })

    return recommendations