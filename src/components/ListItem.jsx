export default function ListItem({ itemData, deleteTodo, toggleTodo }) {
  return (
    <li
      onClick={() => toggleTodo(itemData.id)}
      className={`flex items-center justify-between bg-slate-800/50 p-4 rounded-2xl border ${
        itemData.completed
          ? "border-green-700 hover:border-green-400/50"
          : "border-slate-700 hover:border-pink-400/50"
      } transition-all group cursor-pointer`}
    >
      <div className="flex items-center gap-4">
        <div className="cursor-pointer">
          {itemData.completed ? (
            <div className=" text-green-500 text-xs font-semibold">✓</div>
          ) : (
            <div className="h-2 w-2 rounded-full bg-pink-400 shadow-pink-500" />
          )}
        </div>

        <span className="text-slate-100 font-inter text-lg">
          {itemData.content}
        </span>
      </div>

      <button
        onClick={() => deleteTodo(itemData.id)}
        className="text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 px-3 py-1 font-mono text-sm cursor-pointer"
      >
        Delete
      </button>
    </li>
  );
}
