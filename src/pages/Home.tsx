
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Plus, Briefcase, Sparkles, Zap, Star } from "lucide-react";
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
      icon: <CheckCircle className="h-6 w-6 text-jobwise-dark dark:text-white" />,
    },
    {
      title: "AI Resume Feedback",
      description: "Get personalized feedback to improve your resume",
      icon: <Sparkles className="h-6 w-6 text-jobwise-dark dark:text-white" />,
    },
    {
      title: "JD Analysis",
      description: "Understand key requirements from job descriptions",
      icon: <Zap className="h-6 w-6 text-jobwise-dark dark:text-white" />,
    },
    {
      title: "Application Insights",
      description: "Visualize your application progress with analytics",
      icon: <Star className="h-6 w-6 text-jobwise-dark dark:text-white" />,
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
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Manage Your Job Search <span className="text-jobwise-light">Intelligently</span>
            </h1>
            <p className="text-lg text-white">
              Easily manage and track all your job applications, get AI-powered resume feedback, 
              analyze job descriptions, and view insightful analytics — all in one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                size="lg" 
                className="bg-black hover:bg-jobwise-dark dark:bg-black dark:hover:bg-jobwise-medium text-white border border-white/20"
              >
                <Link to="/job-tracker">
                  Browse Job Tracker
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-jobwise-medium text-white hover:bg-jobwise-light/20 dark:text-white dark:border-white/20 dark:hover:bg-jobwise-dark/50"
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
            className="relative perspective-500"
          >
            {/* Enhanced 3D Animated Background */}
            <motion.div 
              animate={{ 
                rotateY: [0, -10, 0, 10, 0],
                rotateX: [0, 10, 0, -10, 0] 
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="transform-3d"
            >
              <div className="aspect-square max-w-md mx-auto relative overflow-hidden rounded-2xl shadow-2xl border border-white/20">
                <div className="absolute inset-0 bg-gradient-to-br from-jobwise-light via-jobwise to-jobwise-medium opacity-30"></div>
                
                {/* Enhanced floating particles with glow effect */}
                {Array.from({ length: 15 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: Math.random() * 8 + 2,
                      height: Math.random() * 8 + 2,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      background: i % 3 === 0 
                        ? "rgba(255, 255, 255, 0.8)" 
                        : i % 3 === 1 
                          ? "rgba(155, 135, 245, 0.8)"
                          : "rgba(126, 105, 171, 0.8)",
                      boxShadow: "0 0 8px rgba(255, 255, 255, 0.6)"
                    }}
                    animate={{
                      y: [0, Math.random() * 60 - 30],
                      x: [0, Math.random() * 40 - 20],
                      opacity: [0.2, 0.8, 0.2],
                      scale: [1, Math.random() * 0.5 + 1, 1]
                    }}
                    transition={{
                      duration: Math.random() * 10 + 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
                
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&h=600" 
                  alt="Person working on laptop" 
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl mix-blend-overlay opacity-90"
                />
                
                {/* Enhanced overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-jobwise-dark/50 to-transparent"></div>
                
                {/* Enhanced Floating UI elements */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-md p-4 rounded-lg border border-white/20 shadow-lg"
                >
                  <div className="w-20 h-3 bg-jobwise-light/50 rounded-full mb-2"></div>
                  <div className="w-16 h-3 bg-jobwise-light/30 rounded-full"></div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="absolute bottom-1/3 right-1/4 transform translate-x-1/2 translate-y-1/2 bg-black/50 backdrop-blur-md p-4 rounded-lg border border-white/20 shadow-lg"
                >
                  <div className="w-24 h-3 bg-jobwise-light/50 rounded-full mb-2"></div>
                  <div className="w-20 h-3 bg-jobwise-light/30 rounded-full"></div>
                </motion.div>
                
                <motion.div
                  animate={{ 
                    y: [0, -10, 0, 10, 0],
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-lg"
                >
                  <span className="text-white font-semibold flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-jobwise-light" />
                    JobWise AI
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Recent Applications Section with Enhanced UI */}
      <motion.section 
        className="py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Recent Applications</h2>
          <Button 
            asChild
            variant="ghost" 
            className="text-jobwise-light hover:text-white"
          >
            <Link to="/job-tracker">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {recentJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="h-full glass-card border-jobwise-light/50 hover:border-jobwise dark:bg-black dark:border-white/20 dark:hover:border-jobwise-medium transition-all duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex justify-between items-start">
                      <span className="text-white">{job.company}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        job.status === 'applied' ? 'bg-blue-900/30 text-blue-200 border border-blue-500/30' :
                        job.status === 'interview' ? 'bg-yellow-900/30 text-yellow-200 border border-yellow-500/30' :
                        job.status === 'offered' ? 'bg-green-900/30 text-green-200 border border-green-500/30' :
                        'bg-red-900/30 text-red-200 border border-red-500/30'
                      }`}>
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white font-medium">{job.role}</p>
                    <p className="text-sm text-white/70">{job.pay}</p>
                    <div className="mt-3 text-xs text-white/70 flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-jobwise-light mr-2"></div>
                      Applied {formatDistanceToNow(new Date(job.dateApplied), { addSuffix: true })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="glass-card border-jobwise-light dark:bg-black dark:border-white/20">
            <CardContent className="p-6 text-center">
              <Briefcase className="mx-auto h-12 w-12 text-jobwise-light/50 mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No applications yet</h3>
              <p className="text-white/70 mb-4">Start tracking your job applications to see them here</p>
              <Button 
                onClick={openAddModal}
                className="bg-black hover:bg-jobwise-dark text-white border border-white/20"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Job
              </Button>
            </CardContent>
          </Card>
        )}
      </motion.section>

      {/* Features Section with Enhanced UI */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Everything You Need to Land Your Dream Job
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto">
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
              whileHover={{ 
                y: -5,
                boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
                transition: { duration: 0.2 }
              }}
              className="glass-card rounded-xl p-6 dark:bg-black dark:border-white/20 hover:border-jobwise-light/30 transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-full bg-jobwise-light/10 flex items-center justify-center mb-4 dark:bg-jobwise-medium/30 border border-white/10">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white">
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
