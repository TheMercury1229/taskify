import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { dummyProjects, dummyTasks } from "@/data";
import React from "react";
import Link from "next/link";

export default function ProjectPage() {
  return (
    <section className="p-4">
      <div className="flex mb-4  items-center">
        <h2 className="font-semibold text-3xl">Projects</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="hover:shadow transition-shadow border-dashed">
          <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
            <PlusIcon className="size-10 mb-2" />
            <p className="text-sm font-medium">Add New Project</p>
          </CardContent>
        </Card>
        {dummyProjects.map((project) => {
          // Get tasks for this project
          const projectTasks = dummyTasks.filter(
            (task) => task.projectId === project.id
          );
          const pendingCount = projectTasks.filter(
            (task) => task.status === "pending"
          ).length;
          const completedCount = projectTasks.filter(
            (task) => task.status === "completed"
          ).length;

          return (
            <Link key={project.id} href={`/dashboard/projects/${project.id}`}>
              <Card className="cursor-pointer transition">
                <CardHeader>
                  <CardTitle className="font-bold text-2xl">
                    {project.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">Pending Tasks: {pendingCount}</p>
                  <p className="font-semibold">
                    Completed Tasks: {completedCount}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
