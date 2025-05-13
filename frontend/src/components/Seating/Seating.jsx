import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './Seating.css';

const Seating = () => {
  const sessionUser = useSelector(state => state.session.user);

  if (!sessionUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="seating-container">
      <h1>Seating Arrangement</h1>
      <p>Design and manage your event seating chart with drag-and-drop functionality.</p>
      <button className="edit-seating-btn">Edit Seating Chart</button>
    </div>
  );
};

export default Seating;