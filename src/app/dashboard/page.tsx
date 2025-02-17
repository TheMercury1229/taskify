"use client";
import React, { useState } from "react";
import { dummyTasks } from "@/data";
import CardContainer from "@/components/dashboard/CardContainer";
import { CalendarView } from "@/components/dashboard/CalendarView";
import { format } from "date-fns";

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Format selected date
  const formattedDate = format(selectedDate, "yyyy-MM-dd");

  // Filter tasks for the selected date
  const tasksForDate = dummyTasks.filter(
    (task) =>
      task.dueDate &&
      format(new Date(task.dueDate), "yyyy-MM-dd") === formattedDate
  );

  return (
    <section className="p-3">
      <div className="mb-4">
        <h2 className="text-3xl font-semibold">Dashboard</h2>
      </div>
      <CardContainer totalTasks={dummyTasks} />
      <div className="my-4">
        <h3 className="text-2xl font-semibold">Tasks</h3>
      </div>
      <CalendarView
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        tasksForDate={tasksForDate}
      />
    </section>
  );
}
