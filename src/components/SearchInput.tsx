import React, { ChangeEvent } from "react";

type Props = {
  filter: string;
  setFilter: (input: string) => void;
};

function SearchInput({ filter, setFilter }: Props) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <form autoComplete="off">
      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only"
      >
        Search
      </label>
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="search"
          value={filter}
          onChange={handleInputChange}
          className="mb-4 block p-4 pl-10 w-full text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white px-4 py-2 focus:outline-none hover:shadow bg-stone-800"
          placeholder="Search"
        />
      </div>
    </form>
  );
}

export default SearchInput;
