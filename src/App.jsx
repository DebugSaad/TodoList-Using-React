
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoStirng = localStorage.getItem("todos");
    if(todoStirng){
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, [])
  

  const SaveToLS = () => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  
  const ToggleFinish = (e) => {
    setshowFinished  (!showFinished)
  }
  
  //Function to Edit a Todo
  const handleEdit = (e, id) => {
   let t = todos.filter(i => i.id === id)
   setTodo(t[0].todo);
   let newTodos = todos.filter(item => {
    return item.id !== id;
  });
   setTodos(newTodos);
   SaveToLS();
  } 
  // Function to Add a Todo
  const handleAdd = () => {
    setTodos([...todos,{id:uuidv4(),todo, isCompleted : false}])
    setTodo("")
    console.log(todos)
    SaveToLS();
  }
  // Function to Delete a Todo
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
     setTodos(newTodos);
     SaveToLS();
  }

  const handleChange = (e) =>{
    setTodo(e.target.value);
  }

  const handleCheckBox = (e) =>{
   let id = e.target.name;
   let index = todos.findIndex(item => {
    return item.id === id;
   });

   let newTodos = [...todos];
   newTodos[index].isCompleted = !newTodos[index].isCompleted;
   setTodos(newTodos);
   SaveToLS();
  }

  return (
    <>
      <Navbar/>
    <div className="md:container bg-sky-100  mx-auto my-5 rounded-xl p-4 min-h-[80vh] md:w-1/2">
      <h1 className='font-bold text-center text-xl'>iTask - Manage your tasks at one place</h1>
      <div className="addtodo my-5 flex flex-col gap-4">
        <h2 className='text-lg font-bold '>Add a Todo</h2>
        <input onChange={handleChange} value={todo} placeholder='Write your tasks' className='w-full h-10 rounded-lg outline-none p-2' type="text" />
        <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-cyan-400 px-4 py-2  text-white font-bold cursor-pointer rounded-xl hover:bg-cyan-500 transition-all'>Save</button>
      </div>
      <input className='my-4' onChange={ToggleFinish} type="checkbox" checked={showFinished}/> Show Finished
      <h2 className='text-lg font-bold'>Your Todos</h2>
      <div className="todos">
        {todos.length === 0 && <div className='my-5'>No Todo to Display</div>}
        {todos.map(item => {        
       return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-full my-3 justify-between items-center">
        <div className='flex gap-7'>
        <input name={item.id} onChange={handleCheckBox} type="checkbox" checked={item.isCompleted}  id="" />
        <div className={item.isCompleted?'line-through':''}>{item.todo}</div>
        </div>
        <div className="buttons flex h-full">
          <button onClick={(e) => handleEdit(e, item.id)} className='bg-cyan-400 font-bold px-4 py-2 mx-3 text-white  rounded-xl hover:bg-cyan-500 transition-all'><FaEdit /></button>
          <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-cyan-400 font-bold px-4 py-2 mx-3 text-white  rounded-xl hover:bg-cyan-500 transition-all'><MdDelete />
          </button>
        </div>
        </div>
        })}
      </div>
    </div>
    </>
  )
}

export default App
