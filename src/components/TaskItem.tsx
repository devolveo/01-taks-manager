import React from "react";
interface TaskItemProps {
  id: number;
  title: string;
  completed: boolean;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

// function TaskItem(props: TaskItemProps) {
const TaskItem = React.memo(function TaskItem(props: TaskItemProps) {
  function handleDelete() {
    props.onDelete(props.id);
  }

  function handleToggle() {
    props.onToggle(props.id);
  }

  return (
    <>
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
    </>
  );
});

export default TaskItem;
