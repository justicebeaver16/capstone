import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const [eventData, setEventData] = useState(null);
  const [guestList, setGuestList] = useState([]);
  // const [seatingPreview, setSeatingPreview] = useState('');
  const [tasks, setTasks] = useState([]);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (!sessionUser) return;

    const fetchDashboardData = async () => {
      try {
        const [eventRes, guestsRes, tasksRes, photosRes] = await Promise.all([
          fetch('/api/dashboard/event-overview'),
          fetch('/api/dashboard/guestlist-preview'),
          // fetch('/api/dashboard/seating-preview'),
          fetch('/api/dashboard/tasks-preview'),
          fetch('/api/dashboard/photos-preview'),
        ]);

        const event = await eventRes.json();
        const guests = await guestsRes.json();
        // const seating = await seatingRes.json();
        const tasksData = await tasksRes.json();
        const photosData = await photosRes.json();

        setEventData(event);
        setGuestList(Array.isArray(guests) ? guests : []);
        // setSeatingPreview(seating?.preview || 'No seating chart set up yet.');
        setTasks(Array.isArray(tasksData) ? tasksData : []);
        setPhotos(Array.isArray(photosData) ? photosData : []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, [sessionUser]);

  if (!sessionUser) return <Navigate to="/login" replace />;
  if (!eventData) return <p>Loading your event dashboard...</p>;

  return (
    <div className="dashboard-container">
      <h1>Welcome, {sessionUser.name}</h1>

      {/* Event Overview */}
      <section className="dashboard-section">
        <h2>Event Overview</h2>
        <p><strong>Event:</strong> {eventData.name}</p>
        <p><strong>Date:</strong> {eventData.date}</p>
        <p><strong>Location:</strong> {eventData.location}</p>
        <p><strong>Status:</strong> {eventData.status}</p>
        <Link to="/dashboard" className="dashboard-link-button">
          Edit Event
        </Link>
      </section>

      {/* Guest List Preview */}
      <section className="dashboard-section">
        <h2>Guest List Preview</h2>
        {guestList.length > 0 ? (
          <ul>
            {guestList.map((guest) => (
              <li key={guest.id}>{guest.name}</li>
            ))}
          </ul>
        ) : (
          <p>No guests yet.</p>
        )}
        <Link to="/guest-list" className="dashboard-link-button">
          Edit Guest List
        </Link>
      </section>

      {/* Seating Chart Preview
      <section className="dashboard-section">
        <h2>Seating Chart Preview</h2>
        <p>{seatingPreview}</p>
        <Link to="/seating" className="dashboard-link-button">
          View Seating Chart
        </Link>
      </section> */}

      {/* Tasks Preview */}
      <section className="dashboard-section">
        <h2>Tasks To Do</h2>
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>{task.title}</li>
            ))}
          </ul>
        ) : (
          <p>No tasks yet.</p>
        )}
        <Link to="/tasks" className="dashboard-link-button">
          Edit Tasks
        </Link>
      </section>

      {/* Photo Album Preview */}
      <section className="dashboard-section">
        <h2>Photo Album Preview</h2>
        {photos.length > 0 ? (
          <div className="photo-preview">
            {photos.map((photo) => (
              <img
                key={photo.id}
                src={photo.url}
                alt={photo.description || 'Event photo'}
              />
            ))}
          </div>
        ) : (
          <p>No photos yet.</p>
        )}
        <Link to="/photo-album" className="dashboard-link-button">
          View Photo Album
        </Link>
      </section>

      {/* Vendor Attachments Placeholder */}
      <section className="dashboard-section">
        <h2>Vendor Attachments</h2>
        <Link to="/vendors" className="dashboard-link-button">
          View Vendor Attachments
        </Link>
      </section>
    </div>
  );
};

export default Dashboard;

// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';
// import './Dashboard.css';

// const Dashboard = () => {
//   const sessionUser = useSelector(state => state.session.user);

//   if (!sessionUser) {
//     return <Navigate to="/login" replace />;
//   }

//   return (
//     <div className="dashboard-container">
//       <h1>Welcome, {sessionUser.firstName}</h1>
//       <p>This is your Event Dashboard where you can manage all your events in one place.</p>
//       <div className="dashboard-actions">
//         <button className="primary-btn">Create New Event</button>
//         <button className="secondary-btn">View My Events</button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;