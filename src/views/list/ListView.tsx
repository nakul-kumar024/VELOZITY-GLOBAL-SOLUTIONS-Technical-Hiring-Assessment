import React, { useState } from "react";
import { useTaskStore } from "../../store/useTaskStore";
import { Task } from "../../types/task";
import { Filters } from "../../types/filter";

type SortKey = "title" | "priority" | "dueDate";

type Props = {
  filters: Filters;
};

const ROW_HEIGHT = 50;
const CONTAINER_HEIGHT = 600;
const BUFFER = 5;

const ListView: React.FC<Props> = ({ filters }) => {
  const tasks = useTaskStore((state) => state.tasks);
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);

  const [sortKey, setSortKey] = useState<SortKey>("title");
  const [asc, setAsc] = useState(true);
  const [scrollTop, setScrollTop] = useState(0);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setAsc(!asc);
    } else {
      setSortKey(key);
      setAsc(true);
    }
  };

  // ✅ FILTER
  const filteredTasks = tasks.filter((task) => {
    return (
      (!filters.status || task.status === filters.status) &&
      (!filters.priority || task.priority === filters.priority) &&
      (!filters.assignee || task.assignee === filters.assignee)
    );
  });

  // ✅ SORT
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    let valA = a[sortKey];
    let valB = b[sortKey];

    if (sortKey === "dueDate") {
      return asc
        ? new Date(valA).getTime() - new Date(valB).getTime()
        : new Date(valB).getTime() - new Date(valA).getTime();
    }

    return asc
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  // ✅ VIRTUAL SCROLL
  const totalHeight = sortedTasks.length * ROW_HEIGHT;

  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / ROW_HEIGHT) - BUFFER
  );

  const visibleCount =
    Math.ceil(CONTAINER_HEIGHT / ROW_HEIGHT) + BUFFER * 2;

  const endIndex = Math.min(
    sortedTasks.length,
    startIndex + visibleCount
  );

  const visibleTasks = sortedTasks.slice(startIndex, endIndex);

  const topSpace = startIndex * ROW_HEIGHT;
  const bottomSpace =
    totalHeight - topSpace - visibleTasks.length * ROW_HEIGHT;

  return (
    <div
      className="overflow-auto border"
      style={{ height: CONTAINER_HEIGHT }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <table className="w-full border-collapse">
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr>
            <th onClick={() => handleSort("title")} className="p-2 cursor-pointer">
              Title
            </th>
            <th onClick={() => handleSort("priority")} className="p-2 cursor-pointer">
              Priority
            </th>
            <th onClick={() => handleSort("dueDate")} className="p-2 cursor-pointer">
              Due Date
            </th>
            <th className="p-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {topSpace > 0 && (
            <tr>
              <td colSpan={4} style={{ height: topSpace }} />
            </tr>
          )}

          {visibleTasks.map((task) => (
            <tr key={task.id} className="border-t h-[50px]">
              <td className="p-2">{task.title}</td>
              <td className="p-2">{task.priority}</td>
              <td className="p-2">
                {new Date(task.dueDate).toLocaleDateString()}
              </td>
              <td className="p-2">
                <select
                  value={task.status}
                  onChange={(e) =>
                    updateTaskStatus(
                      task.id,
                      e.target.value as Task["status"]
                    )
                  }
                  className="border px-2 py-1"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="done">Done</option>
                </select>
              </td>
            </tr>
          ))}

          {bottomSpace > 0 && (
            <tr>
              <td colSpan={4} style={{ height: bottomSpace }} />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListView;