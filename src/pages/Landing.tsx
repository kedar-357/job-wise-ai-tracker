
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const Landing = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-jobwise-dark via-[#292966] to-black text-white overflow-hidden relative">
      {/* 3D Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-[15%] right-[10%] w-32 h-32 rounded-2xl bg-jobwise-light/30 backdrop-blur-md transform rotate-12"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-[25%] right-[25%] w-24 h-24 rounded-full bg-jobwise/20 backdrop-blur-md"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute top-[40%] right-[15%] w-16 h-16 rounded-md bg-jobwise-medium/40 backdrop-blur-md transform -rotate-12"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute top-[35%] right-[30%] w-20 h-20 rounded-full border-4 border-jobwise-light/20 backdrop-blur-md"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute top-[50%] right-[20%] w-12 h-12 rounded-sm bg-jobwise-medium/30 backdrop-blur-md transform rotate-45"
        />
      </div>

      {/* Navbar */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-jobwise-light"></div>
            <span className="text-xl font-bold">JobWise</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="hover:text-jobwise-light transition-colors">Features</a>
            <a href="#benefits" className="hover:text-jobwise-light transition-colors">Benefits</a>
            <a href="#about" className="hover:text-jobwise-light transition-colors">About</a>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle className="bg-white/10 border border-white/20 text-white hover:bg-white/20" />
            <Link to="/auth">
              <Button variant="link" className="text-white hover:text-jobwise-light">
                Log in
              </Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-white text-jobwise-dark hover:bg-jobwise-light hover:text-jobwise-dark rounded-full px-5">
                Try for free
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 pt-12 md:pt-24 pb-24 relative z-10">
        <div className="max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl font-bold leading-tight mb-4"
          >
            The new
            <span className="block">Job Search AI</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-white/80 mb-8 max-w-2xl"
          >
            A next-generation job search platform that intelligently manages your applications, 
            provides AI-powered resume feedback, and helps you land your dream job.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/auth">
              <Button className="bg-jobwise-medium hover:bg-jobwise text-white rounded-full px-6 py-6">
                Start tracking
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-6 py-6">
              <Play className="mr-2 h-4 w-4" />
              Watch demo
            </Button>
          </motion.div>
        </div>
      </main>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default Landing;
