import { IToDoItem } from "../types";

interface IToDoListProps {
  toDos: IToDoItem[];
  onToggle: (id: number) => void;
}

export const ToDoList: React.FC<IToDoListProps> = ({ toDos, onToggle }) => {
  return (
    <ul className="w-full my-5 text-sm font-medium text-gray-900 bg-white rounded-lg dark:bg-gray-700 dark:text-white">
      {toDos.map((toDo) => {
        return (
          <li
            key={`${toDo.id}${toDo.text}`}
            onClick={() => onToggle(toDo.id)}
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
    </ul>
  );
};
