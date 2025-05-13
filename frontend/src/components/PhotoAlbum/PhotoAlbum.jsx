import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './PhotoAlbum.css';

const PhotoAlbum = () => {
  const sessionUser = useSelector(state => state.session.user);

  if (!sessionUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="photoalbum-container">
      <h1>Event Photo Album</h1>
      <p>Share, like, and comment on your event photos.</p>
      <button className="add-photo-btn">Add Photo</button>
    </div>
  );
};

export default PhotoAlbum;