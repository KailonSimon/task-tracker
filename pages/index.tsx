import type { NextPage } from "next";
import Layout from "../components/Layout";
import TaskListControls from "../components/TaskListControls";
import Tabs from "../components/Tabs";
import { useAppSelector } from "../hooks";
import {
  selectTasks,
  selectInProgressTasks,
  selectCompletedTasks,
  Task,
} from "../features/tasks/taskSlice";
import SearchInput from "../components/SearchInput";
import { useEffect, useState } from "react";

const filterList = (data: Task[], filter: string) => {
  return data.filter(
    (task: Task) =>
      task.name.toLowerCase().startsWith(filter.toLowerCase()) ||
      task.description.toLowerCase().startsWith(filter.toLowerCase())
  );
};

const Home: NextPage = () => {
  const fullList = useAppSelector(selectTasks);
  const inProgressItems = useAppSelector(selectInProgressTasks);
  const completedItems = useAppSelector(selectCompletedTasks);
  const [filter, setFilter] = useState("");

  const tabs = {
    All: filterList(fullList, filter),
    "In Progress": filterList(inProgressItems, filter),
    Completed: filterList(completedItems, filter),
  };

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  useEffect(() => {
    console.log(filterList(fullList, filter));
  }, [fullList, filter]);

  return (
    <div>
      <Layout>
        <div className="p-4 w-full flex flex-col items-center">
          <TaskListControls />

          <SearchInput filter={filter} setFilter={setFilter} />
          <Tabs tabs={tabs} />
        </div>
      </Layout>
    </div>
  );
};

export default Home;
