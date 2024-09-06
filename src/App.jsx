import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { div } from "three/examples/jsm/nodes/Nodes.js";
import { motion, AnimatePresence } from "framer-motion";
import dnld from "./assets/dnld.svg"

function App() {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");

  const addtodo = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setTodo([...todo, { text: input, completed: false }]);
      setInput("");
    }
  };

  const toggletodo = (index) => {
    const newtodo = [...todo];
    newtodo[index].completed = !newtodo[index].completed;
    setTodo(newtodo);
  };

  const removetodo = (index) => {
    const newtodo = todo.filter((_, i) => i !== index);
    setTodo(newtodo);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: 'short', // 'short' to get abbreviated day name (e.g., "Fri")
      year: 'numeric',
      month: 'short', // 'short' to get abbreviated month name (e.g., "Sep")
      day: '2-digit'
    };
  
    // Format date
    const formattedDate = date.toLocaleDateString('en-US', options);
    // Get time string with "_" as separator
    const timeString = date.toTimeString().split(' ')[0].replace(/:/g, '_');
  
    return `${formattedDate}, ${timeString}`;
  };

  const downloadTasks = (index) => {
    let i = 1;
    const tasksText = todo
      .map((task) => `${i++}.${task.text} - ${task.completed ? "Completed" : "Pending"}`)
      .join('\n');
    
    const day = new Date();
    const res = formatDate(day);
    const blob = new Blob([tasksText], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `tasks_${res}_.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
    className="md:w-[50vw] bg-slate-700 text-black p-3 rounded-lg "
    initial={{ x: -10, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <h1 className="text-3xl font-bold text-white mb-6">ToDo List</h1>

      <form onSubmit={addtodo} className="flex space-x-4 mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
          className="flex-1 border-2 bg-slate-700 border-gray text-white rounded-md p-2"
        />
        <button className="border border-gray-500 bg-yellow-500 hover:bg-yellow-800 py-2 px-4 font-bold ">
          Add
        </button>
        <button
          type="button"
          onClick={downloadTasks}
          className="border border-gray-500 bg-sky-500 hover:bg-sky-600 py-2 px-4 font-bold"
        >
          <img src={dnld} alt="Download Icon" className="w-7 h-7 inline-block" />
        </button>
      </form>

      <div className="scrollable-div space-y-4 max-h-[50vh] overflow-auto">
        <AnimatePresence>
          {todo.map((todo, index) => (
            <motion.div
              key={index}
              className="gap-2 p-2 mr-1 rounded-md flex border-2 bg-slate-500 border-gray justify-around items-center"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <span
                className={` ${
                  todo.completed ? "line-through bg-slate-400 " : "bg-slate-300"
                } text-start flex-1 font-semibold rounded-lg p-3`}
              >
                {todo.text}
              </span>
              <div className="flex gap-2 sm:flex-row flex-col justify-between items-center">
                <button
                  onClick={() => toggletodo(index)}
                  className="bg-green-500 hover:bg-green-700 border border-gray-500 w-20 font-bold"
                >
                  Done
                </button>
                <button
                  onClick={() => removetodo(index)}
                  className="bg-red-500 hover:bg-red-700 border border-gray-500 w-20 font-bold"
                >
                  Kill
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default App;
