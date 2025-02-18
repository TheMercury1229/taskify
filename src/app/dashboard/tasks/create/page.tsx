"use client";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTaskStore } from "@/store/taskStore";
import { axiosInstance } from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddCategoryDialog from "@/components/dialogs/AddCategory";
import AddProjectDialog from "@/components/dialogs/AddProjectDialog";
import { Project } from "@/index";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export default function AddTaskPage() {
  const { fetchProjects, fetchCategories, projects, categories } =
    useTaskStore();
  const queryClient = useQueryClient();
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [openProjectDialog, setOpenProjectDialog] = useState(false);
  useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetchProjects();
      return res;
    },
  });
  useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetchCategories();
      return res;
    },
  });

  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: new Date(),
    priority: "1",
    status: "pending",
    projectId: "",
    categoryId: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const createTaskMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post("/tasks", task);
      setTask({
        title: "",
        description: "",
        dueDate: new Date(),
        priority: "1",
        status: "pending",
        projectId: "",
        categoryId: "",
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] }); // Refresh task list
      toast.success("Task created successfully");
      redirect("/dashboard/tasks");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <section className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Task</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Input
            type="text"
            name="title"
            placeholder="Task Name"
            value={task.title}
            onChange={handleChange}
          />
          <Textarea
            name="description"
            placeholder="Task Description"
            value={task.description}
            onChange={handleChange}
          />
          <div className="p-4 border rounded-md">
            <Calendar
              className="flex items-center justify-center"
              mode="single"
              selected={task.dueDate}
              onSelect={(date) =>
                setTask({ ...task, dueDate: date || new Date() })
              }
            />
          </div>
        </div>

        <div className="space-y-4">
          <Select
            onValueChange={(value) => setTask({ ...task, priority: value })}
            value={task.priority}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Low</SelectItem>
              <SelectItem value="2">Medium</SelectItem>
              <SelectItem value="3">High</SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => setTask({ ...task, status: value })}
            value={task.status}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Select
              onValueChange={(value) => setTask({ ...task, projectId: value })}
              value={task.projectId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Project" />
              </SelectTrigger>
              <SelectContent>
                {projects?.map((project: Project) => (
                  <SelectItem key={project?.id} value={project?.id?.toString()}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add Project</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Project</DialogTitle>
                </DialogHeader>
                <AddProjectDialog
                  onClose={() => {
                    setOpenProjectDialog(false);
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex gap-2">
            <Select
              onValueChange={(value) => setTask({ ...task, categoryId: value })}
              value={task.categoryId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((category) => (
                  <SelectItem
                    key={category?.id}
                    value={category?.id?.toString()}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add Category</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Category</DialogTitle>
                </DialogHeader>
                <AddCategoryDialog
                  onClose={() => {
                    setOpenCategoryDialog(false);
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button
          className="w-full"
          onClick={() => createTaskMutation.mutate()}
          disabled={createTaskMutation.status === "pending"}
        >
          {createTaskMutation.status === "pending"
            ? "Creating..."
            : "Create Task"}
        </Button>
      </div>
    </section>
  );
}
