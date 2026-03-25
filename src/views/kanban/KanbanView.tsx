

import React, { useState } from "react";
import { useTaskStore } from "../../store/useTaskStore";
import { getPriorityColor } from "../../utils/helpers";



import { Filters } from "../../types/filter";

type Props = {
  filters: Filters;
};




const columns = [
  { key: "todo", title: "To Do" },
  { key: "in-progress", title: "In Progress" },
  { key: "review", title: "In Review" },
  { key: "done", title: "Done" },
];

const KanbanView: React.FC<Props> = ({ filters }) => {
  const tasks = useTaskStore((state) => state.tasks);
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);

  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<string | null>(null);

  // ✅ FILTER LOGIC
  const filteredTasks = tasks.filter((task) => {
    return (
      (!filters.status || task.status === filters.status) &&
      (!filters.priority || task.priority === filters.priority) &&
      (!filters.assignee || task.assignee === filters.assignee)
    );
  });

  return (
    <div className="grid grid-cols-4 gap-4">
      {columns.map((col) => {
        const columnTasks = filteredTasks.filter(
          (task) => task.status === col.key
        );

        return (
          <div
            key={col.key}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOverCol(col.key);
            }}
            onDrop={() => {
              if (draggedTask) {
                updateTaskStatus(draggedTask, col.key as any);
              }
              setDraggedTask(null);
              setDragOverCol(null);
            }}
            className={`p-3 rounded-lg h-[80vh] flex flex-col ${
              dragOverCol === col.key ? "bg-blue-100" : "bg-gray-100"
            }`}
          >
            <div className="flex justify-between mb-2 font-semibold">
              <span>{col.title}</span>
              <span>{columnTasks.length}</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2">
              {columnTasks.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={() => setDraggedTask(task.id)}
                  onDragEnd={() => setDraggedTask(null)}
                  className="bg-white p-3 rounded shadow"
                >
                  <div>{task.title}</div>
                  <div
                    className={`text-xs ${getPriorityColor(task.priority)}`}
                  >
                    {task.priority}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanView;

