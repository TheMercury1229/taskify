// app/projects/[projectId]/page.tsx
"use client";
import React from "react";
import { notFound } from "next/navigation";
import { dummyProjects, dummyTasks } from "@/data";
import { TaskList } from "@/components/dashboard/TaskList";
import CardContainer from "@/components/dashboard/CardContainer";

interface ProjectDetailPageProps {
  params: { projectId: string };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const projectId = parseInt(params.projectId);

  // Find the project by ID
  const project = dummyProjects.find((p) => p.id === projectId);
  if (!project) return notFound();

  // Filter tasks for this project
  const projectTasks = dummyTasks.filter(
    (task) => task.projectId === projectId
  );

  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">{project.name} - Tasks</h1>
      <CardContainer totalTasks={projectTasks} />
      <div className="mt-6">
        <TaskList tasks={projectTasks} />
      </div>
    </section>
  );
}
