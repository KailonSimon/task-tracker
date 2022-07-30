import { useState, Fragment, ChangeEvent, KeyboardEvent } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAppDispatch } from "../hooks";
import { addTask, Task, updateTask } from "../features/tasks/taskSlice";

type Props = {
  type: string;
  task?: Task;
  isOpen: boolean;
  closeModal: () => void;
};

function TaskDetailModal({ type, task, isOpen, closeModal }: Props) {
  const [inputState, setInputState] = useState({
    name: task?.name || "",
    description: task?.description || "",
    priorityLevel: task?.priorityLevel || "1",
  });
  const dispatch = useAppDispatch();

  const priorityLevels = [
    { value: "1", text: "Critical" },
    { value: "2", text: "Significant" },
    { value: "3", text: "Medium" },
    { value: "4", text: "Low" },
  ];

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputState({
      ...inputState,
      [e.target.name]: value,
    });
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputState({
      ...inputState,
      [e.target.name]: value,
    });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setInputState({
      ...inputState,
      [e.target.name]: value,
    });
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key !== "Enter" || !inputState.name) {
      return;
    }
    handleAddTask();
  };

  const handleEditTask = () => {
    dispatch(
      updateTask({
        ...task,
        ...inputState,
      })
    );
    closeModal();
  };

  const handleAddTask = () => {
    dispatch(
      addTask({
        name: inputState.name,
        description: inputState.description,
        priorityLevel: inputState.priorityLevel,
      })
    );
    setInputState({
      name: "",
      description: "",
      priorityLevel: "1",
    });
    closeModal();
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black bg-opacity-25"
            aria-hidden="true"
          />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="border border-zinc-600 bg-zinc-900 w-full  max-w-md h-fit rounded-xl p-6 text-left align-middle shadow-xl transition-all"
                onKeyDown={handleKeyPress}
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white"
                >
                  Task Details
                </Dialog.Title>
                <div className="mt-2"></div>

                <div className="my-4 flex flex-col gap-4">
                  <div className="mb-2 flex flex-col gap-2">
                    <label className="h-fit w-full" htmlFor="task-name">
                      Name:
                    </label>
                    <input
                      type="text"
                      id="task-name"
                      name="name"
                      required
                      value={inputState.name}
                      onChange={handleNameChange}
                      className="px-4 py-2 rounded-lg focus:outline-none hover:shadow bg-stone-800"
                    />
                  </div>
                  <div className="mb-2 flex flex-col gap-2">
                    <label className="h-fit w-full" htmlFor="task-description">
                      Description:
                    </label>
                    <textarea
                      id="task-description"
                      name="description"
                      value={inputState.description}
                      onChange={handleDescriptionChange}
                      className="px-4 py-2 rounded-lg focus:outline-none hover:shadow bg-stone-800 resize-none"
                      rows={3}
                    />
                  </div>
                  <div className="mb-2 flex flex-col gap-2">
                    <label className="h-fit w-full" htmlFor="task-priority">
                      Priority:
                    </label>
                    <select
                      id="task-priority"
                      name="priorityLevel"
                      value={inputState.priorityLevel}
                      onChange={handleSelectChange}
                      className="px-4 py-2 rounded-lg focus:outline-none hover:shadow bg-stone-800"
                    >
                      {priorityLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.text}
                        </option>
                      ))}
                    </select>
                  </div>
                  {type === "Add" ? (
                    <button
                      className="w-full py-3 font-semibold text-white bg-blue-700 disabled:bg-zinc-800 hover:bg-blue-500 rounded-lg hover:shadow inline-flex space-x-2 items-center justify-center transition"
                      onClick={handleAddTask}
                      disabled={!inputState.name}
                    >
                      Add
                    </button>
                  ) : (
                    <button
                      className="w-full py-3 font-semibold text-white bg-stone-800 border-2 border-blue-700 disabled:bg-zinc-800 hover:bg-blue-700 rounded-lg hover:shadow inline-flex space-x-2 items-center justify-center transition"
                      onClick={handleEditTask}
                      disabled={!inputState.name}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default TaskDetailModal;
