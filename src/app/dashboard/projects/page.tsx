"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MoreHorizontal, PlusIcon } from "lucide-react";
import { dummyProjects, dummyTasks } from "@/data";
import React from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import AddProjectDialog from "@/components/dialogs/AddProjectDialog";
import { useTaskStore } from "@/store/taskStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Project, Task } from "@/index";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";

export default function ProjectPage() {
  const { fetchProjects, fetchTasks } = useTaskStore();
  const {
    data: projects = [],
    isLoading,
    error,
  } = useQuery({ queryKey: ["projects"], queryFn: fetchProjects });
  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
  const queryClient = useQueryClient();
  const deleteProjectMutation = useMutation({
    mutationFn: async (id: number) => axiosInstance.delete(`/projects/${id}`),
    onSuccess: () => {
      toast.success("Project deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["projects"] }); // ✅ Refresh project list after deletion
    },
  });

  if (isLoading) return <p>Loading projects...</p>;
  if (error) return <p>Error loading projects</p>;
  return (
    <section className="p-4">
      <div className="flex mb-4  items-center">
        <h2 className="font-semibold text-3xl">Projects</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Card className="hover:shadow transition-shadow border-dashed">
              <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
                <PlusIcon className="size-10 mb-2" />
                <p className="text-sm font-medium">Add New Project</p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
            </DialogHeader>
            <AddProjectDialog onClose={() => {}} />
          </DialogContent>
        </Dialog>
        {projects.map((project: Project) => {
          const projectTasks = tasks.filter(
            (task: Task) => task.projectId === project.id
          );

          const pendingCount = projectTasks.filter(
            (task: Task) => task.status === "pending"
          ).length;
          const completedCount = projectTasks.filter(
            (task: Task) => task.status === "completed"
          ).length;

          return (
            <Card className="cursor-pointer transition">
              <CardHeader className="flex justify-between flex-row items-center">
                <CardTitle className="font-bold text-2xl">
                  {project.name}
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant={"ghost"} size={"sm"}>
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      className="text-red-500"
                      onClick={() => deleteProjectMutation.mutate(project.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">Pending Tasks: {pendingCount}</p>
                <p className="font-semibold">
                  Completed Tasks: {completedCount}
                </p>
              </CardContent>
              <CardFooter>
                <Link
                  key={project.id}
                  href={`/dashboard/projects/${project.id}`}
                  className="p-2 rounded-full bg-primary/30 dark:text-white text-black "
                >
                  View Project
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
