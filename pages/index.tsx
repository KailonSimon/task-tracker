import type { NextPage } from "next";
import Layout from "../components/Layout";
import TaskListControls from "../components/TaskListControls";
import Tabs from "../components/Tabs";
import { useAppSelector } from "../hooks";
import {
  selectTasks,
  selectInProgressTasks,
  selectCompletedTasks,
} from "../features/tasks/taskSlice";

const Home: NextPage = () => {
  const fullList = useAppSelector(selectTasks);
  const inProgressItems = useAppSelector(selectInProgressTasks);
  const completedItems = useAppSelector(selectCompletedTasks);

  const tabs = {
    All: fullList,
    "In Progress": inProgressItems,
    Completed: completedItems,
  };

  return (
    <div>
      <Layout>
        <div className="p-4 w-full flex flex-col items-center">
          <TaskListControls />
          <Tabs tabs={tabs} />
        </div>
      </Layout>
    </div>
  );
};

export default Home;
