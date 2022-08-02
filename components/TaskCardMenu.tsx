import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import {
  deleteTask as unauthenticatedDeleteTask,
  duplicateTask as unauthenticatedDuplicateTask,
  Task,
} from "../features/tasks/taskSlice";
import { useAppDispatch } from "../hooks";
import Modal from "./Modal";
import {
  useDeleteTaskMutation,
  useDuplicateTaskMutation,
} from "../services/tasks";
import { useSession } from "next-auth/react";

type Props = {
  task: Task;
  handleEditClick: () => void;
};

export default function TaskCardMenu({ task, handleEditClick }: Props) {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTask] = useDeleteTaskMutation();
  const [duplicateTask] = useDuplicateTaskMutation();
  const handleDeleteClick = () => {
    if (session) {
      deleteTask(task);
    } else {
      dispatch(unauthenticatedDeleteTask(task));
    }
    setIsDeleteModalOpen(false);
  };
  const handleDuplicateClick = () => {
    if (session) {
      duplicateTask(task.id);
    } else {
      dispatch(unauthenticatedDuplicateTask(task.id));
    }
  };

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className="inline-flex w-full justify-center rounded-xl bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            disabled={task.isCompleted}
          >
            Options
            <AiFillCaretDown
              className="ml-2 -mr-1 h-5 w-5 text-white hover:text-white"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-blue-600 rounded-xl bg-blue-700 shadow-lg ring-2 ring-blue-700 ring-opacity-5 focus:outline-none z-50">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleEditClick}
                    className={`${
                      active ? "bg-white/[0.12] text-white" : "text-blue-100"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <EditActiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <EditInactiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Edit
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleDuplicateClick}
                    className={`${
                      active ? "bg-white/[0.12] text-white" : "text-blue-100"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <DuplicateActiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <DuplicateInactiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Duplicate
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className={`${
                      active ? "bg-white/[0.12] text-white" : "text-blue-100"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <DeleteActiveIcon
                        className="mr-2 h-5 w-5 text-blue-700"
                        aria-hidden="true"
                      />
                    ) : (
                      <DeleteInactiveIcon
                        className="mr-2 h-5 w-5 text-blue-700"
                        aria-hidden="true"
                      />
                    )}
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <Modal
        title={`Delete "${task.name}"?`}
        isOpen={isDeleteModalOpen}
        onConfirm={handleDeleteClick}
        onCancel={() => setIsDeleteModalOpen(false)}
        confirmButtonText="Delete"
        showControls
      >
        <p>This will permanently delete the task!</p>
      </Modal>
    </>
  );
}

function EditInactiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#rgb(29 78 216)"
        stroke="#FFF"
        strokeWidth="2"
      />
    </svg>
  );
}

function EditActiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#rgb(29 78 216)"
        stroke="#fff"
        strokeWidth="2"
      />
    </svg>
  );
}

function DuplicateInactiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4H12V12H4V4Z"
        fill="rgb(29 78 216)"
        stroke="#FFF"
        strokeWidth="2"
      />
      <path
        d="M8 8H16V16H8V8Z"
        fill="rgb(29 78 216)"
        stroke="#FFF"
        strokeWidth="2"
      />
    </svg>
  );
}

function DuplicateActiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4H12V12H4V4Z"
        fill="rgb(29 78 216)"
        stroke="#FFF"
        strokeWidth="2"
      />
      <path
        d="M8 8H16V16H8V8Z"
        fill="rgb(29 78 216)"
        stroke="#FFF"
        strokeWidth="2"
      />
    </svg>
  );
}

function ArchiveInactiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="8"
        width="10"
        height="8"
        fill="#FFF"
        stroke="rgb(29 78 216)"
        strokeWidth="2"
      />
      <rect
        x="4"
        y="4"
        width="12"
        height="4"
        fill="#FFF"
        stroke="rgb(29 78 216)"
        strokeWidth="2"
      />
      <path d="M8 12H12" stroke="rgb(29 78 216)" strokeWidth="2" />
    </svg>
  );
}

function ArchiveActiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="8"
        width="10"
        height="8"
        fill="rgb(29 78 216)"
        stroke="#FFF"
        strokeWidth="2"
      />
      <rect
        x="4"
        y="4"
        width="12"
        height="4"
        fill="rgb(29 78 216)"
        stroke="#FFF"
        strokeWidth="2"
      />
      <path d="M8 12H12" stroke="#FFF" strokeWidth="2" />
    </svg>
  );
}

function MoveInactiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="rgb(29 78 216)" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="rgb(29 78 216)" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="rgb(29 78 216)" strokeWidth="2" />
    </svg>
  );
}

function MoveActiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#FFF" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#FFF" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#FFF" strokeWidth="2" />
    </svg>
  );
}

function DeleteInactiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="rgb(29 78 216)"
        stroke="#FFF"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#FFF" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#FFF" strokeWidth="2" />
    </svg>
  );
}

function DeleteActiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="rgb(29 78 216)"
        stroke="#FFF"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#FFF" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#FFF" strokeWidth="2" />
    </svg>
  );
}
