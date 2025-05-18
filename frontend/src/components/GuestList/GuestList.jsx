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
  const [guestInput, setGuestInput] = useState('');
  const [guestSuccess, setGuestSuccess] = useState(null);

  useEffect(() => {
    if (!sessionUser) return;
    dispatch(fetchGuests());
  }, [dispatch, sessionUser]);

  useEffect(() => {
    if (guestSuccess) {
      const timeout = setTimeout(() => setGuestSuccess(null), 2000);
      return () => clearTimeout(timeout);
    }
  }, [guestSuccess]);

  const handleAddGuest = () => {
    const trimmed = guestInput.trim();
    if (trimmed === '') return;

    dispatch(createGuest({ name: trimmed }))
      .unwrap()
      .then(() => {
        setGuestInput('');
        setGuestSuccess('Guest added successfully!');
      })
      .catch(() => {
        setGuestSuccess('Failed to add guest.');
      });
  };

  if (!sessionUser) return <Navigate to="/login" replace />;

  return (
    <div className="guestlist-container">
      <h1>Guest List</h1>
      <p>Track who’s invited to your event and manage RSVPs.</p>

      {guestSuccess && (
        <p className="success-message">{guestSuccess}</p>
      )}

      <div className="add-guest-form">
        <input
          type="text"
          placeholder="Enter guest name"
          value={guestInput}
          onChange={(e) => setGuestInput(e.target.value)}
        />
        <button onClick={handleAddGuest}>Add Guest</button>
      </div>

      {guests.length > 0 ? (
        <ul className="guest-list">
          {guests.map((guest) => (
            <li key={guest.id}>{guest.name}</li>
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