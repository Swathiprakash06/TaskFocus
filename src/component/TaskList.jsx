// export default function TaskList({tasks , updateTask, deleteTask}) {
//  const toggleComplete =(index) => {
//   const updatedTask = {...tasks[index], completed: !tasks[index].completed};
//   updateTask(updatedTask, index);
//  }
//   return (
//     <ul className="task-list">
//       {tasks.map((task, index)=> (
//          <li key={index} 
//           className={task.completed ? "completed" : ""}
//         // className={`task-item ${task.priority === "high" ? "high-priority" : ""}`}
//         >
//           <div>
//             <span>{task.text}
//               <small className="task-info">({task.priority} , {task.category})</small>
//             </span>
//           </div>
//           <div className="button">
//             <button    id="complete" onClick={() => toggleComplete(index)}>{task.completed ? "Undo" : "Complete"}</button>
//             <button id="delete" onClick={() => deleteTask(index)}>Delete</button>
//           </div>

//         </li>
//       ))}
//     </ul>
//   )
// }

export default function TaskList({tasks , updateTask, deleteTask}) {
 const toggleComplete =(index) => {
  const updatedTask = {...tasks[index], completed: !tasks[index].completed};
  updateTask(updatedTask, index);
 }
  return (
    <ul className="task-list">
      {tasks.map((task, index)=> (
         <li key={index} 
          // CORRECTION: Add a class based on priority for styling
          className={`${task.completed ? "completed" : ""} task-priority-${task.priority}`} 
        >
          <div>
            <span>{task.text}
              <small className="task-info">({task.priority} , {task.category})</small>
            </span>
          </div>
          <div className="button">
            <button    id="complete" onClick={() => toggleComplete(index)}>{task.completed ? "Undo" : "Complete"}</button>
            <button id="delete" onClick={() => deleteTask(index)}>Delete</button>
          </div>

        </li>
      ))}
    </ul>
  )
}
