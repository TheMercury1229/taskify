import { BookCheck, FolderKanban, HomeIcon } from "lucide-react";

import {
  BarChart3,
  Receipt,
  PieChart,
  CreditCard,
  Globe,
  Zap,
  ListChecks,
  CalendarDays,
  Users,
  Clock,
  Tag,
  Bell,
} from "lucide-react";

export const navLinks = [
  { name: "Home", href: "/dashboard", Icon: HomeIcon },
  { name: "Tasks", href: "/dashboard/tasks", Icon: BookCheck },
  { name: "Projects", href: "/dashboard/projects", Icon: FolderKanban },
];

// Stats Data
export const statsData = [
  {
    value: "10K+",
    label: "Tasks Completed",
  },
  {
    value: "5K+",
    label: "Active Users",
  },
  {
    value: "98%",
    label: "On-time Completion Rate",
  },
  {
    value: "4.8/5",
    label: "User Rating",
  },
];

// Features Data
export const featuresData = [
  {
    icon: <ListChecks className="h-8 w-8 text-yellow-600" />,
    title: "Smart Task Management",
    description:
      "Organize your tasks with categories, projects, and priorities.",
  },
  {
    icon: <CalendarDays className="h-8 w-8 text-yellow-600" />,
    title: "Integrated Calendar",
    description: "View your tasks on a calendar and plan ahead with deadlines.",
  },
  {
    icon: <Users className="h-8 w-8 text-yellow-600" />,
    title: "Collaborate with Teams",
    description:
      "Assign tasks to team members and track progress in real-time.",
  },
  {
    icon: <Clock className="h-8 w-8 text-yellow-600" />,
    title: "Task Reminders",
    description:
      "Never miss a deadline with automatic reminders and notifications.",
  },
  {
    icon: <Tag className="h-8 w-8 text-yellow-600" />,
    title: "Labels & Tags",
    description: "Categorize your tasks using customizable labels and tags.",
  },
  {
    icon: <Bell className="h-8 w-8 text-yellow-600" />,
    title: "Priority-Based Sorting",
    description: "Focus on high-priority tasks with automatic sorting.",
  },
];

// How It Works Data
export const howItWorksData = [
  {
    icon: <Users className="h-8 w-8 text-blue-600" />,
    title: "1. Sign Up & Set Up",
    description: "Create an account and set up your workspace in minutes.",
  },
  {
    icon: <ListChecks className="h-8 w-8 text-blue-600" />,
    title: "2. Create Tasks",
    description: "Add tasks, set due dates, and organize them into projects.",
  },
  {
    icon: <CalendarDays className="h-8 w-8 text-blue-600" />,
    title: "3. Stay on Track",
    description: "Use the calendar and reminders to complete tasks on time.",
  },
];

// Testimonials Data
export const testimonialsData = [
  {
    name: "Alice Johnson",
    role: "Project Manager",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
    quote:
      "Taskify keeps my entire team organized. The priority-based sorting and task reminders ensure nothing slips through the cracks!",
  },
  {
    name: "David Chen",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    quote:
      "I love how I can track all my tasks and projects in one place. The calendar view makes it easy to plan my work week.",
  },
  {
    name: "Sophia Martinez",
    role: "Freelancer",
    image: "https://randomuser.me/api/portraits/women/74.jpg",
    quote:
      "Taskify is the best productivity tool I’ve used. The customizable labels and reminders keep me focused and on track.",
  },
];

// Default Categories
