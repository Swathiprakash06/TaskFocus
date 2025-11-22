import React from 'react'
import TaskList from './TaskList';

function ProgressTracker({tasks}) {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totaltasks = tasks.length;
  const progress = totaltasks === 0 ? 0 : (completedTasks / totaltasks) * 100;
  return (
  <div className='progress-tracker'>
      <p>
        {completedTasks} of {totaltasks} tasks completed
      </p>
      <div className='progress-bar'>
        <div
        className="progress"
        style = {{ width: `${progress}%`}}>
        </div>
      </div>
  </div>
  );
}
export default ProgressTracker;