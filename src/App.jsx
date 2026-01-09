import { useState } from "react"
import { nanoid } from "nanoid"
import ListItem from "./components/ListItem"


function App() {

  const [todoList, setTodoList] = useState([
    {id: nanoid(8), content: "item 1"},
    {id: nanoid(8), content: "item 2"},
    {id: nanoid(8), content: "item 3"}
  ])

  const [task, setTask] = useState("")

  function deleteTodo(id){
    setTodoList(todoList.filter(todo => todo.id !== id))
  }

  function handleSubmit(e){
    e.preventDefault()

    setTodoList([...todoList, {id: nanoid(8), content: task}])
    setTask("")
  }

  return (
    <div className="h-screen">
      <div className="max-w-4xl mx-auto pt-20 px-6">
        <h1 className="text-4xl text-slate-100 mb-10 text-center font-roboto">My todo-list</h1>

        <form 
          onSubmit={handleSubmit}
          className="mb-10">

          <label htmlFor="todo-item" className="text-amber-500 font-poppins text-xl ml-3  ">Add task</label>

          <div className="relative mt-3">

            <input 
              value={task}
              onChange={e => setTask(e.target.value)}
              type="text" 
              placeholder="New Task..."
              className="bg-slate-50 block w-full rounded-full py-3 px-6 pr-24 outline-green-400 text-slate-800 placeholder:text-slate-400 placeholder:font-light" />
              
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-500 hover:bg-green-600 text-slate-200 px-4 py-1.5 rounded-full font-bold transition-colors active:scale-95">Add</button>

          </div>
        </form>

        <ul className="flex flex-col gap-4">
          {todoList.length === 0 && (
            <p className="text-slate-300/50 font-rajdhani italic text-xl ml-3">Your list is empty... Add one above</p>
          )}
          {todoList.length > 0 && todoList.map(item => (
          <ListItem key={item.id} itemData={item} deleteTodo={deleteTodo}/>
          ))}
        </ul>

      </div>
    </div>
  )
}
export default App