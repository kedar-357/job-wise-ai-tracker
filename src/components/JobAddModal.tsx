
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useJobs, JobStatus } from "@/contexts/JobContext";
import { useNavigate } from "react-router-dom";

interface JobAddModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const JobAddModal = ({ isOpen, onClose }: JobAddModalProps) => {
  const { addJob } = useJobs();
  const navigate = useNavigate();
  
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [pay, setPay] = useState("");
  const [dateApplied, setDateApplied] = useState(new Date().toISOString().split("T")[0]);
  const [status, setStatus] = useState<JobStatus>("applied");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addJob({
      company,
      role,
      pay,
      dateApplied,
      status,
      notes
    });
    
    // Reset form
    setCompany("");
    setRole("");
    setPay("");
    setDateApplied(new Date().toISOString().split("T")[0]);
    setStatus("applied");
    setNotes("");
    
    // Close modal
    onClose();
    
    // Navigate to the appropriate status page
    navigate(`/job-tracker/${status}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md glass dark:bg-jobwise-dark/90">
        <DialogHeader>
          <DialogTitle className="text-jobwise-dark dark:text-white">Add New Job Application</DialogTitle>
          <DialogDescription className="dark:text-gray-300">
            Fill in the details of your job application
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company" className="dark:text-white">Company</Label>
            <Input 
              id="company" 
              placeholder="Company name" 
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              className="dark:bg-jobwise-dark/70 dark:border-jobwise-medium/30 dark:text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role" className="dark:text-white">Role</Label>
            <Input 
              id="role" 
              placeholder="Job title/position" 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="dark:bg-jobwise-dark/70 dark:border-jobwise-medium/30 dark:text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pay" className="dark:text-white">Compensation</Label>
            <Input 
              id="pay" 
              placeholder="Salary or hourly rate" 
              value={pay}
              onChange={(e) => setPay(e.target.value)}
              className="dark:bg-jobwise-dark/70 dark:border-jobwise-medium/30 dark:text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date" className="dark:text-white">Date Applied</Label>
            <Input 
              id="date" 
              type="date" 
              value={dateApplied}
              onChange={(e) => setDateApplied(e.target.value)}
              required
              className="dark:bg-jobwise-dark/70 dark:border-jobwise-medium/30 dark:text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status" className="dark:text-white">Status</Label>
            <Select 
              value={status} 
              onValueChange={(value) => setStatus(value as JobStatus)}
            >
              <SelectTrigger className="dark:bg-jobwise-dark/70 dark:border-jobwise-medium/30 dark:text-white">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="dark:bg-jobwise-dark dark:border-jobwise-medium/30">
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="offered">Offered</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes" className="dark:text-white">Notes</Label>
            <Textarea 
              id="notes" 
              placeholder="Additional notes about the application" 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="dark:bg-jobwise-dark/70 dark:border-jobwise-medium/30 dark:text-white"
            />
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="dark:border-jobwise-medium/50 dark:text-white dark:hover:bg-jobwise-dark"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-jobwise-medium hover:bg-jobwise-dark dark:bg-jobwise-dark dark:hover:bg-jobwise-medium"
            >
              Add Job
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JobAddModal;
