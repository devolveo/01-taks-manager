import { useState, useCallback } from "react";
import TaskItem from "./components/TaskItem";
import "./App.css";
import TaskForm from "./components/TaskForm";
import useLocalStorage from "./hooks/useLocalStorage";
import useDebounce from "./hooks/useDebounce";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("task", []);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const filteredTasks = tasks.filter((task: Task) => {
    console.log("Filtering with:", debouncedSearchTerm);
    return task.title
      .toLowerCase()
      .includes(debouncedSearchTerm.toLocaleLowerCase());
  });

  const addTask = useCallback(
    (title: string) => {
      const newTask: Task = {
        id: Date.now(),
        title: title,
        completed: false,
      };

      setTasks((prevTasks: Task[]) => [...prevTasks, newTask]);
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (id: number) => {
      setTasks((prevTasks: Task[]) =>
        prevTasks.filter((task) => task.id !== id)
      );
    },
    [setTasks]
  );

  const toggleTask = useCallback(
    (id: number) => {
      setTasks((prevTasks: Task[]) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    },
    [setTasks]
  );

  return (
    <div className="app">
      <header>
        <h1>My Task Manager</h1>
      </header>
      <main>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <TaskForm onAddTask={addTask} />

        <div className="task-list">
          {filteredTasks.map((task: Task) => (
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
