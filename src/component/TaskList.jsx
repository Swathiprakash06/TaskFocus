export default function TaskList({tasks, updateTask, deleteTask}) {
  const priorityOrder = { 'high': 1, 'medium': 2, 'low': 3 };
  const sortedTasks = tasks
    .map((task, index) => ({ task, index }))
    .sort((a, b) => priorityOrder[a.task.priority] - priorityOrder[b.task.priority]);

  const toggleComplete = (index) => {
    const updatedTask = { ...tasks[index], completed: !tasks[index].completed };
    updateTask(updatedTask, index);
  }

  const formatDueTime = (dueTime) => {
    if (!dueTime) return null;
    const date = new Date(dueTime);
    if (Number.isNaN(date.getTime())) return null;
    return date.toLocaleString();
  }

  return (
    <ul className="task-list">
      {sortedTasks.map(({ task, index }) => {
        const due = formatDueTime(task.dueTime);
        const isOverdue = task.dueTime && !task.completed && new Date(task.dueTime).getTime() <= Date.now();
        return (
          <li
            key={index}
            className={`${task.completed ? "completed" : ""} task-priority-${task.priority} ${isOverdue ? 'overdue' : ''}`}>
            <div>
              <span>{task.text}
                <small className="task-info">({task.priority} · {task.category})</small>
              </span>
              {due && <div className="due-info">Due: {due}</div>}
            </div>
            <div className="button">
              <button id="complete" onClick={() => toggleComplete(index)}>{task.completed ? "Undo" : "Complete"}</button>
              <button id="delete" onClick={() => deleteTask(index)}>Delete</button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
