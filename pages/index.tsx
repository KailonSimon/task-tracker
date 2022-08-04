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
import { useState } from "react";
import { useGetTasksQuery } from "../services/tasks";
import { useSession } from "next-auth/react";
import Head from "next/head";

export function filterList(data: Task[], filter: string): Task[] {
  return data.filter(
    (task: Task) =>
      task.name.toLowerCase().startsWith(filter.toLowerCase()) ||
      task.description?.toLowerCase().startsWith(filter.toLowerCase())
  );
}

const Home: NextPage = () => {
  let fullList = useAppSelector(selectTasks);
  let inProgressItems = useAppSelector(selectInProgressTasks);
  let completedItems = useAppSelector(selectCompletedTasks);
  const { data: session } = useSession();
  const { data, error, isLoading } = useGetTasksQuery();
  if (session && data) {
    fullList = data;
    inProgressItems = fullList.filter((task: Task) => !task.isCompleted);
    completedItems = fullList.filter((task: Task) => task.isCompleted);
  }
  const [filter, setFilter] = useState("");

  const tabs = [
    { title: "All", items: filterList(fullList, filter) },
    { title: "In Progress", items: filterList(inProgressItems, filter) },
    { title: "Completed", items: filterList(completedItems, filter) },
  ];

  return (
    <>
      <Head>
        <title>Task Tracker</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <div className="p-4 w-full flex flex-col items-center">
          <TaskListControls />
          <SearchInput filter={filter} setFilter={setFilter} />
          <Tabs tabs={tabs} />
        </div>
      </Layout>
    </>
  );
};

export default Home;
