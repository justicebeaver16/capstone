import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  fetchGuests,
  createGuest,
  selectAllGuests
} from '../../store/slices/guestsSlice';
import './GuestList.css';

const GuestList = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const guests = useSelector(selectAllGuests);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);
  const [statusType, setStatusType] = useState(null); // 'success' or 'error'

  useEffect(() => {
    if (!sessionUser) return;
    dispatch(fetchGuests());
  }, [dispatch, sessionUser]);

  useEffect(() => {
    if (statusMessage) {
      const timeout = setTimeout(() => {
        setStatusMessage(null);
        setStatusType(null);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [statusMessage]);

  const handleAddGuest = () => {
    const trimmedName = guestName.trim();
    const trimmedEmail = guestEmail.trim();
    if (!trimmedName || !trimmedEmail) {
      setStatusMessage('Name and email are required.');
      setStatusType('error');
      return;
    }

    dispatch(createGuest({ primaryName: trimmedName, primaryEmail: trimmedEmail }))
      .unwrap()
      .then(() => {
        setGuestName('');
        setGuestEmail('');
        setStatusMessage('Guest added successfully!');
        setStatusType('success');
      })
      .catch(() => {
        setStatusMessage('Failed to add guest.');
        setStatusType('error');
      });
  };

  if (!sessionUser) return <Navigate to="/login" replace />;

  return (
    <div className="guestlist-container">
      <h1>Guest List</h1>
      <p>Track who’s invited to your event and manage RSVPs.</p>

      {statusMessage && (
        <p className={statusType === 'success' ? 'success-message' : 'error-message'}>
          {statusMessage}
        </p>
      )}

      <div className="add-guest-form">
        <input
          type="text"
          placeholder="Guest Name"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Guest Email"
          value={guestEmail}
          onChange={(e) => setGuestEmail(e.target.value)}
        />
        <button onClick={handleAddGuest}>Add Guest</button>
      </div>

      {guests.length > 0 ? (
        <ul className="guest-list">
          {guests.map((guest) => (
            <li key={guest.id}>{guest.primaryName} — {guest.primaryEmail}</li>
          ))}
        </ul>
      ) : (
        <p>No guests added yet.</p>
      )}
    </div>
  );
};

export default GuestList;

// import { useSelector, useDispatch } from 'react-redux';
// import { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import {
//   fetchGuests,
//   createGuest,
//   selectAllGuests
// } from '../../store/slices/guestsSlice';
// import AddGuestForm from './AddGuestForm';
// import './GuestList.css';

// const GuestList = () => {
//   const dispatch = useDispatch();
//   const sessionUser = useSelector((state) => state.session.user);
//   const guests = useSelector(selectAllGuests);
//   const [guestInput, setGuestInput] = useState('');
//   const [guestSuccess, setGuestSuccess] = useState(null);

//   useEffect(() => {
//     if (!sessionUser) return;
//     dispatch(fetchGuests());
//   }, [dispatch, sessionUser]);

//   useEffect(() => {
//     if (guestSuccess) {
//       const timeout = setTimeout(() => setGuestSuccess(null), 2000);
//       return () => clearTimeout(timeout);
//     }
//   }, [guestSuccess]);

//   const handleAddGuest = () => {
//     const trimmed = guestInput.trim();
//     if (trimmed === '') return;

//     dispatch(createGuest({ name: trimmed }))
//       .unwrap()
//       .then(() => {
//         setGuestInput('');
//         setGuestSuccess('Guest added successfully!');
//       })
//       .catch(() => {
//         setGuestSuccess('Failed to add guest.');
//       });
//   };

//   if (!sessionUser) return <Navigate to="/login" replace />;

//   return (
//     <div className="guestlist-container">
//       <h1>Guest List</h1>
//       <p>Track who’s invited to your event and manage RSVPs.</p>

//       {guestSuccess && (
//         <p className="success-message">{guestSuccess}</p>
//       )}

//       <div className="add-guest-form">
//         <input
//           type="text"
//           placeholder="Enter guest name"
//           value={guestInput}
//           onChange={(e) => setGuestInput(e.target.value)}
//         />
//         <button onClick={handleAddGuest}>Add Guest</button>
//       </div>

//       {guests.length > 0 ? (
//         <ul className="guest-list">
//           {guests.map((guest) => (
//             <li key={guest.id}>{guest.name}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>No guests added yet.</p>
//       )}
//     </div>
//   );
// };

// export default GuestList;

// import { useSelector, useDispatch } from 'react-redux';
// import { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import {
//   addGuest,
//   selectAllGuests
// } from '../../store/slices/guestsSlice';
// import './GuestList.css';

// const GuestList = () => {
//   const dispatch = useDispatch();
//   const sessionUser = useSelector((state) => state.session.user);
//   const guests = useSelector(selectAllGuests);
//   const [guestInput, setGuestInput] = useState('');
//   const [guestSuccess, setGuestSuccess] = useState(null);

//   useEffect(() => {
//     if (guestSuccess) {
//       const timeout = setTimeout(() => setGuestSuccess(null), 2000);
//       return () => clearTimeout(timeout);
//     }
//   }, [guestSuccess]);

//   const handleAddGuest = () => {
//     const trimmed = guestInput.trim();
//     if (trimmed === '') return;
//     dispatch(addGuest(trimmed));
//     setGuestInput('');
//     setGuestSuccess('Guest added successfully!');
//   };

//   if (!sessionUser) return <Navigate to="/login" replace />;

//   return (
//     <div className="guestlist-container">
//       <h1>Guest List</h1>
//       <p>Track who’s invited to your event and manage RSVPs.</p>

//       {guestSuccess && (
//         <p className="success-message">{guestSuccess}</p>
//       )}

//       <div className="add-guest-form">
//         <input
//           type="text"
//           placeholder="Enter guest name"
//           value={guestInput}
//           onChange={(e) => setGuestInput(e.target.value)}
//         />
//         <button onClick={handleAddGuest}>Add Guest</button>
//       </div>

//       {guests.length > 0 ? (
//         <ul className="guest-list">
//           {guests.map((guest, index) => (
//             <li key={index}>{guest}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>No guests added yet.</p>
//       )}
//     </div>
//   );
// };

// export default GuestList;