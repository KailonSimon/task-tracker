import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { clearTasks } from "../features/tasks/taskSlice";
import TaskDetailModal from "./TaskDetailModal";

export default function Add() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="h-fit rounded-xl my-5 w-full max-w-md flex justify-end p-4 gap-4 font-semibold">
        <button
          className="w-full py-3 text-white bg-blue-700 hover:bg-blue-500 rounded-lg hover:shadow inline-flex space-x-2 items-center justify-center"
          onClick={() => setIsOpen(true)}
        >
          Add Task
        </button>
        <button
          className="w-full py-3 text-blue-700 rounded-lg border-2 border-blue-700 hover:shadow hover:opacity-75 inline-flex space-x-2 items-center justify-center"
          onClick={() => dispatch(clearTasks())}
        >
          Clear Tasks
        </button>
      </div>
      <TaskDetailModal type="Add" isOpen={isOpen} closeModal={closeModal} />
    </>
  );
}
