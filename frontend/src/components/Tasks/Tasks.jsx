import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './Tasks.css';

const Tasks = () => {
  const sessionUser = useSelector(state => state.session.user);
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  if (!sessionUser) {
    return <Navigate to="/login" replace />;
  }

  const handleAddTask = () => {
    if (task.trim() === '') return;
    setTasks(prev => [...prev, task.trim()]);
    setTask('');
  };

  return (
    <div className="tasks-container">
      <h1>Event Task Manager</h1>
      <p>Keep track of appointments, deadlines, and your event's day-of schedule.</p>

      <div className="add-task-form">
        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <ul className="task-list">
        {tasks.map((t, index) => (
          <li key={index}>{t}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;