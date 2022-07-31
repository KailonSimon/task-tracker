import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { clearTasks, selectTasks } from "../features/tasks/taskSlice";
import TaskDetailModal from "./Modals/TaskDetailModal";
import ConfirmationModal from "./Modals/ConfirmationModal";

export default function Add() {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);

  return (
    <>
      <div className="h-fit rounded-xl my-5 w-full max-w-md flex justify-end p-4 gap-4 font-semibold">
        <button
          className="w-full py-3 text-white bg-blue-700 hover:bg-blue-500 rounded-lg hover:shadow inline-flex space-x-2 items-center justify-center"
          onClick={() => setIsAddTaskModalOpen(true)}
        >
          Add Task
        </button>
        <button
          className="w-full py-3 text-blue-700 rounded-lg border-2 border-blue-700 disabled:opacity-50 hover:shadow hover:opacity-75 inline-flex space-x-2 items-center justify-center"
          onClick={() => setIsConfirmationModalOpen(true)}
          disabled={!tasks.length}
        >
          Clear Tasks
        </button>
      </div>
      <TaskDetailModal
        type="Add"
        isOpen={isAddTaskModalOpen}
        closeModal={() => setIsAddTaskModalOpen(false)}
      />
      <ConfirmationModal
        title="Clear All Tasks?"
        description="This will permanently delete all tasks!"
        isOpen={isConfirmationModalOpen}
        confirm={() => {
          dispatch(clearTasks());
          setIsConfirmationModalOpen(false);
        }}
        cancel={() => setIsConfirmationModalOpen(false)}
      />
    </>
  );
}
