import React from "react";
import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { toggleTaskCompleted } from "../features/tasks/taskSlice";
import { format, parseISO, formatDistanceToNow } from "date-fns";
import { Task, updateTask } from "../features/tasks/taskSlice";
import TaskCardMenu from "./TaskCardMenu";
import Modal from "./Modal";
import TaskDetailsForm from "./TaskDetailsForm";

type Props = {
  task: Task;
};

export default function TaskCard({ task }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleCompletedClick = () => {
    dispatch(toggleTaskCompleted(task.id));
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditTask = (
    name: string,
    description: string,
    priorityLevel: string
  ) => {
    dispatch(
      updateTask({
        ...task,
        name,
        description,
        priorityLevel,
      })
    );
    handleCloseModal();
  };

  const priorityLevel = () => {
    switch (task.priorityLevel) {
      case "1":
        return "bg-red-600";
      case "2":
        return "bg-orange-600";
      case "3":
        return "bg-yellow-600";
      case "4":
        return "bg-green-600";
      default:
        return "bg-white";
    }
  };

  return (
    <>
      <div
        className={`border-2 border-zinc-600 bg-zinc-900 rounded-xl pr-4 min-h-fit flex max-w-full relative gap-2 ${
          task.isCompleted && "opacity-50"
        }`}
      >
        <div
          className={`${priorityLevel()} rounded-l-[10px] w-3 relative left-0 top-0 transition-all`}
        />

        <div className="flex flex-col justify-between flex-1 w-full pr-8 py-4 gap-2">
          <div className="flex flex-col gap-1">
            <span className="flex-1 whitespace-pre-line break-words text-xl font-bold max-w-[50%] overflow-hidden">
              {task.name}
            </span>

            {task.description && (
              <span className="flex-1 whitespace-pre-line break-words text-zinc-200 text-md">
                {task.description}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs text-zinc-400">
              {`- ${format(parseISO(task.dateAdded), "MMMM dd, yyyy")} - 
          ${formatDistanceToNow(parseISO(task.dateAdded))} ago`}
            </span>

            <div className="flex items-center">
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
            <TaskCardMenu task={task} handleEditClick={handleEditClick} />
          </div>
        </div>
      </div>

      <Modal
        title="Edit Task"
        isOpen={isModalOpen}
        onCancel={handleCloseModal}
        onConfirm={handleCloseModal}
        showControls={false}
      >
        <TaskDetailsForm
          task={task}
          handleSubmit={handleEditTask}
          handleCancel={handleCloseModal}
        />
      </Modal>
    </>
  );
}
