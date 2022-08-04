import { useState } from "react";
import { useAppDispatch } from "../../hooks";
import {
  addTask as unauthenticatedAddTask,
  Task,
} from "../../features/tasks/taskSlice";
import Modal from "./Modal";
import TaskDetailsForm from "./TaskDetailsForm";
import { useSession } from "next-auth/react";
import { useAddTaskMutation } from "../../services/tasks";

export default function TaskListControls() {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [addTask] = useAddTaskMutation();

  function handleAddTask<T extends Task>(task: T): void {
    if (session) {
      addTask(task);
    } else {
      dispatch(unauthenticatedAddTask(task));
    }
    setIsAddTaskModalOpen(false);
  }

  return (
    <>
      <div className="h-fit rounded-xl my-5 w-full max-w-md flex justify-end p-4 gap-4 font-semibold">
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
    </>
  );
}
