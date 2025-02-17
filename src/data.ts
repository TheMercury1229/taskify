import { BookCheck, FolderKanban, HomeIcon } from "lucide-react";

export const navLinks = [
  { name: "Home", href: "/dashboard", Icon: HomeIcon },
  { name: "Tasks", href: "/dashboard/tasks", Icon: BookCheck },
  { name: "Projects", href: "/dashboard/projects", Icon: FolderKanban },
];

export const dummyProjects = [
  { id: 1, name: "Work" },
  { id: 2, name: "Personal" },
  { id: 3, name: "Side Project" },
];

export const dummyCategories = [
  { id: 1, name: "Urgent" },
  { id: 2, name: "Routine" },
  { id: 3, name: "Optional" },
];

export const dummyTasks = [
  {
    id: 1,
    title: "Finish UI for Dashboard",
    description: "Design the dashboard UI using ShadCN.",
    priority: 2, // 1 = Low, 2 = Medium, 3 = High
    status: "in-progress",
    projectId: 1,
    categoryId: 1,
    projectName: "Work",
    categoryName: "Urgent",
    dueDate: "2025-02-05", // 📅 February 5, 2025
  },
  {
    id: 2,
    title: "Workout Session",
    description: "Go for a 30-minute jog.",
    priority: 1,
    status: "pending",
    projectId: 2,
    categoryId: 2,
    projectName: "Personal",
    categoryName: "Routine",
    dueDate: "2025-02-10", // 📅 February 10, 2025
  },
  {
    id: 3,
    title: "Fix API Bugs",
    description: "Debug the authentication API and fix CORS issues.",
    priority: 3,
    status: "pending",
    projectId: 1,
    categoryId: 1,
    projectName: "Work",
    categoryName: "Urgent",
    dueDate: "2025-02-15", // 📅 February 15, 2025
  },
  {
    id: 4,
    title: "Read Next.js Documentation",
    description: "Improve Next.js knowledge for future projects.",
    priority: 2,
    status: "completed",
    projectId: 3,
    categoryId: 3,
    projectName: "Side Project",
    categoryName: "Optional",
    dueDate: "2025-02-20", // 📅 February 20, 2025
  },
  {
    id: 5,
    title: "Meeting with Team",
    description: "Discuss project roadmap for Q1.",
    priority: 1,
    status: "pending",
    projectId: 1,
    categoryId: 2,
    projectName: "Work",
    categoryName: "Routine",
    dueDate: "2025-02-25", // 📅 February 25, 2025
  },
];
