"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTaskStore } from "@/store/taskStore";

export default function AddCategoryDialog({
  onClose,
}: {
  onClose: () => void;
}) {
  const [categoryName, setCategoryName] = useState("");
  const queryClient = useQueryClient();
  const { addCategory } = useTaskStore();

  const createCategoryMutation = useMutation({
    mutationFn: async () => addCategory(categoryName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] }); // Refresh categories
      setCategoryName("");
      onClose(); // Close the dialog
    },
  });

  return (
    <div className="p-4">
      <Input
        type="text"
        placeholder="Category Name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        className="mb-4"
      />
      <Button
        className="w-full"
        onClick={() => createCategoryMutation.mutate()}
        disabled={createCategoryMutation.status === "pending"}
      >
        {createCategoryMutation.status === "pending"
          ? "Adding..."
          : "Create Category"}
      </Button>
    </div>
  );
}
