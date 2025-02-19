"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTaskStore } from "@/store/taskStore";
import CardContainer from "@/components/dashboard/CardContainer";
import { CalendarView } from "@/components/dashboard/CalendarView";
import { format } from "date-fns";
import { Task } from "@/index";

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const formattedDate = format(selectedDate, "yyyy-MM-dd");

  const { fetchTasks } = useTaskStore();
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  if (isLoading) return <p>Loading tasks...</p>;

  // ✅ Filter tasks based on selected date
  const tasksForDate = tasks.filter(
    (task: Task) =>
      task.dueDate &&
      format(new Date(task.dueDate), "yyyy-MM-dd") === formattedDate
  );

  return (
    <section className="p-3">
      <div className="mb-4">
        <h2 className="text-3xl font-semibold">Dashboard</h2>
      </div>

      {/* ✅ Show total tasks */}
      <CardContainer totalTasks={tasks} />

      <div className="my-4">
        <h3 className="text-2xl font-semibold">Tasks</h3>
      </div>

      {/* ✅ Show Calendar with filtered tasks */}
      <CalendarView
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        tasksForDate={tasksForDate}
      />
    </section>
  );
}
