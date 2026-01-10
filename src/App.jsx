import { useState } from "react";
import { nanoid } from "nanoid";
import ListItem from "./components/ListItem";

function App() {
  const [todoList, setTodoList] = useState([
    { id: nanoid(8), content: "Add an edit icon for updating a task", completed: false },
    { id: nanoid(8), content: "Add dark mode", completed: false },
    { id: nanoid(8), content: "Add task validation", completed: true },
    { id: nanoid(8), content: "Challenge 2 – LocalStorage: keep data after refresh", completed: false },
    { id: nanoid(8), content: "Challenge 5 – Filters: display only what we want", completed: false },
    { id: nanoid(8), content: "Challenge 6 – Edit: update the text of an existing task", completed: false },
    { id: nanoid(8), content: "anti-doublons", completed: false }
  ]);

  const [task, setTask] = useState("");

  const [error, setError] = useState("");

  const [darkMode, setDarkMode] = useState(true)

  function deleteTodo(id) {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const trimmed = task.trim()

    // if (trimmed === "") {
    //   setError(true);
    //   return;
    // }

    if(!trimmed){
      setError("Please enter some content")
      return
    }

    setTodoList([...todoList, { id: nanoid(8), content: trimmed, completed: false }]);
    setTask("");
    setError(false)
  }

  function toggleTodo(id){
    setTodoList(prevList => prevList.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  }

  return (
    <div className="h-screen">
      <div className="max-w-4xl mx-auto pt-20 px-6">
        <h1 className="text-4xl text-slate-100 mb-10 text-center font-roboto font-semibold tracking-tight">
          📅 My todo-list
        </h1>

        <form onSubmit={handleSubmit} className="mb-10">
          <label
            htmlFor="todo-item"
            className="text-amber-500 font-poppins text-xl ml-3  "
          >
            Add task
          </label>

          <div className="relative mt-3">
            <input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              type="text"
              placeholder="New Task..."
              className="bg-slate-50 block w-full rounded-full py-3 px-6 pr-24 outline-amber-400 text-slate-800 placeholder:text-slate-400 placeholder:font-light"
            />

            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-amber-500 hover:bg-amber-600 text-slate-200 px-4 py-1.5 rounded-full font-bold transition-colors active:scale-95 cursor-pointer">
              Add
            </button>
          </div>

          {error && (
              <p className="text-red-600 ml-3 mt-3">
                {error}
              </p>
            )}
        </form>

        <ul className="flex flex-col gap-4">
          {todoList.length === 0 && (
            <p className="text-slate-300/50 font-rajdhani italic text-xl ml-3">
              Your list is empty... Add one above
            </p>
          )}
          {todoList.length > 0 &&
            todoList.map((item) => (
              <ListItem key={item.id} itemData={item} deleteTodo={deleteTodo} toggleTodo={toggleTodo}/>
            ))}
        </ul>
      </div>
    </div>
  );
}
export default App;
