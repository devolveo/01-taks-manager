import React from "react";
import { useCallback, useState } from "react";
import { useSwipeable } from "react-swipeable";
interface TaskItemProps {
  id: number;
  title: string;
  completed: boolean;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

// function TaskItem(props: TaskItemProps) {
const TaskItem = React.memo(function TaskItem(props: TaskItemProps) {
  const { id, title, completed, onDelete, onToggle } = props;

  const [swipeOffset, setSwipeOffset] = useState(0);

  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  const handleToggle = useCallback(() => {
    onToggle(id);
  }, [id, onToggle]);

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      if (eventData.deltaX < 0) {
        setSwipeOffset(eventData.deltaX);
      }
    },
    onSwiped: (eventData) => {
      // if swiped more than 100px then delete
      if (eventData.deltaX < -100) {
        handleDelete();
      } else if (eventData.deltaX < -50) {
        setSwipeOffset(-80);
      } else {
        setSwipeOffset(0);
      }
    },
    trackMouse: false,
  });

  return (
    <div
      {...handlers}
      className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-800"
    >
      {/* Delete background */}
      <div className="absolute inset-0 bg-red-500 rounded-lg flex items-center justify-end px-4">
        <span className="text-white font-semibold">DELETE</span>
      </div>

      <div
        onClick={handleToggle}
        style={{ transform: `translateX(${swipeOffset}px)` }}
        className={`relative rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-transform duration-200 cursor-pointer sm:cursor-default sm:pointer-events-none border ${
          completed
            ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3 sm:pointer-events-auto">
            <input
              type="checkbox"
              checked={completed}
              onChange={handleToggle}
              onClick={(e) => e.stopPropagation()}
              className="w-5 h-5 sm:w-5 sm:h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer "
            />
            <span
              className={`flex-1 text-sm sm:text-base transition-all duration-300 sm:cursor-pointer ${
                completed
                  ? "line-through text-gray-500 dark:text-gray-400"
                  : "text-gray-700 dark:text-gray-200"
              }`}
            >
              {title}
            </span>
          </div>
          <button
            className="px-3 py-1.5 sm:py-1 text-xs sm:text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors duration-200 sm:pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
});

export default TaskItem;
