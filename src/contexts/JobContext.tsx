
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export type JobStatus = "applied" | "interview" | "offered" | "rejected";

export interface Job {
  id: number;
  company: string;
  role: string;
  pay: string;
  dateApplied: string;
  status: JobStatus;
  notes: string;
}

interface JobContextType {
  jobs: Job[];
  addJob: (job: Omit<Job, "id">) => void;
  updateJob: (job: Job) => void;
  deleteJob: (id: number) => void;
  getJobsByStatus: (status: JobStatus) => Job[];
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
};

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  // Load jobs from localStorage on mount
  useEffect(() => {
    const storedJobs = localStorage.getItem("jobwiseJobs");
    if (storedJobs) {
      try {
        setJobs(JSON.parse(storedJobs));
      } catch (e) {
        console.error("Failed to parse jobs from localStorage", e);
        // If parsing fails, initialize with empty array
        setJobs([]);
      }
    }
  }, []);

  // Save jobs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("jobwiseJobs", JSON.stringify(jobs));
  }, [jobs]);

  // Add a new job
  const addJob = (jobData: Omit<Job, "id">) => {
    const newJob: Job = {
      ...jobData,
      id: Date.now(), // Use timestamp as a simple unique ID
    };
    
    setJobs((prevJobs) => [...prevJobs, newJob]);
    toast.success("Job added successfully!");
  };

  // Update an existing job
  const updateJob = (updatedJob: Job) => {
    setJobs((prevJobs) => 
      prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    );
    toast.success("Job updated successfully!");
  };

  // Delete a job
  const deleteJob = (id: number) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
    toast.success("Job removed successfully!");
  };

  // Get jobs by status
  const getJobsByStatus = (status: JobStatus) => {
    return jobs.filter((job) => job.status === status);
  };

  const value = {
    jobs,
    addJob,
    updateJob,
    deleteJob,
    getJobsByStatus,
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};

