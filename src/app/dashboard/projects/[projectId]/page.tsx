"use client";
import React from "react";
import { useParams, notFound } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useTaskStore } from "@/store/taskStore";
import { TaskList } from "@/components/dashboard/TaskList";
import CardContainer from "@/components/dashboard/CardContainer";
import { Category, Project, Task } from "@/index";

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = parseInt(params?.projectId as string);
  if (isNaN(projectId)) return notFound();

  const { fetchProjects, fetchTasks, fetchCategories } = useTaskStore();

  // ✅ Always call hooks at the top level
  const { data: projects = [] } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const project = projects.find((p: Project) => p.id === projectId) as
    | Project
    | undefined;
  if (!project) return notFound(); // ✅ Ensure `notFound()` is not inside a hook call

  const projectTasks = tasks.filter(
    (task: Task) => task.projectId === projectId
  );
  const formattedTasks = projectTasks.map((task: Task) => {
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

  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">{project?.name} - Tasks</h1>
      <CardContainer totalTasks={formattedTasks} />
      <div className="mt-6">
        <TaskList tasks={formattedTasks} />
      </div>
    </section>
  );
}
