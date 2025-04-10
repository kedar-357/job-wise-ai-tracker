
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Zap, CheckCircle, Lightbulb, Briefcase, Cpu, GraduationCap } from "lucide-react";
import { toast } from "sonner";

const JDAnalysis = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any | null>(null);

  const handleAnalyze = () => {
    if (!jobDescription.trim()) {
      toast.error("Please enter a job description to analyze");
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Mock analysis data
      const mockAnalysis = {
        role: "Frontend Developer",
        company: "TechCorp Inc.",
        skills: [
          { name: "React", type: "technical", level: "advanced" },
          { name: "TypeScript", type: "technical", level: "intermediate" },
          { name: "CSS/SCSS", type: "technical", level: "advanced" },
          { name: "JavaScript", type: "technical", level: "advanced" },
          { name: "Git", type: "technical", level: "intermediate" },
          { name: "Responsive Design", type: "technical", level: "advanced" },
        ],
        tools: [
          { name: "Webpack", category: "build" },
          { name: "Jest", category: "testing" },
          { name: "Redux", category: "state management" },
          { name: "GitHub", category: "version control" },
          { name: "Jira", category: "project management" },
        ],
        requirements: [
          "3+ years of experience with React",
          "Strong knowledge of TypeScript",
          "Experience with modern frontend build tools",
          "Understanding of responsive design principles",
          "Bachelor's degree in Computer Science or related field",
        ],
        keyPhrases: [
          "component-based architecture",
          "user-focused experiences",
          "cross-browser compatibility",
          "performance optimization",
          "team collaboration",
        ],
        resumeKeywords: [
          "React", "TypeScript", "JavaScript", "CSS", "SCSS", "Redux", 
          "Webpack", "Jest", "responsive design", "frontend development",
          "component architecture", "web applications"
        ],
      };
      
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleClear = () => {
    setJobDescription("");
    setAnalysis(null);
  };

  const getSkillBadgeColor = (level: string) => {
    switch (level) {
      case "advanced":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "intermediate":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "basic":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const getToolBadgeColor = (category: string) => {
    switch (category) {
      case "build":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case "testing":
        return "bg-cyan-100 text-cyan-800 hover:bg-cyan-200";
      case "state management":
        return "bg-indigo-100 text-indigo-800 hover:bg-indigo-200";
      case "version control":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200";
      case "project management":
        return "bg-pink-100 text-pink-800 hover:bg-pink-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-jobwise-dark mb-2">Job Description Analysis</h1>
        <p className="text-gray-600">
          Paste a job description to extract key skills, requirements, and keywords for your application
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="h-full">
            <CardContent className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-jobwise-dark">Paste Job Description</h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleClear}
                  disabled={!jobDescription.trim()}
                >
                  Clear
                </Button>
              </div>
              
              <Textarea
                placeholder="Paste the full job description here..."
                className="flex-grow min-h-[300px] mb-6 resize-none"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              
              <Button
                className="bg-jobwise-medium hover:bg-jobwise-dark"
                disabled={!jobDescription.trim() || isAnalyzing}
                onClick={handleAnalyze}
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Description"}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Analysis Section */}
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
                  <h3 className="text-lg font-medium">Analyzing job description...</h3>
                  <p className="text-gray-500 mt-2">Extracting key information</p>
                </div>
              ) : analysis ? (
                <div className="space-y-6 h-full overflow-auto">
                  <div className="border-b pb-4">
                    <h2 className="text-xl font-bold text-jobwise-dark mb-2">{analysis.role}</h2>
                    <p className="text-gray-600">{analysis.company}</p>
                  </div>

                  <Tabs defaultValue="skills" className="w-full">
                    <TabsList className="grid grid-cols-4 mb-4">
                      <TabsTrigger value="skills">Skills</TabsTrigger>
                      <TabsTrigger value="requirements">Requirements</TabsTrigger>
                      <TabsTrigger value="keywords">Keywords</TabsTrigger>
                      <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                    </TabsList>

                    <TabsContent value="skills" className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Cpu className="h-5 w-5 text-jobwise-medium" />
                          <h3 className="font-bold">Technical Skills</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {analysis.skills.map((skill: any, index: number) => (
                            <Badge 
                              key={index} 
                              variant="outline"
                              className={getSkillBadgeColor(skill.level)}
                            >
                              {skill.name}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Briefcase className="h-5 w-5 text-jobwise-medium" />
                          <h3 className="font-bold">Tools & Technologies</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {analysis.tools.map((tool: any, index: number) => (
                            <Badge 
                              key={index} 
                              variant="outline"
                              className={getToolBadgeColor(tool.category)}
                            >
                              {tool.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="requirements" className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle className="h-5 w-5 text-jobwise-medium" />
                          <h3 className="font-bold">Job Requirements</h3>
                        </div>
                        <ul className="space-y-2">
                          {analysis.requirements.map((req: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-2 text-jobwise-medium">•</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <GraduationCap className="h-5 w-5 text-jobwise-medium" />
                          <h3 className="font-bold">Key Phrases</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {analysis.keyPhrases.map((phrase: string, index: number) => (
                            <Badge 
                              key={index} 
                              variant="outline"
                              className="bg-amber-50 text-amber-800 hover:bg-amber-100"
                            >
                              {phrase}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="keywords" className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Search className="h-5 w-5 text-jobwise-medium" />
                          <h3 className="font-bold">Keywords for Your Resume</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Include these keywords in your resume to increase ATS compatibility
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {analysis.resumeKeywords.map((keyword: string, index: number) => (
                            <Badge 
                              key={index} 
                              variant="outline"
                              className="bg-green-50 text-green-800 hover:bg-green-100"
                            >
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="suggestions" className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Lightbulb className="h-5 w-5 text-jobwise-medium" />
                          <h3 className="font-bold">Application Tips</h3>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                            <p className="text-blue-800">
                              <span className="font-medium">Focus on React expertise:</span> The job emphasizes React knowledge, so highlight your React projects and experience prominently.
                            </p>
                          </div>
                          
                          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                            <p className="text-blue-800">
                              <span className="font-medium">Demonstrate TypeScript skills:</span> Mention your experience with TypeScript and how you've used it in past projects.
                            </p>
                          </div>
                          
                          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                            <p className="text-blue-800">
                              <span className="font-medium">Highlight responsive design work:</span> Include examples of responsive web applications you've built.
                            </p>
                          </div>
                          
                          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                            <p className="text-blue-800">
                              <span className="font-medium">Mention testing experience:</span> Your familiarity with Jest or other testing frameworks will be valuable.
                            </p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="p-10 rounded-full bg-jobwise-light/30 mb-6">
                    <Zap className="h-12 w-12 text-jobwise-medium" />
                  </div>
                  <h3 className="text-lg font-medium text-jobwise-dark mb-2">
                    AI-Powered Job Description Analysis
                  </h3>
                  <p className="text-gray-500 max-w-md">
                    Paste a job description to extract key requirements, skills, and keywords. 
                    Our AI will analyze the text and provide tailored insights for your application.
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

export default JDAnalysis;
