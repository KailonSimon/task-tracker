import { useState, Fragment, ChangeEvent, KeyboardEvent } from "react";
import { Dialog, Transition } from "@headlessui/react";

type Props = {
  title: string;
  description: string;
  isOpen: boolean;
  confirm: () => void;
  cancel: () => void;
};

function ConfirmationModal({
  title,
  description,
  isOpen,
  confirm,
  cancel,
}: Props) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={cancel}>
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
              <Dialog.Panel className="border border-zinc-600 bg-zinc-900 w-full  max-w-md h-fit rounded-xl p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-white"
                >
                  {title}
                </Dialog.Title>
                <div className="mt-2">
                  <p>{description}</p>
                </div>
                <div className="mt-4 flex gap-4 justify-between">
                  <button
                    className="w-full py-3 text-blue-700 rounded-lg border-2 border-blue-700 hover:shadow hover:opacity-75 inline-flex space-x-2 items-center justify-center transition"
                    onClick={cancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="w-full py-3 font-semibold text-white bg-blue-700 disabled:bg-zinc-800 hover:bg-blue-500 rounded-lg hover:shadow inline-flex space-x-2 items-center justify-center transition"
                    onClick={confirm}
                  >
                    Confirm
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ConfirmationModal;
