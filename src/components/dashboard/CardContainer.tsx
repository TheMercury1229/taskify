import React from "react";
import { dummyTasks } from "@/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Task } from "@/index";

const CardContainer = ({ totalTasks }: { totalTasks: Task[] }) => {
  const pendingTasks = totalTasks.filter(
    (t: Task) => t.status === "pending"
  ).length;
  const completedTasks = totalTasks.filter(
    (t: Task) => t.status === "completed"
  ).length;
  const inprogressTasks = totalTasks.filter(
    (t: Task) => t.status === "in-progress"
  ).length;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Tasks</CardTitle>
        </CardHeader>
        <CardContent className="text-4xl font-semibold">
          {totalTasks.length}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pending Tasks</CardTitle>
        </CardHeader>
        <CardContent className="text-4xl font-semibold">
          {pendingTasks}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Completed Tasks</CardTitle>
        </CardHeader>
        <CardContent className="text-4xl font-semibold">
          {completedTasks}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>In Progress Tasks</CardTitle>
        </CardHeader>
        <CardContent className="text-4xl font-semibold">
          {inprogressTasks}
        </CardContent>
      </Card>
    </div>
  );
};

export default CardContainer;
