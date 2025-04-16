
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-8 bg-jobwise-dark border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-jobwise-light"></div>
              <span className="text-xl font-bold text-white">JobWise</span>
            </div>
            <p className="text-white/70">
              The intelligent job application tracker that helps you land your dream job faster.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/70 hover:text-white transition-colors">Home</Link></li>
              <li><a href="/#features" className="text-white/70 hover:text-white transition-colors">Features</a></li>
              <li><a href="/#about" className="text-white/70 hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Career Tips</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="#" aria-label="Twitter" className="text-white/70 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-white/70 hover:text-white">
                <Linkedin size={20} />
              </a>
              <a href="#" aria-label="GitHub" className="text-white/70 hover:text-white">
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-white/50">
          <p>© {currentYear} JobWise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
