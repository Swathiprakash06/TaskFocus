import { useState } from "react"
export default function Taskform({addTask}) {
    const[task, setTask] = useState('');
    const [priority, setPriority] = useState('medium');
    const [category, setCategory] = useState('general');
    const handlesubmit = (e) => {
        e.preventDefault(); //refresh
        addTask({text: task, priority, category, completed: false});
        //reset
        setTask('');
        setPriority('medium');
        setCategory('general');
    }
    return(
        <form onSubmit={handlesubmit} className="task-form">
            <div id="inp">
                <input className="task-input" type="text" placeholder="Enter your task" 
                value={task}
                onChange={(e) => setTask(e.target.value)}/>
                <button 
                    type="submit" 
                    disabled={task.trim() === ''}>Add Task</button>
                {/* <h1>{task} {priority} {category}</h1> */}
            </div><br></br>
            <div id="btns">
                <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
                <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="general">General</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                </select>
            </div>
        </form>
    )
}