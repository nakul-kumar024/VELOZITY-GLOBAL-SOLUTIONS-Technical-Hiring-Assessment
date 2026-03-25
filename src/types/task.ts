export type Status = "todo" | "in-progress" | "review" | "done";

export type Priority = "low" | "medium" | "high" | "critical";

export type Task = {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
  assignee: string;
  dueDate: string;
  startDate?: string;
};