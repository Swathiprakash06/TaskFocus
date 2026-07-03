import Taskform from "./component/TaskForm";
import TaskList from "./component/TaskList";
import Progresstracker from "./component/ProgressTracker";
import { useEffect, useState, useRef } from "react";
import "./Style.css"

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [toastTaskIndex, setToastTaskIndex] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationPermission, setNotificationPermission] = useState('default');
  const repeatRef = useRef(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    if (Array.isArray(savedTasks)) {
      setTasks(savedTasks);
    }
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        setNotificationPermission(permission);
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const checkDueTasks = () => {
      const now = Date.now();
      let updated = false;
      const nextTasks = tasks.map((task, index) => {
        if (task.completed || task.notified || !task.dueTime) return task;
        const dueDate = new Date(task.dueTime).getTime();
        if (!Number.isNaN(dueDate) && now >= dueDate) {
          triggerNotification(`Task due: ${task.text}`, index);
          updated = true;
          return { ...task, notified: true };
        }
        return task;
      });
      if (updated) {
        setTasks(nextTasks);
      }
    };

    if (tasks.length === 0) return;
    checkDueTasks();
    const interval = setInterval(checkDueTasks, 5000);
    return () => clearInterval(interval);
  }, [tasks]);

  const playSound = () => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const context = new AudioContext();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = 880;
      gain.gain.value = 0.22;
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.2);
      oscillator.onended = () => context.close();
    } catch (error) {
      console.warn('Sound playback not available', error);
    }
  };

  const startRepeatSound = () => {
    if (repeatRef.current) {
      clearInterval(repeatRef.current);
      repeatRef.current = null;
    }
    // play immediately then every 10 seconds
    playSound();
    repeatRef.current = setInterval(() => {
      playSound();
    }, 10000);
  };

  const triggerNotification = (message, index) => {
    setToastMessage(message);
    setToastTaskIndex(index);
    // start repeating sound until dismissed or snoozed
    startRepeatSound();
    if (notificationPermission === 'granted' && 'Notification' in window) {
      const notification = new Notification(message, {
        tag: `task-due-${index}`,
        renotify: true,
      });
      notification.onclick = () => window.focus();
    }
  };

  const dismissToast = () => {
    setToastMessage('');
    setToastTaskIndex(null);
    if (repeatRef.current) {
      clearInterval(repeatRef.current);
      repeatRef.current = null;
    }
  };

  const snoozeTask = (index) => {
    const snoozeMinutes = 5;
    setTasks((currentTasks) =>
      currentTasks.map((task, i) => {
        if (i !== index) return task;
        const newDueTime = new Date(Date.now() + snoozeMinutes * 60000).toISOString();
        return {
          ...task,
          dueTime: newDueTime,
          notified: false,
        };
      })
    );
    setToastMessage(`Task snoozed for ${snoozeMinutes} minutes`);
    setToastTaskIndex(null);
    if (repeatRef.current) {
      clearInterval(repeatRef.current);
      repeatRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (repeatRef.current) {
        clearInterval(repeatRef.current);
        repeatRef.current = null;
      }
    };
  }, []);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  }

  const updateTask = (updatedTask, index) => {
    const newtask = [...tasks];
    newtask[index] = updatedTask;
    setTasks(newtask);
  }

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  const clearTasks = () => {
    setTasks([]);
  }

  return(
    <div className="App">
      <header>
        <h1 className="title">Prioritize Pro</h1>
        <p className="tagline"><b>Our friendly TaskManager</b></p>
        <div className="notification-settings">
          <label>
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(e) => setSoundEnabled(e.target.checked)}
            />
            Sound on
          </label>
          <span className="notice-text">
            Notifications will appear even if the tab is minimized when permissions are granted.
          </span>
        </div>
        <Taskform addTask={addTask} />
        <TaskList
          tasks={tasks}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
        <Progresstracker tasks={tasks} />
        {tasks.length > 0 && (
          <div className="clear-tasks-container">
            <button onClick={clearTasks}>Clear all tasks</button>
          </div>
        )}
      </header>
      {toastMessage && (
        <div className="toast-overlay">
          <div className="toast-notification">
            <div>{toastMessage}</div>
            <div className="toast-actions">
              <button onClick={dismissToast}>Dismiss</button>
              {toastTaskIndex !== null && (
                <button className="snooze-button" onClick={() => snoozeTask(toastTaskIndex)}>
                  Snooze 5 min
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
