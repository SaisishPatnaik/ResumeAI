export const getScoreInterpretation = (score) => {
  if (score >= 80) {
    return {
      title: "Strong Alignment",
      color: "text-green-400",
      description:
        "Your resume has strong overlap with the requirements detected in this job description."
    };
  }

  if (score >= 60) {
    return {
      title: "Good Alignment",
      color: "text-blue-400",
      description:
        "Your resume matches several important aspects of this role, with some areas that could be strengthened."
    };
  }

  if (score >= 40) {
    return {
      title: "Moderate Alignment",
      color: "text-yellow-400",
      description:
        "There is some overlap with the role, but several requirements may need attention."
    };
  }

  return {
    title: "Low Alignment",
    color: "text-red-400",
    description:
      "The analysis detected limited overlap between the resume and this particular job description."
  };
};


export const calculateSkillCoverage = (
  matchedSkills = [],
  missingSkills = []
) => {
  const totalSkills =
    matchedSkills.length + missingSkills.length;

  if (totalSkills === 0) {
    return 0;
  }

  return Math.round(
    (matchedSkills.length / totalSkills) * 100
  );
};