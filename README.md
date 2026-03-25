# 🧠 Task Management Dashboard

A feature-rich **Task Management Dashboard** built with **React + TypeScript**, showcasing advanced frontend engineering concepts such as custom drag-and-drop, virtual scrolling, URL-synced filtering, and timeline visualization.

- **Live Demo**: _[https://velozity-global-solutions-technical.vercel.app/]_  
- **Repository**: _[https://github.com/nakul-kumar024/VELOZITY-GLOBAL-SOLUTIONS-Technical-Hiring-Assessment]_

---

## 🚀 Features

### 📌 1. Kanban Board (Drag & Drop)

**Implementation Overview:**

This feature is built using the browser’s **native drag-and-drop**, without relying on external libraries.

**Key Implementation Details (`KanbanView.tsx`):**

```tsx
<div 
  draggable 
  onDragStart={() => setDraggedTask(task.id)} 
  onDragEnd={() => setDraggedTask(null)}
>
```

```tsx
<div
  onDragOver={(e) => {
    e.preventDefault();
    setDragOverCol(col.key);
  }}
>
```

```tsx
onDrop={() => {
  if (draggedTask) {
    updateTaskStatus(draggedTask, col.key);
  }
  setDraggedTask(null);
  setDragOverCol(null);
}}
```

**User Experience:**
- Smooth dragging with native visual feedback
- Instant column highlighting
- Real-time task updates
- Works on both mouse and touch devices

---

### 📋 2. List View (Virtual Scrolling + Sorting)

**Capabilities:**
- Sort by Title, Priority, Due Date
- Inline status updates
- Handles 500+ tasks efficiently

**Virtual Scrolling:**

```tsx
const ROW_HEIGHT = 50;
const CONTAINER_HEIGHT = 600;
const BUFFER = 5;

const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - BUFFER);
const visibleTasks = sortedTasks.slice(startIndex, endIndex);
```

**Optimization:**
- Renders only visible items
- Uses spacer rows for smooth scrolling
- Eliminates DOM overload

---

### 📅 3. Timeline View (Gantt Chart)

- Monthly task visualization
- Horizontal task bars (start → due date)
- Current day indicator
- Scrollable layout

---

### 🔍 4. Filtering System (URL Sync)

- Filter by Status, Priority, Assignee
- Syncs with URL:
  ?status=todo&priority=high
- Shareable + persistent filters
- Clear button appears when active

---

### ⚡ 5. Performance Optimization

- Virtual scrolling
- Efficient filtering
- Zustand for fast state management

---

## 🛠️ Tech Stack

- React (Vite)
- TypeScript
- Zustand
- Tailwind CSS
- React Router

---

## 📊 Performance

- Lighthouse Score: 
 - Performance: 100
 - Accessibility: 83
 - Best Practices: 100
 - SEO: 82

---


