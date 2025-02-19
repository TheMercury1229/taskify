"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { Task } from "@/index"; // Define this interface globally
import toast from "react-hot-toast";

interface EditTaskDialogProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditTaskDialog({
  task,
  isOpen,
  onClose,
}: EditTaskDialogProps) {
  const [updatedTask, setUpdatedTask] = useState({ ...task });
  const queryClient = useQueryClient();

  const updateTaskMutation = useMutation({
    mutationFn: async () => {
      return axiosInstance.patch(`/tasks/${task.id}`, updatedTask);
    },
    onSuccess: () => {
      toast.success("Task updated successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks"] }); // Refresh task list
      onClose(); // Close the dialog
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        {/* Task Name (Read-only) */}
        <Input value={updatedTask.title} disabled className="mb-4" />

        {/* Due Date */}
        <div className="mb-4">
          <p className="text-sm mb-2">Due Date</p>
          <Calendar
            mode="single"
            className="flex items-center justify-center"
            selected={new Date(updatedTask.dueDate)}
            onSelect={(date) =>
              setUpdatedTask({
                ...updatedTask,
                dueDate: date?.toISOString() ? date.toISOString() : "",
              })
            }
          />
        </div>

        {/* Priority Selection */}
        <div className="mb-4">
          <p className="text-sm mb-2">Priority</p>
          <Select
            value={updatedTask.priority.toString()}
            onValueChange={(value) =>
              setUpdatedTask({ ...updatedTask, priority: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Low</SelectItem>
              <SelectItem value="2">Medium</SelectItem>
              <SelectItem value="3">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status Selection */}
        <div className="mb-4">
          <p className="text-sm mb-2">Status</p>
          <Select
            value={updatedTask.status}
            onValueChange={(value) =>
              setUpdatedTask({ ...updatedTask, status: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={() => updateTaskMutation.mutate()}
          disabled={updateTaskMutation.status === "pending"}
        >
          {updateTaskMutation.status === "pending"
            ? "Saving..."
            : "Save Changes"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
