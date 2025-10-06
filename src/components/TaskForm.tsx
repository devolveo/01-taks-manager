import React, { useState } from "react";

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
        placeholder="emter new task ..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
