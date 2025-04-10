
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, CheckCircle, XCircle, AlertCircle, FileText } from "lucide-react";
import { toast } from "sonner";

const ResumeFeedback = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<any | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf" || 
          droppedFile.type === "application/msword" || 
          droppedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        setFile(droppedFile);
      } else {
        toast.error("Please upload a PDF or Word document");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf" || 
          selectedFile.type === "application/msword" || 
          selectedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        setFile(selectedFile);
      } else {
        toast.error("Please upload a PDF or Word document");
      }
    }
  };

  const analyzeResume = () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Mock feedback data
      const mockFeedback = {
        score: 82,
        atsCompatibility: "Good",
        sections: [
          {
            title: "Summary",
            feedback: "Your summary is strong and effectively highlights your skills and experience.",
            rating: "good",
          },
          {
            title: "Work Experience",
            feedback: "Your work experience section could use more quantifiable achievements. Try adding metrics to showcase your impact.",
            rating: "needs_improvement",
          },
          {
            title: "Skills",
            feedback: "Great job listing relevant skills. Consider organizing them into categories for better readability.",
            rating: "good",
          },
          {
            title: "Education",
            feedback: "Your education section is well-formatted and complete.",
            rating: "good",
          },
        ],
        missingKeywords: ["project management", "agile", "cross-functional"],
        improvementSuggestions: [
          "Add more quantifiable achievements to your work experience",
          "Include the keywords missing from your resume",
          "Consider adding a projects section to highlight relevant work",
          "Ensure consistent formatting throughout the document",
        ],
      };
      
      setFeedback(mockFeedback);
      setIsAnalyzing(false);
    }, 3000);
  };

  const ratingIcon = (rating: string) => {
    switch (rating) {
      case "good":
        return <CheckCircle className="text-green-500 h-5 w-5" />;
      case "needs_improvement":
        return <AlertCircle className="text-amber-500 h-5 w-5" />;
      case "poor":
        return <XCircle className="text-red-500 h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-jobwise-dark mb-2">AI Resume Feedback</h1>
        <p className="text-gray-600">
          Get personalized AI feedback to improve your resume and stand out to employers
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="h-full">
            <CardContent className="p-6 h-full flex flex-col">
              <h2 className="text-xl font-bold text-jobwise-dark mb-4">Upload Your Resume</h2>
              
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center flex-grow flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  isDragging 
                    ? "border-jobwise-medium bg-jobwise-light/30" 
                    : file 
                      ? "border-green-400 bg-green-50" 
                      : "border-gray-300 hover:border-jobwise-light hover:bg-jobwise-light/10"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("resume-upload")?.click()}
              >
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFileChange}
                />
                
                {file ? (
                  <div className="flex flex-col items-center">
                    <FileText className="h-16 w-16 text-green-500 mb-4" />
                    <p className="font-medium text-gray-900 mb-1">{file.name}</p>
                    <p className="text-sm text-gray-500 mb-4">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                      }}
                      variant="outline"
                      size="sm"
                    >
                      Change File
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="h-12 w-12 text-jobwise-medium mb-4" />
                    <p className="font-medium text-gray-900 mb-2">
                      Drag and drop your resume
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Supports PDF, DOC, DOCX (Max 5MB)
                    </p>
                    <Button size="sm">Browse Files</Button>
                  </div>
                )}
              </div>
              
              <Button
                className="mt-6 bg-jobwise-medium hover:bg-jobwise-dark"
                disabled={!file || isAnalyzing}
                onClick={analyzeResume}
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Feedback Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="h-full">
            <CardContent className="p-6 h-full">
              {isAnalyzing ? (
                <div className="h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 border-4 border-t-jobwise-medium rounded-full animate-spin mb-4"></div>
                  <h3 className="text-lg font-medium">Analyzing your resume...</h3>
                  <p className="text-gray-500 mt-2">This may take a moment</p>
                </div>
              ) : feedback ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-jobwise-dark">Resume Feedback</h2>
                    <div className="bg-jobwise-light text-jobwise-dark font-bold px-4 py-2 rounded-full">
                      Score: {feedback.score}/100
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start">
                      <div className="mr-3 mt-0.5">
                        <FileText className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-medium text-blue-800">ATS Compatibility</h3>
                        <p className="text-blue-600">{feedback.atsCompatibility}: Your resume is generally compatible with ATS systems.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-bold">Section Feedback</h3>
                    
                    {feedback.sections.map((section: any, index: number) => (
                      <div key={index} className="flex items-start p-3 border rounded-lg">
                        <div className="mr-3 mt-0.5">
                          {ratingIcon(section.rating)}
                        </div>
                        <div>
                          <h4 className="font-medium">{section.title}</h4>
                          <p className="text-gray-600">{section.feedback}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {feedback.missingKeywords.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-bold">Missing Keywords</h3>
                      <div className="flex flex-wrap gap-2">
                        {feedback.missingKeywords.map((keyword: string, index: number) => (
                          <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <h3 className="font-bold">Improvement Suggestions</h3>
                    <ul className="space-y-2">
                      {feedback.improvementSuggestions.map((suggestion: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2 text-jobwise-medium">•</span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <img 
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&h=400" 
                    alt="Resume analysis" 
                    className="rounded-lg mb-6 max-w-full h-auto object-cover opacity-70"
                  />
                  <h3 className="text-lg font-medium text-jobwise-dark mb-2">
                    Get Expert Resume Feedback
                  </h3>
                  <p className="text-gray-500 max-w-md">
                    Upload your resume to receive detailed AI feedback on format, content, 
                    ATS compatibility, and specific improvement suggestions.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ResumeFeedback;
