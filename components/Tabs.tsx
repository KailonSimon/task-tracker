import { Tab } from "@headlessui/react";
import List from "./List";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  tabs: any[];
};

export default function Tabs({ tabs }: Props) {
  return (
    <div className="w-full max-w-md sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-700 p-1">
          {Object.keys(tabs).map((tab) => (
            <Tab
              key={tab}
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
              {tab}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="mt-2">
          {Object.values(tabs).map((items, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "py-3",
                "ring-white ring-opacity-60 focus:outline-none flex justify-center"
              )}
            >
              <List tasks={items} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
