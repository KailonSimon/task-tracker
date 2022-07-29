import React from "react";
import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { toggleTaskCompleted } from "../features/tasks/taskSlice";
import { format, parseISO, formatDistanceToNow } from "date-fns";
import { Task } from "../features/tasks/taskSlice";
import TaskDetailModal from "./TaskDetailModal";
import TaskCardMenu from "./TaskCardMenu";

type Props = {
  task: Task;
};

export default function TaskCard({ task }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleCompletedClick = () => {
    dispatch(toggleTaskCompleted(task.id));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const priorityLevel = () => {
    switch (task.priorityLevel) {
      case "1":
        return "border-red-600";
      case "2":
        return "border-orange-600";
      case "3":
        return "border-yellow-600";
      case "4":
        return "border-green-600";
      default:
        return "border-zinc-600";
    }
  };

  return (
    <>
      <div
        className={`border-2 ${priorityLevel()} bg-zinc-900 rounded-xl p-4 min-h-fit flex gap-2 max-w-full relative ${
          task.isCompleted && "opacity-50"
        }`}
      >
        <div className="flex flex-col flex-1 w-full pr-8">
          <span className="flex-1 whitespace-pre-line break-words text-2xl font-bold mb-1">
            {task.name}
          </span>

          <span className="flex-1 whitespace-pre-line break-words text-zinc-200 text-md">
            {task.description}
          </span>

          <span className="mt-1 text-xs text-zinc-400">
            {`• ${format(parseISO(task.dateAdded), "MMMM dd, yyyy")} - 
          ${formatDistanceToNow(parseISO(task.dateAdded))} ago`}
          </span>

          <div className="flex items-center my-4 ml-1">
            <input
              id="completed-checkbox"
              type="checkbox"
              checked={task.isCompleted}
              onChange={handleCompletedClick}
              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300"
            />
            <label
              htmlFor="completed-checkbox"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Completed
            </label>
          </div>
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {/*<button
            className="h-6 w-6 aspect-square rounded bg-blue-700 flex justify-center items-center"
            onClick={openModal}
          >
            <AiFillEdit />
          </button>
          <button
            className="h-6 w-6 aspect-square rounded bg-red-600 flex justify-center items-center"
            onClick={handleRemoveClick}
          >
            <AiFillDelete />
      </button>*/}
          <TaskCardMenu task={task} handleEditClick={openModal} />
        </div>
      </div>

      <TaskDetailModal
        type="Edit"
        task={task}
        isOpen={isModalOpen}
        closeModal={closeModal}
      />
    </>
  );
}
