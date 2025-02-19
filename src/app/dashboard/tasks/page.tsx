"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskList } from "@/components/dashboard/TaskList";
import { PlusCircle, X } from "lucide-react";
import Link from "next/link";
import { useTaskStore } from "@/store/taskStore";
import { useQuery } from "@tanstack/react-query";
import { Category, Project, Task } from "@/index";

export default function TasksPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { fetchTasks, fetchProjects, fetchCategories } = useTaskStore();

  // ✅ Fetch tasks, projects, and categories using React Query
  const { data: tasks = [], isLoading: tasksLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (tasksLoading || projectsLoading || categoriesLoading)
    return <p>Loading data...</p>;

  const formattedTasks = tasks.map((task: Task) => {
    const category: Category | undefined = categories.find(
      (c: Category) => c.id === task.categoryId
    ) as Category | undefined;
    const project: Project | undefined = projects.find(
      (p: Project) => p.id === task.projectId
    ) as Project | undefined;
    if (category === undefined || project === undefined) return task;
    // Add type guards to ensure project and category are not undefined
    if (!project || !category) {
      return task;
    }
    const projectName = project?.name ?? "Unknown Project";
    const categoryName = category?.name ?? "Unknown Category";

    return {
      ...task,
      categoryName,
      projectName,
    };
  });

  const filteredTasks = formattedTasks.filter((task: Task) => {
    return (
      (!selectedCategory || task?.categoryName === selectedCategory) &&
      (!selectedProject ||
        (task?.projectName?.toLowerCase() === selectedProject?.toLowerCase() &&
          (searchTerm === "" ||
            task?.title.toLowerCase().includes(searchTerm.toLowerCase()))))
    );
  });

  return (
    <section className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Tasks</h1>
        <Link href="/dashboard/tasks/create" passHref>
          <Button size={"lg"} className="flex items-center gap-2">
            <PlusCircle />
            Add Task
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        {/* Search Bar */}
        <Input
          type="text"
          placeholder="Search Tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3"
        />

        {/* Category Filter */}
        <Select
          onValueChange={(value) =>
            setSelectedCategory(value === "all" ? null : value)
          }
          value={selectedCategory || undefined}
        >
          <SelectTrigger className="w-1/4">
            <SelectValue placeholder="Filter by Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {categories.map((category: Category) => (
              <SelectItem key={category?.id} value={category?.name}>
                {category?.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Project Filter */}
        <Select
          onValueChange={(value) =>
            setSelectedProject(value === "all" ? null : value)
          }
          value={selectedProject || undefined}
        >
          <SelectTrigger className="w-1/4">
            <SelectValue placeholder="Filter by Project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {projects.map((project: Project) => (
              <SelectItem key={project.id} value={project.name}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Display Selected Filters with "X" Button */}
      <div className="flex gap-2 mb-4">
        {selectedCategory && (
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setSelectedCategory(null)}
          >
            {selectedCategory} <X size={14} />
          </Button>
        )}
        {selectedProject && (
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setSelectedProject(null)}
          >
            {selectedProject} <X size={14} />
          </Button>
        )}
        {searchTerm && (
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setSearchTerm("")}
          >
            Clear Search <X size={14} />
          </Button>
        )}
      </div>

      {/* Task List */}
      <TaskList tasks={filteredTasks} />
    </section>
  );
}
