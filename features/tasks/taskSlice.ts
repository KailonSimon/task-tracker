import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { nanoid } from "nanoid";

export type Task = {
  id: string;
  name: string;
  description?: string;
  priorityLevel: string;
  dateAdded: string;
  isCompleted: boolean;
};

type TaskListState = {
  tasks: Task[];
};

const initialState: TaskListState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<any>) => {
      const index = state.tasks.findIndex(
        (task: Task) => task.id === action.payload.id
      );
      state.tasks[index] = { ...action.payload };
    },
    duplicateTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task: Task) => task.id === action.payload);
      if (!task) {
        return;
      }
      state.tasks[state.tasks.length] = { ...task, id: nanoid() };
    },
    deleteTask: (state, action: PayloadAction<Task>) => {
      state.tasks = state.tasks.filter(
        (item: Task) => item.id !== action.payload.id
      );
    },
    toggleTaskCompleted: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task: Task) => task.id === action.payload);
      if (!task) {
        console.error("No matching item");
        return;
      }
      task.isCompleted = !task.isCompleted;
    },
    updateTasksList: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    clearTasks: (state) => {
      state.tasks = [];
    },
  },
});

export const {
  addTask,
  updateTask,
  duplicateTask,
  deleteTask,
  toggleTaskCompleted,
  updateTasksList,
  clearTasks,
} = taskSlice.actions;

const selectTasks = (state: RootState) => state.tasks.tasks;
const selectTasksByID = (state: RootState, id: string) => {
  state.tasks.tasks.find((task: Task) => task.id === id);
};
const selectCompletedTasks = (state: RootState) =>
  state.tasks.tasks.filter((task: Task) => task.isCompleted);
const selectInProgressTasks = (state: RootState) =>
  state.tasks.tasks.filter((task: Task) => !task.isCompleted);

export {
  selectTasks,
  selectTasksByID,
  selectCompletedTasks,
  selectInProgressTasks,
};

export default taskSlice.reducer;
