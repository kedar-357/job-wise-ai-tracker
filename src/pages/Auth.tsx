
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-jobwise-light via-jobwise to-jobwise-medium p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="glass border-jobwise-light">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-jobwise-dark">
              {isLogin ? "Welcome Back" : "Create an Account"}
            </CardTitle>
            <CardDescription className="text-center">
              {isLogin
                ? "Enter your credentials to access your account"
                : "Enter your information to create an account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                    className="border-jobwise"
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="hello@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  className="border-jobwise"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  className="border-jobwise"
                />
              </div>
              <Button type="submit" className="w-full bg-jobwise-medium hover:bg-jobwise-dark">
                {isLogin ? "Login" : "Register"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-sm text-center text-gray-500 mt-2">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <a
                href="#"
                className="text-jobwise-medium hover:text-jobwise-dark underline"
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
