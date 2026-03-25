import { create } from "zustand";
import { Task } from "../types/task";
import { generateTasks } from "../data/generateTasks";

type TaskStore = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  updateTaskStatus: (id: string, status: Task["status"]) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: generateTasks(500),

  setTasks: (tasks) => set({ tasks }),

  updateTaskStatus: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      ),
    })),
}));