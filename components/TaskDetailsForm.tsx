import { useState, ChangeEvent, KeyboardEvent } from "react";
import { Task } from "../features/tasks/taskSlice";

type Props = {
  handleSubmit: (
    name: string,
    description: string,
    priorityLevel: string
  ) => void;
  handleCancel: () => void;
  task?: Task;
};

export default function TaskDetailsForm({
  handleSubmit,
  handleCancel,
  task,
}: Props) {
  const [inputState, setInputState] = useState({
    name: task?.name || "",
    description: task?.description || "",
    priorityLevel: task?.priorityLevel || "1",
  });

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
    switch (e.key) {
      case "Enter":
        if (!inputState.name) {
          e.preventDefault();
          return;
        } else {
          e.preventDefault();
          handleSubmit(
            inputState.name,
            inputState.description,
            inputState.priorityLevel
          );
        }

      default:
        return;
    }
  };

  return (
    <div className="my-4 flex flex-col gap-4" onKeyDown={handleKeyPress}>
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
      <div className="flex gap-4 font-semibold">
        <button
          className="w-full py-3 text-blue-700 rounded-lg border-2 border-blue-700 disabled:opacity-50 hover:shadow hover:opacity-75 inline-flex space-x-2 items-center justify-center"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="w-full py-3 text-white bg-blue-700 disabled:opacity-50 hover:bg-blue-500 disabled:bg-blue-700 rounded-lg hover:shadow inline-flex space-x-2 items-center justify-center"
          onClick={() =>
            handleSubmit(
              inputState.name,
              inputState.description,
              inputState.priorityLevel
            )
          }
          disabled={!inputState.name}
        >
          {task ? "Edit" : "Add"}
        </button>
      </div>
    </div>
  );
}
