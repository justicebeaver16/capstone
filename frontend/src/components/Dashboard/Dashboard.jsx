import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { selectAllTasks } from '../../store/slices/tasksSlice';
import EditEventFormModal from './EditEventFormModal';
import CreateEventFormModal from './CreateEventFormModal';
import './Dashboard.css';

const Dashboard = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const reduxTasks = useSelector(selectAllTasks);
  const [events, setEvents] = useState([]);
  const [activeEvent, setActiveEvent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Utility function matching your model's permission logic
  const canEditEvent = (user) => {
    if (!user) return false;
    const editRoles = ['admin', 'bride', 'groom', 'event_planner'];
    return (
      editRoles.includes(user.role) ||
      (user.role === 'planning_team' && ['edit', 'full'].includes(user.planningPermissions))
    );
  };

  useEffect(() => {
    if (!sessionUser) return;

    const fetchDashboardData = async () => {
      try {
        const res = await fetch('/api/events/current');
        if (!res.ok) throw new Error('Failed to fetch events');
        const data = await res.json();

        const enrichedEvents = await Promise.all(
          (data.Events || []).map(async (event) => {
            const [vendorsRes, guestsRes, tasksRes] = await Promise.all([
              fetch(`/api/vendors/${event.id}`),
              fetch(`/api/guestlist/${event.id}`),
              fetch(`/api/schedule/${event.id}`)
            ]);

            const vendors = vendorsRes.ok ? await vendorsRes.json() : [];
            const guests = guestsRes.ok ? (await guestsRes.json()).Guests || [] : [];
            const tasks = tasksRes.ok ? (await tasksRes.json()).Schedule || [] : [];

            return { ...event, vendors, guests, tasks };
          })
        );

        setEvents(enrichedEvents);
      } catch (error) {
        console.error('Dashboard fetch error:', error);
      }
    };

    fetchDashboardData();
  }, [sessionUser]);

  const handleCloseModal = () => {
    setShowEditModal(false);
    setShowCreateModal(false);
    setActiveEvent(null);
    setTimeout(() => setMessage(''), 3000);
  };

  if (!sessionUser) return <Navigate to="/login" replace />;

  return (
    <div className="dashboard-container">
      <h1>Welcome, {sessionUser.name}</h1>

      {message && <div className="confirmation-message">{message}</div>}

      {canEditEvent(sessionUser) && (
        <div className="dashboard-actions">
          <button onClick={() => setShowCreateModal(true)} className="dashboard-link-button">
            Create New Event
          </button>
        </div>
      )}

      <div className="dashboard-grid">
        {events.length > 0 ? events.map((event) => (
          <div className="event-card" key={event.id}>
            <section className="dashboard-section">
              <h2>{event.title}</h2>
              <p><strong>Date:</strong> {event.date?.split('T')[0] || 'TBD'}</p>
              <p><strong>Location:</strong> {`${event.address || ''}, ${event.city || ''}, ${event.state || ''} ${event.zipCode || ''}`}</p>
              <p><strong>Status:</strong> {event.status || 'Unknown'}</p>
              {canEditEvent(sessionUser) && (
                <button onClick={() => { setActiveEvent(event); setShowEditModal(true); }} className="dashboard-link-button">
                  Edit Event
                </button>
              )}
            </section>

            <section className="dashboard-section">
              <h3>Guest List</h3>
              {event.guests && event.guests.length > 0 ? (
                <ul>
                  {event.guests.map(guest => (
                    <li key={guest.id}>{guest.name}</li>
                  ))}
                </ul>
              ) : <p>No guests yet.</p>}
              <button
  className="dashboard-link-button"
  onClick={() => navigate('/guest-list')}
>
  Add Guests
</button>
            </section>

            <section className="dashboard-section">
              <h3>Tasks</h3>
              {reduxTasks && reduxTasks.length > 0 ? (
  <ul>
    {reduxTasks.map((task, index) => (
      <li key={index}>{typeof task === 'string' ? task : task.title}</li>
    ))}
  </ul>
) : <p>No tasks yet.</p>}
              <button
  className="dashboard-link-button"
  onClick={() => navigate('/tasks')}
>
  Add Tasks
</button>
            </section>

            <section className="dashboard-section">
              <h3>Vendors</h3>
              {event.vendors && event.vendors.length > 0 ? (
                <ul>
                  {event.vendors.map(vendor => (
                    <li key={vendor.id}>
                      {vendor.name} – {vendor.category} [{vendor.status}]
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No vendors added yet.</p>
              )}
              <button
                className="dashboard-link-button"
                onClick={() => navigate('/vendors')}
              >
                View Vendors
              </button>
            </section>
          </div>
        )) : <p>No events yet.</p>}
      </div>

      {showEditModal && activeEvent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <EditEventFormModal
              key={activeEvent.id}
              eventData={activeEvent}
              onSubmit={async (updatedData) => {
                try {
                  const csrfToken = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('XSRF-TOKEN='))
                    ?.split('=')[1];

                  const res = await fetch(`/api/events/${activeEvent.id}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                      'X-CSRF-Token': csrfToken
                    },
                    body: JSON.stringify(updatedData)
                  });

                  if (res.ok) {
                    const updated = await res.json();
                    setEvents(events.map(ev => ev.id === updated.id ? { ...ev, ...updated } : ev));
                    setMessage('Event successfully updated!');
                    handleCloseModal();
                  } else {
                    console.error('Failed to update event.');
                  }
                } catch (err) {
                  console.error('Update error:', err);
                }
              }}
              onCancel={handleCloseModal}
              onDelete={async () => {
  try {
    const csrfToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1];

    const res = await fetch(`/api/events/${activeEvent.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      }
    });

    const data = await res.json();
    console.log('DELETE RESPONSE:', data);

    if (res.ok) {
  setEvents(events.filter(ev => ev.id !== activeEvent.id));
  setMessage('Event successfully deleted.');
  handleCloseModal();
} else {
  console.error('Failed to delete event:', data);
  setMessage(data?.message || 'Failed to delete event. Please try again.');
  setShowEditModal(false);
}
  } catch (err) {
  console.error('Delete error:', err);
  setMessage('An unexpected error occurred while deleting the event.');
  setShowEditModal(false);
}
}}
            />
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <CreateEventFormModal
              onSubmit={(newEvent) => {
                setEvents([...events, newEvent]);
                setMessage('Event successfully created!');
                handleCloseModal();
              }}
              onCancel={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;