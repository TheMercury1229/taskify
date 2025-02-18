import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { Category, Project, Task } from "@/index";

interface TaskState {
  projects: Project[];
  categories: Category[];
  tasks: Task[];
  fetchProjects: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchTasks: () => Promise<void>;
  addProject: (name: string) => Promise<Project>;
  addCategory: (name: string) => Promise<Category>;
}

export const useTaskStore = create<TaskState>((set) => ({
  projects: [],
  categories: [],
  tasks: [],

  fetchProjects: async () => {
    const res = await axiosInstance.get("/projects");
    set({ projects: res.data });
    return res.data;
  },

  fetchCategories: async () => {
    const res = await axiosInstance.get("/category");
    set({ categories: res.data });
    return res.data;
  },

  addProject: async (name) => {
    const res = await axiosInstance.post("/projects", { name });
    set((state) => ({ projects: [...state.projects, res.data] }));
    return res.data;
  },

  addCategory: async (name) => {
    const res = await axiosInstance.post("/category", { name });
    set((state) => ({ categories: [...state.categories, res.data] }));
    return res.data;
  },
  fetchTasks: async () => {
    const res = await axiosInstance.get("/tasks");
    set({ tasks: res.data });
    return res.data;
  },
}));
