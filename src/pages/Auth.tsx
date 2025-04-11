
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ThemeToggle from "@/components/ThemeToggle";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For demo purposes, just navigate to home
    toast.success(isLogin ? "Logged in successfully!" : "Registered successfully!");
    navigate("/home");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-jobwise-light via-jobwise to-jobwise-medium p-4 dark:from-jobwise-dark dark:via-gray-900 dark:to-black">
      <div className="absolute top-4 right-4">
        <ThemeToggle className="bg-white/20 text-white hover:bg-white/30 hover:text-white" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="glass border-jobwise-light dark:bg-jobwise-dark/70 dark:border-jobwise-medium/30">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-jobwise-dark dark:text-white">
              {isLogin ? "Welcome Back" : "Create an Account"}
            </CardTitle>
            <CardDescription className="text-center dark:text-gray-300">
              {isLogin
                ? "Enter your credentials to access your account"
                : "Enter your information to create an account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="dark:text-white">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                    className="border-jobwise dark:bg-jobwise-dark/50 dark:border-jobwise-medium/30 dark:text-white"
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email" className="dark:text-white">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="hello@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  className="border-jobwise dark:bg-jobwise-dark/50 dark:border-jobwise-medium/30 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="dark:text-white">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  className="border-jobwise dark:bg-jobwise-dark/50 dark:border-jobwise-medium/30 dark:text-white"
                />
              </div>
              <Button type="submit" className="w-full bg-jobwise-medium hover:bg-jobwise-dark text-white dark:bg-jobwise-dark dark:hover:bg-jobwise-medium">
                {isLogin ? "Login" : "Register"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-sm text-center text-gray-500 mt-2 dark:text-gray-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <a
                href="#"
                className="text-jobwise-medium hover:text-jobwise-dark underline dark:text-jobwise-light dark:hover:text-white"
                onClick={(e) => {
                  e.preventDefault();
                  setIsLogin(!isLogin);
                }}
              >
                {isLogin ? "Register" : "Login"}
              </a>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Auth;
