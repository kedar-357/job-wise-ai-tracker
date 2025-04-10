
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
import { toast } from "sonner";

// Mock data for demo purposes
const mockJobs = {
  applied: [
    { id: 1, company: "Google", role: "Frontend Engineer", pay: "$120,000 - $150,000", dateApplied: "2023-04-01", status: "applied", notes: "Applied through referral" },
    { id: 2, company: "Amazon", role: "Full Stack Developer", pay: "$130,000 - $160,000", dateApplied: "2023-04-05", status: "applied", notes: "Applied through website" },
    { id: 3, company: "Microsoft", role: "React Developer", pay: "$125,000 - $155,000", dateApplied: "2023-04-10", status: "applied", notes: "Applied through LinkedIn" },
  ],
  interview: [
    { id: 4, company: "Facebook", role: "Senior Frontend Engineer", pay: "$150,000 - $180,000", dateApplied: "2023-03-15", status: "interview", notes: "First round on April 20" },
    { id: 5, company: "Twitter", role: "UI Developer", pay: "$130,000 - $160,000", dateApplied: "2023-03-20", status: "interview", notes: "Technical interview scheduled" },
  ],
  offered: [
    { id: 6, company: "Netflix", role: "Frontend Architect", pay: "$180,000 - $210,000", dateApplied: "2023-02-10", status: "offered", notes: "Offer received, negotiating" },
  ],
  rejected: [
    { id: 7, company: "Apple", role: "JavaScript Developer", pay: "$140,000 - $170,000", dateApplied: "2023-01-05", status: "rejected", notes: "Rejected after final round" },
    { id: 8, company: "Airbnb", role: "Frontend Engineer", pay: "$135,000 - $165,000", dateApplied: "2023-01-15", status: "rejected", notes: "Position was filled" },
  ],
};

const statusTitles = {
  applied: "Applied Jobs",
  interview: "Interview Stage",
  offered: "Job Offers",
  rejected: "Rejected Applications",
};

const statusColors = {
  applied: "blue",
  interview: "amber",
  offered: "green",
  rejected: "red",
};

const JobStatusPage = () => {
  const { status } = useParams<{ status: "applied" | "interview" | "offered" | "rejected" }>();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    pay: "",
    dateApplied: new Date().toISOString().split('T')[0],
    status: status || "applied",
    notes: "",
  });

  // Safety check
  if (!status || !["applied", "interview", "offered", "rejected"].includes(status)) {
    navigate("/job-tracker");
    return null;
  }

  const jobs = mockJobs[status as keyof typeof mockJobs] || [];
  const statusTitle = statusTitles[status as keyof typeof statusTitles] || "Jobs";
  const statusColor = statusColors[status as keyof typeof statusColors] || "blue";

  const handleOpenDialog = () => {
    setFormData({
      ...formData,
      status: status || "applied",
    });
    setIsDialogOpen(true);
  };

  const handleEditJob = (job: any) => {
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
    setFormData({ ...formData, status: value });
  };

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would add the job to your database
    toast.success("Job added successfully!");
    setIsDialogOpen(false);
  };

  const handleUpdateJob = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would update the job in your database
    if (formData.status !== status) {
      toast.success(`Job moved to ${formData.status} status!`);
    } else {
      toast.success("Job updated successfully!");
    }
    setIsEditDialogOpen(false);
  };

  const handleDeleteJob = () => {
    // In a real app, you would delete the job from your database
    toast.success("Job removed successfully!");
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
          className={`bg-${statusColor}-500 hover:bg-${statusColor}-600`}
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

      {/* Add Job Dialog */}
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

      {/* Edit Job Dialog */}
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
