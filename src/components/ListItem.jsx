import { useState } from "react";

export default function ListItem({
  itemData,
  deleteTodo,
  toggleTodo,
  updateTodo,
  darkMode,
}) {
  // 🧠 LOCAL STATE

  // 3. Is the user currently editing this specific task?
  // false = View mode (text)
  // true = Edit mode (input)
  const [isEditing, setIsEditing] = useState(false);

  // 4. Temporary memory for what the user is typing
  // We initialize it with the current content of the task
  const [editedContent, setEditedContent] = useState(itemData.content);

  // Controls the visibility of the "Are you sure?" popup
  const [showModal, setShowModal] = useState(false);

  // 💾 SAVE FUNCTION
  function handleSave() {
    // 1. Validation: Prevent saving empty text
    if (editedContent.trim() === "") {
      return; // Do nothing if empty
    }

    // 2. Call the parent function to update the global list
    updateTodo(itemData.id, editedContent);

    // 3. Exit edit mode to go back to the list view
    setIsEditing(false);
  }

  return (
    <li
      onClick={() => {
        if (!isEditing) {
          toggleTodo(itemData.id);
        }
      }}
      className={`flex items-center justify-between  p-4 rounded-2xl border  ${
        darkMode
          ? itemData.completed
            ? "border-green-900 hover:border-green-400/50 bg-slate-800/50"
            : "border-pink-700 hover:border-pink-400/50 bg-slate-800/50"
          : itemData.completed
            ? "border-green-700 hover:bg-green-400/50 bg-slate-200/50"
            : "border-pink-500 hover:bg-pink-400/50 bg-slate-200/50"
      } 
      transition-all group ${isEditing ? "cursor-default" : "cursor-pointer"}`}
    >
      {isEditing ? (
        <div className="flex items-center gap-2 w-full">
          <input
            value={editedContent}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setEditedContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSave();
              }
            }}
            className={`w-full bg-transparent focus:outline-none px-2 py-1 text-lg font-inter ${
              darkMode
                ? "text-slate-100 border-slate-500"
                : "text-slate-900 border-slate-400"
            }`}
            autoFocus
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSave();
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-lg font-semibold ml-2 transition-colors"
          >
            Save
          </button>
        </div>
      ) : (
        <>
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

          <div className="flex items-center gap-2">
            {/* ✏️ EDIT BUTTON */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Stop click from bubbling to parent (toggle)
                setIsEditing(true); // Activate Edit Mode
              }}
              className={`transition-colors opacity-0 group-hover:opacity-100 px-2 py-1 font-mono text-sm cursor-pointer ${
                darkMode
                  ? "text-slate-400 hover:text-blue-400"
                  : "text-slate-500 hover:text-blue-600 font-semibold"
              }`}
            >
              Edit
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
              }}
              className={`  transition-colors opacity-0 group-hover:opacity-100 px-3 py-1 font-mono text-sm cursor-pointer ${
                darkMode
                  ? "text-slate-200 hover:text-red-400"
                  : "text-slate-600 hover:text-red-500 font-semibold"
              }`}
            >
              Delete
            </button>
          </div>
        </>
      )}

      {/* 👇 CONFIRMATION MODAL 👇 */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={(e) => {
            e.stopPropagation(); // Stop click propagation
            setShowModal(false); // Close modal when clicking outside (overlay)
          }}
        >
          {/* White Box */}
          <div
            className={`${darkMode ? "bg-slate-400 border-slate-600" : "bg-white border-slate-200"} p-6 rounded-lg shadow-xl border w-80`}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the box
          >
            <h3 className="text-xl font-bold text-slate-800 mb-6">
              Are you sure ?
            </h3>

            <div className="flex justify-around gap-3">
              {/* CANCEL BUTTON */}
              <button
                onClick={() => setShowModal(false)} // Close modal
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded font-bold text-sm transition-colors"
              >
                NO
              </button>

              {/* CONFIRM BUTTON */}
              <button
                onClick={() => {
                  deleteTodo(itemData.id); // 🔥 The actual delete action
                  setShowModal(false); // Close modal
                }}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded font-semibold text-sm transition-colors"
              >
                YES
              </button>
            </div>
          </div>
        </div>
      )}
      {/* 👆 END OF MODAL 👆 */}
    </li>
  );
}
