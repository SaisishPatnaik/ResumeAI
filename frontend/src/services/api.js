import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export const analyzeResume = async (resume, jobDescription) => {
  const formData = new FormData();

  formData.append("resume", resume);
  formData.append("job_description", jobDescription);

  const response = await axios.post(
    `${API_URL}/match`,
    formData
  );

  return response.data;
};