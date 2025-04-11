
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Plus, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { useJobs } from "@/contexts/JobContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import JobAddModal from "@/components/JobAddModal";
import { useState } from "react";

const Home = () => {
  const { jobs } = useJobs();
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Get 5 most recent jobs
  const recentJobs = [...jobs]
    .sort((a, b) => new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime())
    .slice(0, 5);

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

  const openAddModal = () => setAddModalOpen(true);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <section className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-jobwise-dark dark:text-white">
              Manage Your Job Search <span className="text-jobwise-medium dark:text-jobwise-light">Intelligently</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Easily manage and track all your job applications, get AI-powered resume feedback, 
              analyze job descriptions, and view insightful analytics — all in one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                size="lg" 
                className="bg-jobwise-medium hover:bg-jobwise-dark dark:bg-jobwise-dark dark:hover:bg-jobwise-medium"
              >
                <Link to="/job-tracker">
                  Browse Job Tracker
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-jobwise-medium text-jobwise-dark hover:bg-jobwise-light/50 dark:text-jobwise-light dark:border-jobwise-light dark:hover:bg-jobwise-dark/50"
                onClick={openAddModal}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add New Job
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-jobwise-light via-jobwise to-jobwise-medium rounded-full opacity-20 animate-pulse-slow dark:opacity-10"></div>
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

      {/* Recent Applications Section */}
      <motion.section 
        className="py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-jobwise-dark dark:text-white">Recent Applications</h2>
          <Button 
            asChild
            variant="ghost" 
            className="text-jobwise-medium hover:text-jobwise-dark dark:text-jobwise-light dark:hover:text-white"
          >
            <Link to="/job-tracker">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {recentJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentJobs.map((job) => (
              <motion.div
                key={job.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full glass-card border-jobwise-light/50 hover:border-jobwise dark:bg-jobwise-dark/60 dark:border-jobwise-medium/30 dark:hover:border-jobwise-medium">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex justify-between items-start">
                      <span className="text-jobwise-dark dark:text-white">{job.company}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        job.status === 'applied' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200' :
                        job.status === 'interview' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200' :
                        job.status === 'offered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
                      }`}>
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-jobwise-dark font-medium dark:text-white">{job.role}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{job.pay}</p>
                    <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                      Applied {formatDistanceToNow(new Date(job.dateApplied), { addSuffix: true })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="glass-card border-jobwise-light dark:bg-jobwise-dark/60 dark:border-jobwise-medium/30">
            <CardContent className="p-6 text-center">
              <Briefcase className="mx-auto h-12 w-12 text-jobwise-medium/50 mb-4 dark:text-jobwise-light/50" />
              <h3 className="text-lg font-medium text-jobwise-dark mb-2 dark:text-white">No applications yet</h3>
              <p className="text-gray-500 mb-4 dark:text-gray-400">Start tracking your job applications to see them here</p>
              <Button 
                onClick={openAddModal}
                className="bg-jobwise-medium hover:bg-jobwise-dark dark:bg-jobwise-dark dark:hover:bg-jobwise-medium"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Job
              </Button>
            </CardContent>
          </Card>
        )}
      </motion.section>

      {/* Features Section */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-jobwise-dark mb-4 dark:text-white">
            Everything You Need to Land Your Dream Job
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-gray-300">
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
              className="glass-card rounded-xl p-6 dark:bg-jobwise-dark/60 dark:border-jobwise-medium/30"
            >
              <div className="h-12 w-12 rounded-full bg-jobwise-light flex items-center justify-center mb-4 dark:bg-jobwise-medium/30">
                <CheckCircle className="h-6 w-6 text-jobwise-dark dark:text-white" />
              </div>
              <h3 className="text-xl font-bold text-jobwise-dark mb-2 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Job Add Modal */}
      <JobAddModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} />
    </div>
  );
};

export default Home;
