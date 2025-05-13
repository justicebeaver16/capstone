import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './MoodBoard.css';

const MoodBoard = () => {
  const sessionUser = useSelector(state => state.session.user);

  if (!sessionUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="moodboard-container">
      <h1>Mood Board</h1>
      <p>Collect and organize visual inspiration for your events.</p>
      <button className="upload-image-btn">Upload Inspiration</button>
    </div>
  );
};

export default MoodBoard;