import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const sessionUser = useSelector(state => state.session.user);

  if (!sessionUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome, {sessionUser.firstName}</h1>
      <p>This is your Event Dashboard where you can manage all your events in one place.</p>
      <div className="dashboard-actions">
        <button className="primary-btn">Create New Event</button>
        <button className="secondary-btn">View My Events</button>
      </div>
    </div>
  );
};

export default Dashboard;