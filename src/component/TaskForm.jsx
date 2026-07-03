import { useState } from "react"
export default function Taskform({addTask}) {
    const [task, setTask] = useState('');
    const [priority, setPriority] = useState('medium');
    const [category, setCategory] = useState('general');
    const [dueTime, setDueTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask({
            text: task,
            priority,
            category,
            dueTime,
            completed: false,
            notified: false,
        });
        setTask('');
        setPriority('medium');
        setCategory('general');
        setDueTime('');
    }

    return(
        <form onSubmit={handleSubmit} className="task-form">
            <div id="inp">
                <input
                    className="task-input"
                    type="text"
                    placeholder="Enter your task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button
                    type="submit"
                    disabled={task.trim() === ''}
                >Add Task</button>
            </div>
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
                <input
                    id="dueTime"
                    type="datetime-local"
                    value={dueTime}
                    onChange={(e) => setDueTime(e.target.value)}
                    title="Set a due date and time"
                />
            </div>
        </form>
    )
}