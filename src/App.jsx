import Taskform from "./component/TaskForm";
import TaskList from "./component/TaskList";
import Progresstracker from "./component/ProgressTracker";
import { useEffect, useState } from "react";
import "./Style.css"
export default function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    localStorage.setItem
    ("tasks", JSON.stringify(tasks))
  });
  const addTask = (task) => {
    setTasks([...tasks,task]);
  }
  const updateTask = (updatedTask, index) => {
     const newtask = [...tasks];
     newtask[index] = updatedTask;
     setTasks(newtask);
  }
  const deleteTask = (index) => {
     setTasks(tasks.filter((_, i) => i != index));
  }
  const clearTasks = () => {
     setTasks([]);
  }
  const priorityOrder = { 'high': 1, 'medium': 2, 'low': 3 };
  const sortedTasks = [...tasks].sort((a, b) => {
      // Sort: High (1) comes before Medium (2), Medium comes before Low (3)
      return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
  return(
    <div className="App">
      <header>
      <h1 className="title">Prioritize Pro</h1>
      <p className="tagline"><b>Our friendly TaskManager</b></p>
      <Taskform addTask = {addTask}/>
      <TaskList 
      tasks = {sortedTasks}
      updateTask = {updateTask} 
      deleteTask = {deleteTask}/>
      <Progresstracker tasks = {tasks}/>
      {tasks.length>0 && (
          <div className="clear-tasks-container"> 
            <button onClick={clearTasks}>Clear all tasks</button>
          </div>
      )}
      </header>
    </div>
  )
}
