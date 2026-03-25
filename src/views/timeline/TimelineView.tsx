import React from "react";
import { useTaskStore } from "../../store/useTaskStore";
import { getPriorityColor } from "../../utils/helpers";
import { Filters } from "../../types/filter";

type Props = {
  filters: Filters;
};

const TimelineView: React.FC<Props> = ({ filters }) => {
  const tasks = useTaskStore((state) => state.tasks);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const endOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = endOfMonth.getDate();

  const DAY_WIDTH = 40;

  // ✅ FILTER
  const filteredTasks = tasks.filter((task) => {
    return (
      (!filters.status || task.status === filters.status) &&
      (!filters.priority || task.priority === filters.priority) &&
      (!filters.assignee || task.assignee === filters.assignee)
    );
  });

  return (
    <div className="overflow-auto border p-4">
      <div
        className="relative"
        style={{ width: daysInMonth * DAY_WIDTH }}
      >
        {/* Days Header */}
        <div className="flex border-b mb-4">
          {Array.from({ length: daysInMonth }, (_, i) => (
            <div
              key={i}
              className="text-xs text-center border-r"
              style={{ width: DAY_WIDTH }}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Today Line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-red-500"
          style={{
            left: (today.getDate() - 1) * DAY_WIDTH,
          }}
        />

        {/* Tasks */}
        <div className="space-y-3">
          {filteredTasks.map((task) => {
            const startDate = task.startDate
              ? new Date(task.startDate)
              : new Date(task.dueDate);

            const dueDate = new Date(task.dueDate);

            const startDay = startDate.getDate();
            const endDay = dueDate.getDate();

            const left = (startDay - 1) * DAY_WIDTH;
            const width =
              Math.max(1, endDay - startDay + 1) * DAY_WIDTH;

            return (
              <div key={task.id} className="relative h-8">
                <div
                  className={`absolute h-8 rounded text-xs text-white flex items-center px-2 ${getPriorityColor(
                    task.priority
                  )}`}
                  style={{
                    left,
                    width,
                  }}
                >
                  {task.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimelineView;