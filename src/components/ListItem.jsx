export default function ListItem({
  itemData,
  deleteTodo,
  toggleTodo,
  darkMode,
}) {
  return (
    <li
      onClick={() => toggleTodo(itemData.id)}
      className={`flex items-center justify-between  p-4 rounded-2xl border  ${
        darkMode
          ? itemData.completed
            ? "border-green-900 hover:border-green-400/50 bg-slate-800/50"
            : "border-pink-700 hover:border-pink-400/50 bg-slate-800/50"
          : itemData.completed
          ? "border-green-700 hover:bg-green-400/50 bg-slate-200/50"
          : "border-pink-500 hover:bg-pink-400/50 bg-slate-200/50"
      } 
      transition-all group cursor-pointer`}
    >
      <div className="flex items-center gap-4">
        <div className="cursor-pointer">
          {itemData.completed ? (
            <div
              className={`text-green-500 text-xs 
              ${darkMode ? "font-semibold" : "font-extrabold"}`}
            >
              ✓
            </div>
          ) : (
            <div
              className={`h-2 w-2 rounded-full bg-pink-400 shadow-pink-500`}
            />
          )}
        </div>

        <span
          className={` font-inter text-lg ${
            darkMode ? "text-slate-100" : "text-slate-900"
          }`}
        >
          {itemData.content}
        </span>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          deleteTodo(itemData.id);
        }}
        className={`  transition-colors opacity-0 group-hover:opacity-100 px-3 py-1 font-mono text-sm cursor-pointer ${
          darkMode
            ? "text-slate-200 hover:text-red-400"
            : "text-slate-600 hover:text-red-500 font-semibold"
        }`}
      >
        Delete
      </button>
    </li>
  );
}
