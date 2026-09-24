import re


SECTION_KEYWORDS = {
    "summary": [
        "summary",
        "profile",
        "objective"
    ],
    "skills": [
        "skills",
        "technical skills",
        "skills & technologies"
    ],
    "experience": [
        "experience",
        "work experience",
        "professional experience"
    ],
    "projects": [
        "projects",
        "personal projects",
        "academic projects"
    ],
    "education": [
        "education",
        "academic background"
    ],
    "certifications": [
        "certifications",
        "certificates",
        "certification"
    ]
}


def analyze_resume(resume_text):

    text = resume_text.lower()

    sections_found = []
    missing_sections = []
    warnings = []

    for section, keywords in SECTION_KEYWORDS.items():

        found = False

        for keyword in keywords:

            pattern = r"\b" + re.escape(keyword) + r"\b"

            if re.search(pattern, text):
                found = True
                break

        if found:
            sections_found.append(section)
        else:
            missing_sections.append(section)

    if "summary" in missing_sections:
        warnings.append(
            "A professional summary or objective was not detected."
        )

    if "experience" in missing_sections:
        warnings.append(
            "Experience section was not detected."
        )

    if "projects" in missing_sections:
        warnings.append(
            "Projects section was not detected."
        )

    if "education" in missing_sections:
        warnings.append(
            "Education section was not detected."
        )

    if "certifications" in missing_sections:
        warnings.append(
            "Certifications section was not detected."
        )

    return {
        "sections_found": sections_found,
        "missing_sections": missing_sections,
        "warnings": warnings
    }