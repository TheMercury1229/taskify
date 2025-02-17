export interface Task {
  id: number;
  title: string;
  priority: number;
  status: string;
  projectId: number;
  categoryId: number;
  dueDate?: string;
  description?: string;
}
