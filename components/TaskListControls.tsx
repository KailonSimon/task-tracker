import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addTask, clearTasks, selectTasks } from "../features/tasks/taskSlice";
import Modal from "./Modal";
import TaskDetailsForm from "./TaskDetailsForm";

export default function Add() {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);

  const handleAddTask = (
    name: string,
    description: string,
    priorityLevel: string
  ) => {
    dispatch(addTask({ name, description, priorityLevel }));
    setIsAddTaskModalOpen(false);
  };

  return (
    <>
      <div className="h-fit rounded-xl my-5 w-full max-w-md flex justify-end p-4 gap-4 font-semibold">
        <button
          className="w-full py-3 text-blue-700 rounded-lg border-2 border-blue-700 disabled:opacity-50 hover:shadow hover:opacity-75 inline-flex space-x-2 items-center justify-center"
          onClick={() => setIsConfirmationModalOpen(true)}
          disabled={!tasks.length}
        >
          Clear Tasks
        </button>
        <button
          className="w-full py-3 text-white bg-blue-700 hover:bg-blue-500 rounded-lg hover:shadow inline-flex space-x-2 items-center justify-center"
          onClick={() => setIsAddTaskModalOpen(true)}
        >
          Add Task
        </button>
      </div>
      <Modal
        title="Add New Task"
        isOpen={isAddTaskModalOpen}
        onConfirm={() => setIsAddTaskModalOpen(false)}
        onCancel={() => setIsAddTaskModalOpen(false)}
        confirmButtonText="Add Task"
        showControls={false}
      >
        <TaskDetailsForm
          handleSubmit={handleAddTask}
          handleCancel={() => setIsAddTaskModalOpen(false)}
        />
      </Modal>
      <Modal
        title="Clear All Tasks?"
        isOpen={isConfirmationModalOpen}
        onConfirm={() => {
          dispatch(clearTasks());
          setIsConfirmationModalOpen(false);
        }}
        confirmButtonText="Clear"
        onCancel={() => setIsConfirmationModalOpen(false)}
        showControls={true}
      >
        <p>This will permanently delete all tasks!</p>
      </Modal>
    </>
  );
}
