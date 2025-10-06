import { useState } from "react";
import TaskItem from "./components/TaskItem";
import "./App.css";
import TaskForm from "./components/TaskForm";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Learn React", completed: true },
    { id: 2, title: "Learn Props", completed: true },
    { id: 3, title: "Build Task Manager", completed: false },
  ]);

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
