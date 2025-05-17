import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const [eventData, setEventData] = useState(null);
  const [guestList, setGuestList] = useState([]);
  const [seatingPreview, setSeatingPreview] = useState('');
  const [tasks, setTasks] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    if (!sessionUser) return;

    const fetchDashboardData = async () => {
      try {
        const [
          eventRes,
          guestsRes,
          seatingRes,
          tasksRes,
          photosRes,
          vendorsRes
        ] = await Promise.all([
          fetch('/api/dashboard/event-overview'),
          fetch('/api/dashboard/guestlist-preview'),
          fetch('/api/dashboard/seating-preview'),
          fetch('/api/dashboard/tasks-preview'),
          fetch('/api/dashboard/photos-preview'),
          fetch('/api/dashboard/vendors-preview')
        ]);

        const event = await eventRes.json();
        const guests = await guestsRes.json();

        let seatingPreviewText = 'You do not have access to view seating.';
        if (seatingRes.ok) {
          const seating = await seatingRes.json();
          seatingPreviewText = seating?.preview || 'No seating chart set up yet.';
        }

        const tasksData = await tasksRes.json();
        const photosData = await photosRes.json();
        if (vendorsRes.ok) {
          const vendorsData = await vendorsRes.json();
          setVendors(Array.isArray(vendorsData) ? vendorsData : []);
        } else {
          console.error('Failed to load vendors preview');
        }

        setEventData(event);
        setGuestList(Array.isArray(guests) ? guests : []);
        setSeatingPreview(seatingPreviewText);
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

      <div className="dashboard-grid">
        <section className="dashboard-section">
          <h2>Event Overview</h2>
          <p><strong>Event:</strong> {eventData?.name || 'Unnamed Event'}</p>
          <p><strong>Date:</strong> {eventData?.date || 'TBD'}</p>
          <p><strong>Location:</strong> {eventData?.location || 'Not set'}</p>
          <p><strong>Status:</strong> {eventData?.status || 'Unknown'}</p>
          <Link to="/dashboard" className="dashboard-link-button">Edit Event</Link>
        </section>

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
          <Link to="/guest-list" className="dashboard-link-button">Edit Guest List</Link>
        </section>

        <section className="dashboard-section">
          <h2>Seating Chart Preview</h2>
          <p>{seatingPreview}</p>
          <Link to="/seating" className="dashboard-link-button">View Seating Chart</Link>
        </section>

        <section className="dashboard-section">
          <h2>Tasks To Do</h2>
          {tasks.length > 0 ? (
            <ul>
              {tasks.map((task) => (
                <li key={task.id}>
                  {task.title}
                  {task.Member && (
                    <span style={{ fontSize: '0.9em', color: '#666' }}>
                      {' '}– assigned to {task.Member.name} ({task.Member.role})
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks yet.</p>
          )}
          <Link to="/tasks" className="dashboard-link-button">Edit Tasks</Link>
        </section>

        <section className="dashboard-section">
          <h2>Vendors</h2>
          {vendors.length > 0 ? (
            <ul>
              {vendors.map((vendor) => (
                <li key={vendor.id}>
                  {vendor.name} – {vendor.category} [{vendor.status}]
                </li>
              ))}
            </ul>
          ) : (
            <p>No vendors added yet.</p>
          )}
          <Link to="/vendors" className="dashboard-link-button">View Vendors</Link>
        </section>

        <section className="dashboard-section">
          <h2>Photo Album Preview</h2>
          {photos.length > 0 ? (
            <div className="photo-preview">
              {photos.map((photo) => (
                <img
                  key={photo.id}
                  src={photo.imageUrl}
                  alt={photo.description || 'Event photo'}
                />
              ))}
            </div>
          ) : (
            <p>No photos yet.</p>
          )}
          <Link to="/photo-album" className="dashboard-link-button">View Photo Album</Link>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;