import React from 'react'
import TaskForm from './component/TaskForm'
export default function App() {
  return (
    <div>
        <h1>Task Focus</h1>
        <p>A Friendly Task Manager</p>
        <TaskForm />
        <button>Clear All Tasks</button>

    </div>
  )
}
