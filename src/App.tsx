import TaskItem from "./components/TaskItem";
import "./App.css";
import TaskForm from "./components/TaskForm";

function App() {
  return (
    <div className="app">
      <header>
        <h1>My Task Manager</h1>
      </header>
      <main>
        <TaskForm />
        <div className="task-list">
          <TaskItem title="Learn React" completed={true} />
          <TaskItem title="Learn Props" completed={true} />
          <TaskItem title="Build Task Manager" completed={false} />
        </div>
      </main>
    </div>
  );
}

export default App;
