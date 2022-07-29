import { AnimatePresence, Reorder } from "framer-motion";
import React from "react";
import { Task, updateTasksList } from "../features/tasks/taskSlice";
import { useAppDispatch } from "../hooks";
import TaskCard from "./TaskCard";

const listVariants = {
  visible: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
  hidden: {
    transition: {
      when: "afterChildren",
      staggerChildren: 0.3,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: 100 },
};

type Props = {
  tasks: Task[];
};

function List({ tasks }: Props) {
  const dispatch = useAppDispatch();

  const handleListUpdate = (newArr: Task[]) => {
    console.log("updated list!");
    dispatch(updateTasksList(newArr));
  };
  return (
    <>
      {tasks.length > 0 ? (
        <Reorder.Group
          values={tasks}
          onReorder={(newOrder) => handleListUpdate(newOrder)}
          initial="hidden"
          animate="visible"
          exit={{ x: 100, opacity: 0 }}
          axis="y"
          className="flex flex-col gap-4"
          variants={listVariants}
        >
          <AnimatePresence>
            {tasks.map((item: Task) => {
              return (
                <Reorder.Item
                  value={item}
                  key={item.id}
                  variants={itemVariants}
                  exit={{ x: 100, opacity: 0 }}
                  draggable={true}
                >
                  <TaskCard task={item} />
                </Reorder.Item>
              );
            })}
          </AnimatePresence>
        </Reorder.Group>
      ) : (
        <span className="text-zinc-400 text-center">No tasks in list</span>
      )}
    </>
  );
}

export default List;
