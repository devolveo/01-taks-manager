import { useState, useEffect } from "react";
import TaskItem from "./components/TaskItem";
import "./App.css";
import TaskForm from "./components/TaskForm";

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
  } catch (error) {
    console.error("❌ Failed to load tasks: ", error);
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
