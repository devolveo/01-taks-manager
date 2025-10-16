# Day 5: Advanced Hooks - Starting Prompt

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
- Visual feedback - strikethrough for completed tasks

**Day 4 (Just Completed!):**

- **useEffect Hook** - side effects and lifecycle
- **localStorage API** - browser storage persistence
- **JSON.stringify/parse** - data serialization
- **Error handling** - try/catch, validation, safe fallbacks
- **Lazy initialization** - `useState(() => fn())`
- **Dependency arrays** - controlling when effects run
- **Self-healing system** - automatically fixes corrupted data

### Current Status:

- ✅ Task Manager with CRUD operations
- ✅ localStorage persistence (survives refresh)
- ✅ Error handling for corrupted data
- ✅ Self-healing on bad data
- Ready to learn advanced React hooks

---

## My Current Code Structure:

### App.tsx (Current State):

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

### TaskForm.tsx (Current):

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

### TaskItem.tsx (Current):

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

## Day 5 Goals (from my roadmap):

### Learning Focus:

- **useMemo** - Performance optimization, when to use
- **useCallback** - Memoizing functions
- **useContext** - Consuming context
- **Custom Hooks** - Creating reusable logic
  - `useLocalStorage` - Extract localStorage logic
  - `useDebounce` - Debouncing for search
- **Styling & Responsiveness** - Tailwind utility classes mastery
- **Dark mode** - Implementation with persistence

### Building Focus:

- Refactor localStorage into custom `useLocalStorage` hook
- Add search functionality with debouncing
- Add filters (all, active, completed)
- Add sorting (date, alphabetical)
- Implement dark mode toggle with persistence
- Make fully responsive (mobile, tablet, desktop)

---

## Current Problem to Solve:

Right now, my `loadTasksFromStorage` function and localStorage logic is mixed into my App component. I want to learn how to extract this into a reusable custom hook so I can use it anywhere in my app.

---

## What I Need From You:

1. Start with **useMemo and useCallback** - explain concepts clearly
2. Then teach me **custom hooks** - why they're powerful
3. Guide me to create **useLocalStorage** hook step-by-step
4. Add **useDebounce** for search optimization
5. Ask understanding questions before moving to next step
6. Stop at each step and wait for my "DONE" or "STEP X COMPLETE" confirmation
7. Explain the "why" behind performance optimization decisions

---

## My Background:

- IT background (not complete beginner)
- Following 22-week full-stack roadmap (JavaScript/TypeScript only)
- **Target:** Frontend Job-Ready by Week 9
- **Currently:** Week 2, Day 5 of 154 total days (3.2% complete)
- 4 hours/day commitment

---

## Ready to Start!

Please begin Day 5 by:

1. Explaining **useMemo** concept with examples
2. Asking me understanding questions
3. Then guide me to optimize my Task Manager step-by-step

Let's level up my React skills with advanced hooks! 🚀
