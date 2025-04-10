
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, Trash2, Edit } from "lucide-react";
import { useJobs, JobStatus, Job } from "@/contexts/JobContext";

const JobStatusPage = () => {
  const { status } = useParams<{ status: string }>();
  const navigate = useNavigate();
  const { getJobsByStatus, addJob, updateJob, deleteJob } = useJobs();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    pay: "",
    dateApplied: new Date().toISOString().split('T')[0],
    status: (status || "applied") as JobStatus,
    notes: "",
  });

  if (!status || !["applied", "interview", "offered", "rejected"].includes(status)) {
    navigate("/job-tracker");
    return null;
  }

  const validStatus = status as JobStatus;
  const jobs = getJobsByStatus(validStatus);
  const statusTitle = {
    applied: "Applied Jobs",
    interview: "Interview Stage",
    offered: "Job Offers",
    rejected: "Rejected Applications",
  }[validStatus] || "Jobs";

  const handleOpenDialog = () => {
    setFormData({
      company: "",
      role: "",
      pay: "",
      dateApplied: new Date().toISOString().split('T')[0],
      status: validStatus,
      notes: "",
    });
    setIsDialogOpen(true);
  };

  const handleEditJob = (job: Job) => {
    setSelectedJob(job);
    setFormData({
      company: job.company,
      role: job.role,
      pay: job.pay,
      dateApplied: job.dateApplied,
      status: job.status,
      notes: job.notes,
    });
    setIsEditDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStatusChange = (value: string) => {
    setFormData({ ...formData, status: value as JobStatus });
  };

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    addJob(formData);
    setIsDialogOpen(false);
  };

  const handleUpdateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedJob) {
      const updatedJob = { ...formData, id: selectedJob.id };
      updateJob(updatedJob);
      
      // If status changed, navigate to the new status page
      if (formData.status !== status) {
        navigate(`/job-tracker/${formData.status}`);
      }
    }
    setIsEditDialogOpen(false);
  };

  const handleDeleteJob = () => {
    if (selectedJob) {
      deleteJob(selectedJob.id);
    }
    setIsEditDialogOpen(false);
  };

  const getBgGradient = () => {
    switch (status) {
      case "applied": return "from-blue-400/10 to-blue-500/5";
      case "interview": return "from-amber-400/10 to-amber-500/5";
      case "offered": return "from-green-400/10 to-green-500/5";
      case "rejected": return "from-red-400/10 to-red-500/5";
      default: return "from-blue-400/10 to-blue-500/5";
    }
  };

  return (
    <div className={`container mx-auto max-w-6xl px-4 py-8 bg-gradient-to-br ${getBgGradient()} rounded-3xl`}>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-jobwise-dark">{statusTitle}</h1>
          <p className="text-gray-600">
            Manage jobs in the {status} stage
          </p>
        </div>
        <Button 
          onClick={handleOpenDialog}
          className={`bg-${status === "applied" ? "blue" : status === "interview" ? "amber" : status === "offered" ? "green" : "red"}-500 hover:bg-${status === "applied" ? "blue" : status === "interview" ? "amber" : status === "offered" ? "green" : "red"}-600`}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Job
        </Button>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl text-gray-600 mb-4">No jobs in this category yet</h3>
          <Button onClick={handleOpenDialog}>Add Your First Job</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6 overflow-x-auto">
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="min-w-[300px]"
            >
              <Card 
                className="h-full overflow-hidden glass-card hover:shadow-xl transition-all cursor-pointer"
                onClick={() => handleEditJob(job)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-jobwise-dark line-clamp-1">{job.company}</h3>
                      <p className="text-jobwise-medium font-medium">{job.role}</p>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600 flex-grow">
                      <p><span className="font-medium">Salary:</span> {job.pay}</p>
                      <p><span className="font-medium">Applied:</span> {new Date(job.dateApplied).toLocaleDateString()}</p>
                      {job.notes && (
                        <p className="line-clamp-2"><span className="font-medium">Notes:</span> {job.notes}</p>
                      )}
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-jobwise-medium hover:text-jobwise-dark hover:bg-jobwise-light/50"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditJob(job);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Job</DialogTitle>
            <DialogDescription>
              Enter the details of the job you've applied for.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddJob}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Company name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="Job title"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pay">Salary Range</Label>
                <Input
                  id="pay"
                  name="pay"
                  value={formData.pay}
                  onChange={handleInputChange}
                  placeholder="e.g. $80,000 - $100,000"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dateApplied">Date Applied</Label>
                <Input
                  id="dateApplied"
                  name="dateApplied"
                  type="date"
                  value={formData.dateApplied}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="offered">Offered</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Add any relevant notes about this application"
                  className="min-h-[80px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Job</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Job</DialogTitle>
            <DialogDescription>
              Update the details of this job application.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateJob}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-company">Company</Label>
                <Input
                  id="edit-company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Company name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-role">Role</Label>
                <Input
                  id="edit-role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="Job title"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-pay">Salary Range</Label>
                <Input
                  id="edit-pay"
                  name="pay"
                  value={formData.pay}
                  onChange={handleInputChange}
                  placeholder="e.g. $80,000 - $100,000"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-dateApplied">Date Applied</Label>
                <Input
                  id="edit-dateApplied"
                  name="dateApplied"
                  type="date"
                  value={formData.dateApplied}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="offered">Offered</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-notes">Notes</Label>
                <Textarea
                  id="edit-notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Add any relevant notes about this application"
                  className="min-h-[80px]"
                />
              </div>
            </div>
            <DialogFooter className="flex items-center justify-between">
              <Button 
                type="button" 
                variant="destructive" 
                onClick={handleDeleteJob}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Remove
              </Button>
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Update</Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobStatusPage;
