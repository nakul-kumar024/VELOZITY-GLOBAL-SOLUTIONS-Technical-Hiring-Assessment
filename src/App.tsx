import React, { useEffect, useState } from "react";
import KanbanView from "./views/kanban/KanbanView";
import ListView from "./views/list/ListView";
import TimelineView from "./views/timeline/TimelineView";
import { useSearchParams } from "react-router-dom";
import { Filters } from "./types/filter";

function App() {
  const [view, setView] = useState<"kanban" | "list" | "timeline">("kanban");

  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState<Filters>({
    status: searchParams.get("status") || "",
    priority: searchParams.get("priority") || "",
    assignee: searchParams.get("assignee") || "",
  });

  // Sync URL
  useEffect(() => {
    const params: any = {};
    if (filters.status) params.status = filters.status;
    if (filters.priority) params.priority = filters.priority;
    if (filters.assignee) params.assignee = filters.assignee;

    setSearchParams(params);
  }, [filters]);

  return (
    <div className="p-4 space-y-4">

      {/* View Switch */}
      <div className="inline-flex rounded-xl bg-gray-100 p-1 shadow-sm dark:bg-zinc-800">
        <button
          onClick={() => setView("kanban")}
          className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-zinc-800 ${view === "kanban"
              ? "bg-white text-gray-900 shadow-sm dark:bg-zinc-700 dark:text-white"
              : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            }`}
        >
          Kanban
        </button>

        <button
          onClick={() => setView("list")}
          className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-zinc-800 ${view === "list"
              ? "bg-white text-gray-900 shadow-sm dark:bg-zinc-700 dark:text-white"
              : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            }`}
        >
          List
        </button>

        <button
          onClick={() => setView("timeline")}
          className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-zinc-800 ${view === "timeline"
              ? "bg-white text-gray-900 shadow-sm dark:bg-zinc-700 dark:text-white"
              : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            }`}
        >
          Timeline
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <select
          value={filters.status}
          onChange={(e) =>
            setFilters({ ...filters, status: e.target.value })
          }
          className="border p-1"
        >
          <option value="">All Status</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="review">Review</option>
          <option value="done">Done</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) =>
            setFilters({ ...filters, priority: e.target.value })
          }
          className="border p-1"
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>

        <select
          value={filters.assignee}
          onChange={(e) =>
            setFilters({ ...filters, assignee: e.target.value })
          }
          className="border p-1"
        >
          <option value="">All Assignees</option>
          <option value="Aman">Aman</option>
          <option value="Rohit">Rohit</option>
          <option value="Neha">Neha</option>
          <option value="Priya">Priya</option>
          <option value="Karan">Karan</option>
          <option value="Simran">Simran</option>
        </select>

        {/* Clear */}
        {(filters.status || filters.priority || filters.assignee) && (
          <button
            onClick={() =>
              setFilters({ status: "", priority: "", assignee: "" })
            }
            className="bg-red-500 text-white px-2"
          >
            Clear
          </button>
        )}
      </div>

      {/* Pass filters */}
      {(() => {
        switch (view) {
          case "kanban":
            return <KanbanView filters={filters} />;
          case "list":
            return <ListView filters={filters} />;
          case "timeline":
            return <TimelineView filters={filters} />;
          default:
            return null;
        }
      })()}
    </div>
  );
}

export default App;







