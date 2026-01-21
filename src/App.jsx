import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import ListItem from "./components/ListItem";

function App() {
  // Instead of providing the list directly, we provide a function
  const [todoList, setTodoList] = useState(() => {
    // 1. Try to retrieve the saved data from the browser
    const savedList = localStorage.getItem("react-enhanced-todo");

    // 2. If a save is found (if savedList is not null)
    if (savedList) {
      // Parse it into an array and use it
      return JSON.parse(savedList);
    }

    // 3. Otherwise (if it's the first visit), take the default list
    return [
      { id: nanoid(8), content: "Item 1", completed: false },
      { id: nanoid(8), content: "Item 2", completed: false },
      { id: nanoid(8), content: "Item 3", completed: false },
    ];
  });

  const [task, setTask] = useState("");

  const [error, setError] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const listString = JSON.stringify(todoList);
    localStorage.setItem("react-enhanced-todo", listString);
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

    // 1. Check if the task already exists
    // Compare texts in lowercase so that "Apple" and "apple" are the same
    const isDuplicate = todoList.some(
      (item) => item.content.toLowerCase() === trimmed.toLowerCase(),
    );

    // 2. If it is a duplicate, stop everything
    if (isDuplicate) {
      setError("Task already exists!"); // Display the message
      return; // Exit the function, do not add anything
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
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  // 🧠 UPDATE FUNCTION
  // Updates the content of a specific task
  function updateTodo(id, newContent) {
    setTodoList((prevList) =>
      prevList.map((todo) =>
        // If ID matches, we create a copy with the NEW content
        todo.id === id ? { ...todo, content: newContent } : todo,
      ),
    );
  }

  // 🔭 DERIVED STATE (État dérivé)
  // We don't touch the original todoList.
  // We create a new list just for display purposes based on the filter.
  const filteredTodoList = todoList.filter((item) => {
    if (filter === "todo") {
      return !item.completed; // Keep only unchecked items
    }
    if (filter === "completed") {
      return item.completed; // Keep only checked items
    }
    return true; // If filter is "all", keep everything
  });

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

        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-1 rounded-full text-lg font-semibold transition-colors 
              ${
                filter === "all"
                  ? "bg-indigo-600 text-white" // Active style
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300" // Inactive style
              }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("todo")}
            className={`px-4 py-1 rounded-full text-lg font-semibold transition-colors 
              ${
                filter === "todo"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
          >
            To do
          </button>

          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-1 rounded-full text-lg font-semibold transition-colors 
              ${
                filter === "completed"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
          >
            Completed
          </button>
        </div>
        {/* 👆 END OF FILTERS 👆 */}

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
            filteredTodoList.map((item) => (
              <ListItem
                key={item.id}
                itemData={item}
                deleteTodo={deleteTodo}
                toggleTodo={toggleTodo}
                updateTodo={updateTodo}
                darkMode={darkMode}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}
export default App;
