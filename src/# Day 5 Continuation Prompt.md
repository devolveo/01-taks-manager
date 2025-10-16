# Day 5 Continuation Prompt

Hi! I'm continuing my full-stack developer learning journey. I'm starting **Day 5 of Week 2 (Phase 1)** and need your guidance.

---

## My Learning Preferences:

- **Hands-on coding style** - I type all code myself, guide me step-by-step
- **Stop at each step** - Wait for my confirmation before proceeding
- **Regular function syntax** - I prefer `function ComponentName()` style
- **Explanation + Questions** - Ask me questions to check understanding
- **Explain the "why"** - I want to understand architectural decisions, not just "how"

---

## My Current Progress:

### ✅ Completed Days (Week 2):

**Day 1-2:**

- Vite + React + TypeScript setup
- JSX fundamentals, components, props
- Professional styling with CSS
- Created TaskItem and TaskForm components

**Day 3:**

- Mastered useState Hook - state management
- Built full CRUD functionality - add, delete, toggle tasks
- Controlled components - form input synced with state
- Event handlers - onClick, onChange, onSubmit
- Immutable state updates - spread operator, filter, map
- Callback props - parent-child communication

**Day 4:**

- Mastered useEffect Hook - side effects and lifecycle
- localStorage API - browser persistence
- JSON.stringify/parse - data serialization
- Error handling - try/catch, validation, safe fallbacks
- Self-healing system - automatic corruption recovery
- Lazy initialization - `useState(() => fn())`

---

## Current Code Structure:

### App.tsx (Current):

```typescript
import { useState, useEffect } from "react";
import TaskItem from "./components/TaskItem";
import TaskForm from "./components/TaskForm";
import "./App.css";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function loadTasksFromStorage(): Task[] {
  try {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks === null) {
      return [];
    }

    const parsed = JSON.parse(savedTasks);

    if (Array.isArray(parsed)) {
      return parsed;
    }

    return [];
  } catch (error) {
    console.error("Failed to load tasks:", error);
    return [];
  }
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasksFromStorage());

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(title: string) {
    const newTask: Task = {
      id: Date.now(),
      title: title,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function toggleTask(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  return (
    <div className="app">
      <header>
        <h1>My Task Manager</h1>
      </header>

      <main>
        <TaskForm onAddTask={addTask} />

        <div className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              completed={task.completed}
              onDelete={deleteTask}
              onToggle={toggleTask}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
```

### TaskForm.tsx:

```typescript
import { useState } from "react";

interface TaskFormProps {
  onAddTask: (title: string) => void;
}

function TaskForm(props: TaskFormProps) {
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (inputValue.trim() === "") {
      return;
    }

    props.onAddTask(inputValue);
    setInputValue("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter new task..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
```

### TaskItem.tsx:

```typescript
import React from "react";

interface TaskItemProps {
  id: number;
  title: string;
  completed: boolean;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

function TaskItem(props: TaskItemProps) {
  function handleDelete() {
    props.onDelete(props.id);
  }

  function handleToggle() {
    props.onToggle(props.id);
  }

  return (
    <div className="task-item">
      <input
        type="checkbox"
        checked={props.completed}
        onChange={handleToggle}
      />
      <span
        style={{
          textDecoration: props.completed ? "line-through" : "none",
          opacity: props.completed ? 0.6 : 1,
        }}
      >
        {props.title}
      </span>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default TaskItem;
```

---

## Current Features:

✅ Add tasks  
✅ Delete tasks  
✅ Toggle completion  
✅ Persist in localStorage  
✅ Load on page refresh  
✅ Handle corrupted data  
✅ Self-healing system

---

## Day 5 Goals (from my roadmap):

### Learning Focus:

- **useMemo** - Performance optimization, when to use
- **useCallback** - Memoizing functions, preventing re-renders
- **useContext** - Consuming context (overview for now)
- **Custom Hooks** - Creating reusable logic
  - Build `useLocalStorage` custom hook
  - Build `useDebounce` custom hook

### Building Focus:

- Refactor localStorage logic into `useLocalStorage` hook
- Optimize re-renders with useMemo and useCallback
- Add search functionality with debouncing
- Performance testing with React DevTools

---

## What I Need From You:

1. **Start with Advanced Hooks explanation** - useMemo, useCallback, custom hooks
2. **Explain when and why** to use each hook
3. **Guide me through refactoring** - extract localStorage into custom hook
4. **Performance concepts** - understand re-renders and optimization
5. **Ask understanding questions** before moving to next step
6. **Stop at each step** and wait for my "DONE" or "STEP X COMPLETE" confirmation
7. **Explain the "why"** behind architectural decisions

---

## My Background:

- IT background (not complete beginner)
- Following 22-week full-stack roadmap (JavaScript/TypeScript only)
- Target: Frontend Job-Ready by Week 9
- Currently: **Week 2, Day 5 of 154 total days**
- 4 hours/day commitment

---

## Ready to Start!

Please begin Day 5 by:

1. Explaining **useMemo and useCallback** - what they are, when to use them
2. Asking me understanding questions
3. Then guide me to create **custom hooks** step-by-step

Let's optimize my Task Manager and learn advanced React patterns! 🚀
