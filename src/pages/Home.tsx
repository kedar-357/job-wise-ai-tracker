
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const Home = () => {
  const features = [
    {
      title: "Track Applications",
      description: "Keep all your job applications organized in one place",
    },
    {
      title: "AI Resume Feedback",
      description: "Get personalized feedback to improve your resume",
    },
    {
      title: "JD Analysis",
      description: "Understand key requirements from job descriptions",
    },
    {
      title: "Application Insights",
      description: "Visualize your application progress with analytics",
    },
  ];

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <section className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-jobwise-dark">
              Manage Your Job Search <span className="text-jobwise-medium">Intelligently</span>
            </h1>
            <p className="text-lg text-gray-600">
              Easily manage and track all your job applications, get AI-powered resume feedback, 
              analyze job descriptions, and view insightful analytics — all in one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                size="lg" 
                className="bg-jobwise-medium hover:bg-jobwise-dark"
              >
                <Link to="/job-tracker">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                asChild
                size="lg" 
                variant="outline" 
                className="border-jobwise-medium text-jobwise-dark hover:bg-jobwise-light/50"
              >
                <Link to="/resume-feedback">
                  Try AI Resume Review
                </Link>
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-jobwise-light via-jobwise to-jobwise-medium rounded-full opacity-20 animate-pulse-slow"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full max-w-md max-h-md">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path fill="#A3A3CC" d="M45.7,-57.2C59.1,-47.4,69.9,-33.3,74.4,-17.1C78.9,-0.8,77.2,17.6,68.8,31.9C60.4,46.2,45.3,56.3,29.3,63.3C13.2,70.2,-3.9,73.9,-19.8,69.9C-35.7,65.9,-50.3,54.3,-61.8,39.3C-73.4,24.2,-81.8,5.7,-78.5,-10.5C-75.2,-26.7,-60.1,-40.6,-44.7,-50.3C-29.3,-60,-14.7,-65.5,0.7,-66.4C16,-67.3,32.1,-63.6,45.7,-55.7Z" transform="translate(100 100) scale(1.1)" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&h=600" 
                alt="Person working on laptop" 
                className="rounded-2xl object-cover w-4/5 h-4/5 shadow-2xl animate-float"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-jobwise-dark mb-4">
            Everything You Need to Land Your Dream Job
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our comprehensive set of tools helps you streamline your job search process
            from application to offer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="h-12 w-12 rounded-full bg-jobwise-light flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-jobwise-dark" />
              </div>
              <h3 className="text-xl font-bold text-jobwise-dark mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
