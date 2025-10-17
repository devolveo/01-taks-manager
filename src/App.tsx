import { useState, useCallback } from "react";
import TaskItem from "./components/TaskItem";
import "./App.css";
import TaskForm from "./components/TaskForm";
import useLocalStorage from "./hooks/useLocalStorage";
import useDebounce from "./hooks/useDebounce";
import DarkModeToggle from "./components/DarkModeToggle";
import ErrorBoundary from "./components/ErrorBoundary";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  console.time("⏱️ App Render Time"); // ADD THIS LINE
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
  console.timeEnd("⏱️ App Render Time");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            My Task Manager
          </h1>
          <DarkModeToggle />
        </header>
        <main>
          <div className="mb-4 sm:mb-6">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <TaskForm onAddTask={addTask} />

          <div className="space-y-2 sm:space-y-3">
            {filteredTasks.length === 0 && (
              <span className="text-gray-500 dark:text-gray-400 text-center py-12 text-sm sm:text-base">
                <p>
                  No tasks yet. Add one above!{" "}
                  {searchTerm
                    ? "Try a different search."
                    : "Add one above to get started!"}
                </p>
              </span>
            )}
            {filteredTasks.length > 0 &&
              filteredTasks.map((task: Task) => (
                <ErrorBoundary
                  key={task.id}
                  fallback={
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <p className="text-red-600 dark:text-red-400 text-sm">
                        ⚠️ This task failed to load
                      </p>
                    </div>
                  }
                >
                  <TaskItem
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    completed={task.completed}
                    onDelete={deleteTask}
                    onToggle={toggleTask}
                  />
                </ErrorBoundary>
              ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
