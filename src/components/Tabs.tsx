import { Tab } from "@headlessui/react";
import { Task } from "../../features/tasks/taskSlice";
import List from "./List";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

type Tab = {
  title: string;
  items: Task[];
};

type Props = {
  tabs: Tab[];
};

export default function Tabs({ tabs }: Props) {
  return (
    <div className="w-full max-w-md sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-700 p-1">
          {tabs.map((tab) => (
            <Tab
              key={tab.title}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 focus:outline-none",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {tab.title}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="mt-2">
          {tabs.map((tab, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "py-3",
                "ring-white ring-opacity-60 focus:outline-none flex justify-center"
              )}
            >
              <List tasks={tab.items} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
