import { Task, Status, Priority } from "../types/task";

const statuses: Status[] = ["todo", "in-progress", "review", "done"];
const priorities: Priority[] = ["low", "medium", "high", "critical"];
const users = ["Aman", "Rohit", "Neha", "Priya", "Karan", "Simran"];

const randomItem = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const generateTasks = (count: number): Task[] => {
  const tasks: Task[] = [];

  for (let i = 0; i < count; i++) {
    const start = new Date();
    start.setDate(start.getDate() - Math.floor(Math.random() * 10));

    const due = new Date();
    due.setDate(due.getDate() + Math.floor(Math.random() * 10));

    tasks.push({
      id: `${i}`,
      title: `Task ${i + 1}`,
      status: randomItem(statuses),
      priority: randomItem(priorities),
      assignee: randomItem(users),
      startDate: Math.random() > 0.3 ? start.toISOString() : undefined,
      dueDate: due.toISOString(),
    });
  }

  return tasks;
};