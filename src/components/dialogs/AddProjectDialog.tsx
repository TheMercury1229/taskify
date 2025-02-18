"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTaskStore } from "@/store/taskStore";

export default function AddProjectDialog({ onClose }: { onClose: () => void }) {
  const [projectName, setProjectName] = useState("");
  const queryClient = useQueryClient();
  const { addProject } = useTaskStore();

  const createProjectMutation = useMutation({
    mutationFn: async () => addProject(projectName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] }); // Refresh projects
      setProjectName("");
      onClose(); // Close the dialog
    },
  });

  return (
    <div className="p-4">
      <Input
        type="text"
        placeholder="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        className="mb-4"
      />
      <Button
        className="w-full"
        onClick={() => createProjectMutation.mutate()}
        disabled={createProjectMutation.status === "pending"}
      >
        {createProjectMutation.status === "pending"
          ? "Adding..."
          : "Create Project"}
      </Button>
    </div>
  );
}
