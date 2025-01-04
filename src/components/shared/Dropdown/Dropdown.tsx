import React, { useState } from "react";
import { DropdownProps } from "./type";

const DropDown = ({
  label = "Dropdown",
  dropdownList = [
    {
      label: "label",
      url: "/",
    },
  ],
  style = {},
  className = "bg-blue-600 hover:bg-blue-700",
}: DropdownProps) => {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className={`relative z-10 text-white px-4 bg-transparent font-medium 
        rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center ${className}`}
        type="button"
        data-dropdown-trigger="hover"
        onBlur={() => {
          setTimeout(() => {
            setOpened(false);
          }, 100);
        }}
        onClick={() => {
          setOpened(!opened);
        }}
        style={style}
      >
        {label}
        <svg
          className="w-2 h-2 ms-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>
      <div
        id="dropdown"
        className={`z-0 ${
          opened ? "" : "hidden"
        } bg-white w-full divide-y divide-gray-100 rounded-b-lg shadow w-44 dark:bg-gray-700`}
        style={{ top: "85%", right: "0%", position: "absolute" }}
      >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
          {dropdownList?.map((value: any, index: number) => {
            return (
              <li key={index}>
                {value?.url ? (
                  <a
                    href={value?.url}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {value?.label}
                  </a>
                ) : (
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={value?.onClick}
                  >
                    {value?.label}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DropDown;
