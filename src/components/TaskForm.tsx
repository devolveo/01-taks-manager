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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 sm:gap-2 mb-4 sm:mb-6"
    >
      <input
        type="text"
        placeholder="Add a new task ..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500"
      />
      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
