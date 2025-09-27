import React from "react";
interface TaskItemProps {
  title: string;
  completed: boolean;
}

function TaskItem(props: TaskItemProps) {
  return (
    <>
      <div className="task-item">
        <input type="checkbox" checked={props.completed} />
        <span>{props.title}</span>
        <button>Delete</button>
      </div>
    </>
  );
}

export default TaskItem;
