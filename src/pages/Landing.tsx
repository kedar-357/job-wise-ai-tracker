
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, FileText, BarChart, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Landing = () => {
  const features = [
    {
      icon: Briefcase,
      title: "Job Application Tracker",
      description: "Organize all your applications in one place"
    },
    {
      icon: FileText,
      title: "AI Resume Feedback",
      description: "Get intelligent feedback to improve your resume"
    },
    {
      icon: Search,
      title: "Job Description Analysis",
      description: "Extract key skills and requirements"
    },
    {
      icon: BarChart,
      title: "Application Analytics",
      description: "Visualize your job search progress"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-jobwise-light/40 dark:from-jobwise-dark dark:to-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-jobwise-light rounded-full filter blur-3xl opacity-20 dark:opacity-10"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-jobwise rounded-full filter blur-3xl opacity-30 dark:opacity-10"></div>

        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <motion.div 
              className="max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 bg-gradient-to-r from-jobwise-dark to-jobwise-medium bg-clip-text text-transparent dark:from-white dark:to-jobwise-light">
                Your Job Search, <br/>Intelligently Managed
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 dark:text-gray-300">
                Seamlessly track your applications, get AI-powered resume feedback, 
                analyze job descriptions, and visualize your progress with JobWise AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-jobwise-medium hover:bg-jobwise-dark text-white dark:bg-jobwise-dark dark:hover:bg-jobwise-medium"
                >
                  <Link to="/auth">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="w-full max-w-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="glass p-1 rounded-2xl shadow-xl">
                <div className="rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&h=600" 
                    alt="JobWise Dashboard Preview" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-b from-transparent to-jobwise-light/10 dark:to-jobwise-dark/30 py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-jobwise-dark dark:text-white">Everything You Need For Your Job Search</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-gray-300">
              We've built the tools you need to find and land your dream job
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full glass-card border-jobwise-light dark:bg-jobwise-dark/60 dark:border-jobwise-medium/20">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-full bg-jobwise-light dark:bg-jobwise-medium/30 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-jobwise-dark dark:text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-jobwise-dark mb-2 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          className="max-w-4xl mx-auto text-center glass-card p-8 md:p-12 border-jobwise-light dark:bg-jobwise-dark/60 dark:border-jobwise-medium/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-jobwise-dark dark:text-white">Ready to Transform Your Job Search?</h2>
          <p className="text-lg text-gray-600 mb-8 dark:text-gray-300">
            Join thousands of job seekers who have streamlined their application process with JobWise AI.
          </p>
          <Button 
            asChild
            size="lg" 
            className="bg-jobwise-medium hover:bg-jobwise-dark text-white dark:bg-jobwise-dark dark:hover:bg-jobwise-medium"
          >
            <Link to="/auth">
              Create Free Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
