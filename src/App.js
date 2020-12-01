import React from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { getInitialState } from "./values";
import { classnames } from "./utils";
import { getColorClass } from "./colors";
import "./styles/tailwind.css";

function App() {
  const [state, setState] = useLocalStorage("state", getInitialState());
  const toggle = (key) =>
    setState({
      ...state,
      [key]: !state[key],
    });

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap"
        rel="stylesheet"
      />
      <h1 className="px-4 font-serif font-extrabold text-lg lg:text-3xl">
        <strong>Holiday Movie Bingo!</strong>
      </h1>
      <ul className="grid grid-cols-5 grid-rows-5 gap-0">
        {Object.entries(state).map(([key, value], index) => {
          const row = Math.floor(index / 5);
          const column = index % 5;

          const buttonClassName = classnames(
            "h-full flex items-center text-left w-full",
            "text-xs md:text-sm lg:text-normal",
            "p-4 md:py-8 lg:py-12",
            "focus:outline-none",
            !value && "bg-gray-100",
            value && "bg-gray-800 text-white",
            getColorClass(row, column, value)
          );

          return (
            <li key={key}>
              <button
                type="button"
                className={buttonClassName}
                onClick={() => toggle(key)}
              >
                {key}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
