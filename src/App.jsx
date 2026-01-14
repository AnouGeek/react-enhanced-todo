import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import ListItem from "./components/ListItem";

function App() {

  // Au lieu de donner la liste directement, on donne une fonction
  const [todoList, setTodoList] = useState(() => {
    // 1. On essaie de récupérer la sauvegarde dans le navigateur
    const savedList = localStorage.getItem("react-enhanced-todo");

    // 2. Si on trouve une sauvegarde (si savedList n'est pas null)
    if (savedList) {
      // On la transforme en tableau et on l'utilise
      return JSON.parse(savedList);
    }

    // 3. Sinon (si c'est la première visite), on prend la liste par défaut
    return [
      { id: nanoid(8), content: "Item 1", completed: false },
      { id: nanoid(8), content: "Item 2", completed: false },
      { id: nanoid(8), content: "Item 3", completed: false },
    ];
  });

  const [task, setTask] = useState("");

  const [error, setError] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const listString = JSON.stringify(todoList)
    localStorage.setItem("react-enhanced-todo", listString)
  }, [todoList]);

  function deleteTodo(id) {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const trimmed = task.trim();

    // if (trimmed === "") {
    //   setError(true);
    //   return;
    // }

    if (!trimmed) {
      setError("Please enter some content");
      return;
    }

    setTodoList([
      ...todoList,
      { id: nanoid(8), content: trimmed, completed: false },
    ]);
    setTask("");
    setError("");
  }

  function toggleTodo(id) {
    setTodoList((prevList) =>
      prevList.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  return (
    <div
      className={`min-h-screen ${darkMode ? "bg-[#202123]" : "bg-slate-50"}`}
    >
      <div className="max-w-4xl mx-auto pt-20 px-6 relative">
        {/* Dark-mode button */}
        <div className="absolute top-6 right-8 z-50 flex items-center gap-3">
          <span
            className={`${
              darkMode ? "text-slate-100" : "text-[#202123]"
            } text-sm font-medium`}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </span>

          <button
            type="button"
            onClick={() => setDarkMode((prev) => !prev)}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${
              darkMode ? "bg-slate-300" : "bg-[#202123]"
            }`}
            aria-label="Toggle dark mode"
            aria-pressed={darkMode}
          >
            <div
              className={`h-4 w-4 rounded-full bg-white transition-transform ${
                darkMode ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
        <h1
          className={`text-4xl mb-20 text-center font-roboto tracking-tight ${
            darkMode
              ? "text-slate-100 font-semibold"
              : "text-slate-900 font-extrabold"
          }`}
        >
          📅 My todo-list
        </h1>

        <form onSubmit={handleSubmit} className="mb-20">
          <label
            htmlFor="todo-item"
            className={`block font-poppins text-xl ml-3 mb-5
            ${darkMode ? "text-indigo-600" : "text-indigo-600 font-bold"}
              `}
          >
            Add task
          </label>

          <div className="relative mt-3">
            <input
              value={task}
              onChange={(e) => {
                setTask(e.target.value);
                if (error) setError("");
              }}
              type="text"
              placeholder="New Task..."
              className={`block w-full rounded-full py-3 px-6 pr-24 mb-10 focus:outline-none text-slate-800 
              ${
                darkMode
                  ? "bg-slate-50 placeholder:text-slate-400 placeholder:font-light"
                  : "bg-slate-100 text-slate-900 placeholder:text-slate-400 border border-indigo-300 focus:border-indigo-500"
              }
                `}
            />

            <button
              className={`absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-500 hover:bg-indigo-600 text-slate-200 px-4 py-1.5 rounded-full font-bold transition-colors active:scale-95 cursor-pointer`}
            >
              Add
            </button>
          </div>

          {error && (
            <p
              className={` ml-3 mt-3 text-center ${
                darkMode ? "text-red-500" : "text-red-600 font-semibold"
              }`}
            >
              {error}
            </p>
          )}
        </form>

        <ul className="flex flex-col gap-4">
          {todoList.length === 0 && (
            <p
              className={` font-inter italic text-xl ml-3 text-center
            ${darkMode ? "text-slate-100/50" : "text-slate-500"}
            `}
            >
              Your list is empty... Add one above
            </p>
          )}
          {todoList.length > 0 &&
            todoList.map((item) => (
              <ListItem
                key={item.id}
                itemData={item}
                deleteTodo={deleteTodo}
                toggleTodo={toggleTodo}
                darkMode={darkMode}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}
export default App;
