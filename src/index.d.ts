interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
  projectId: number;
  categoryName?: string;
  projectName?: string;
  categoryId: number;
}
export interface Project {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
  projectId: number;
  categoryId: number;
}
