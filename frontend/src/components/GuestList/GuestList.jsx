import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './GuestList.css';

const GuestList = () => {
  const sessionUser = useSelector(state => state.session.user);
  const [guestName, setGuestName] = useState('');
  const [guests, setGuests] = useState([]);

  if (!sessionUser) {
    return <Navigate to="/login" replace />;
  }

  const handleAddGuest = () => {
    if (guestName.trim() === '') return;
    setGuests(prev => [...prev, guestName.trim()]);
    setGuestName('');
  };

  return (
    <div className="guest-list-container">
      <h1>Guest List Manager</h1>
      <p>Add your guests and manage RSVP status here.</p>
      
      <div className="add-guest-form">
        <input
          type="text"
          placeholder="Enter guest name"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
        />
        <button onClick={handleAddGuest}>Add Guest</button>
      </div>

      <ul className="guest-list">
        {guests.map((guest, index) => (
          <li key={index}>{guest}</li>
        ))}
      </ul>
    </div>
  );
};

export default GuestList;