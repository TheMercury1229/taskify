"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { formatDate } from "date-fns";

interface Task {
  id: number;
  title: string;
  projectName?: string;

  categoryName?: string;
  dueDate: string;
}

export const TaskList = ({ tasks }: { tasks: Task[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox />
          </TableHead>
          <TableHead>Task Name</TableHead>
          <TableHead>Project</TableHead>
          <TableHead className="hidden md:inline-block">Category</TableHead>
          <TableHead className="hidden md:inline-block">Due Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-4">
              No tasks found.
            </TableCell>
          </TableRow>
        ) : (
          tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.projectName || "—"}</TableCell>
              <TableCell className="hidden md:inline-block">
                {task.categoryName || "—"}
              </TableCell>
              <TableCell className="hidden md:inline-block">
                {formatDate(task.dueDate, "MMM dd yyyy")}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical size={18} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View Task</DropdownMenuItem>
                    <DropdownMenuItem>Edit Task</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
