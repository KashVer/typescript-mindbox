import { useEffect, useMemo, useState } from "react";
import { ToDoList } from "./ToDoList";
import { IToDoItem } from "../types";

type TFilterValues = "all" | "active" | "completed";

const LocalStorageToDos = localStorage.getItem("toDos");

export const ToDoPage: React.FC = () => {
  const [toDos, setToDos] = useState<IToDoItem[] | null>(
    LocalStorageToDos ? JSON.parse(LocalStorageToDos) : null,
  );
  const [filter, setFilter] = useState<TFilterValues>("all");
  const [inputValue, setInputValue] = useState<string>("");

  const leftToDos = useMemo(
    () => (toDos || []).filter((toDo) => !toDo.completed),
    [toDos],
  );

  const completedToDos = useMemo(
    () => (toDos || []).filter((toDo) => toDo.completed),
    [toDos],
  );

  const displayedToDos = useMemo(() => {
    if (filter === "completed") {
      return completedToDos;
    }
    if (filter === "active") {
      return leftToDos;
    }
    return toDos || [];
  }, [toDos, filter, completedToDos, leftToDos]);

  const handleToggle = (id: number) => {
    setToDos(
      (toDos || []).map((toDo) => {
        if (toDo.id === id) {
          return { ...toDo, completed: !toDo.completed };
        }
        return toDo;
      }),
    );
  };

  const handleClick = () => {
    const newToDo: IToDoItem = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    setToDos([...(toDos || []), newToDo]);
    setInputValue("");
  };

  const clearCompleted = () => {
    setToDos(leftToDos);
  };

  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }, [toDos]);

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="max-w-full p-8 bg-gray-100 text-gray-600 rounded-lg shadow-lg w-fit">
        <div className="flex justify-center mb-5">
          <h4 className="font-semibold text-lg">To-Do List</h4>
        </div>
        <form>
          <div className="flex items-center border-b border-teal-500 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="What needs to be done?"
              value={inputValue}
              onChange={(e) => setInputValue(e.currentTarget.value)}
            />
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="button"
              onClick={handleClick}
            >
              Add
            </button>
          </div>
        </form>
        <ToDoList toDos={displayedToDos} onToggle={handleToggle} />
        {/* <ul className="w-full my-5 text-sm font-medium text-gray-900 bg-white rounded-lg dark:bg-gray-700 dark:text-white">
          {displayedToDos.map((toDo) => {
            return (
              <li
                key={`${toDo.id}${toDo.text}`}
                onClick={() => handleToggle(toDo.id)}
                className="w-full rounded-t-lg"
              >
                <div className="flex items-center pl-3">
                  <input
                    type="checkbox"
                    readOnly
                    checked={toDo.completed}
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    className={`w-full py-3 mx-2 text-sm font-medium text-gray-900 dark:text-gray-300 capitalize break-normal ${
                      toDo.completed && "line-through"
                    }`}
                  >
                    {toDo.text}
                  </label>
                </div>
              </li>
            );
          })}
        </ul> */}
        <div className="flex justify-between text-gray-500">
          <div className="mr-9">Items left: {Number(leftToDos?.length)}</div>
          <div className="flex justify-around mr-9">
            <button
              className={`px-2 ${
                filter === "all" && "border border-solid rounded"
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`px-2 ${
                filter === "active" && "border border-solid rounded"
              }`}
              onClick={() => setFilter("active")}
            >
              Active
            </button>
            <button
              className={`px-2 ${
                filter === "completed" && "border border-solid rounded"
              }`}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>
          <button onClick={clearCompleted}>Clear completed</button>
        </div>
      </div>
    </div>
  );
};
