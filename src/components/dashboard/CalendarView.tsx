"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Task } from "@/index"; // Make sure Task type is correctly imported
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CalendarViewProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  tasksForDate: Task[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  selectedDate,
  setSelectedDate,
  tasksForDate,
}) => {
  const formattedDate = format(selectedDate, "MMM dd, yyyy");

  return (
    <div className="grid  md:grid-cols-3 mt-4 gap-6">
      {/* 📅 Left: Calendar */}
      <div className="col-span-2 md:col-span-1">
        <Card className="h-[300px]">
          <CardContent className="flex justify-center items-center">
            <Calendar
              className="h-[300px]"
              mode="single"
              selected={selectedDate}
              onSelect={(date) => setSelectedDate(date || new Date())}
            />
          </CardContent>
        </Card>
      </div>

      {/* 📋 Right: Task List for Selected Date */}
      <div className="col-span-2">
        <Card className="max-h-[300px] overflow-y-auto">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Tasks for {formattedDate}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {tasksForDate.length === 0 ? (
              <p className="text-muted-foreground text-center">
                No tasks scheduled for this date.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasksForDate.map((task: Task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.title}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full
                            ${
                              task?.priority == "1"
                                ? "text-green-500 bg-green-500/10"
                                : task.priority == "2"
                                ? "text-orange-500 bg-orange-500/10"
                                : "text-red-500 bg-red-500/10"
                            }`}
                        >
                          {task.priority === "1"
                            ? "Low"
                            : task.priority === "2"
                            ? "Medium"
                            : "High"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`
                            px-2 py-1 rounded-full
                            ${
                              task.status === "pending"
                                ? "text-yellow-500 bg-yellow-500/10"
                                : task.status === "in-progress"
                                ? "text-blue-500 bg-blue-500/10"
                                : "text-violet-500 bg-violet-500/10"
                            }
                          `}
                        >
                          {task.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
