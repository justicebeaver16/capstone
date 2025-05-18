import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  addTask,
  // deleteTask,
  selectAllTasks
} from '../../store/slices/tasksSlice';
import './Tasks.css';

const Tasks = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const tasks = useSelector(selectAllTasks);
  const [taskInput, setTaskInput] = useState('');
  const [taskSuccess, setTaskSuccess] = useState(null);

  useEffect(() => {
    if (taskSuccess) {
      const timeout = setTimeout(() => setTaskSuccess(null), 2000);
      return () => clearTimeout(timeout);
    }
  }, [taskSuccess]);

  const handleAddTask = () => {
    const trimmed = taskInput.trim();
    if (trimmed === '') return;
    dispatch(addTask(trimmed));
    setTaskInput('');
    setTaskSuccess('Task added successfully!');
  };

  // const handleDeleteTask = (index) => {
  //   dispatch(deleteTask(index));
  // };

  if (!sessionUser) return <Navigate to="/login" replace />;

  return (
    <div className="tasks-container">
      <h1>Event Task Manager</h1>
      <p>Keep track of appointments, deadlines, and your event&apos;s day-of schedule.</p>

      {taskSuccess && (
        <p className="success-message">{taskSuccess}</p>
      )}

      <div className="add-task-form">
        <input
          type="text"
          placeholder="Enter task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      {tasks.length > 0 ? (
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index}>
              {task}
              {/* <button onClick={() => handleDeleteTask(index)} title="Delete Task">❌</button> */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks added yet.</p>
      )}
    </div>
  );
};

export default Tasks;