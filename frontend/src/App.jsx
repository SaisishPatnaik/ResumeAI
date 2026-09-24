import { useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";


function App() {
  const [result, setResult] = useState(null);
  const [resume, setResume] = useState(null);


  const handleAnalysisComplete = (
    analysisResult,
    uploadedResume
  ) => {
    setResult(analysisResult);
    setResume(uploadedResume);
  };


  const handleNewAnalysis = () => {
    setResult(null);
    setResume(null);
  };


  return (
    <div className="min-h-screen bg-slate-950">

      <Navbar />

      {result ? (
        <Dashboard
          result={result}
          resume={resume}
          onNewAnalysis={handleNewAnalysis}
        />
      ) : (
        <Home
          onAnalysisComplete={
            handleAnalysisComplete
          }
        />
      )}

    </div>
  );
}


export default App;