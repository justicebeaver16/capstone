import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './Vendors.css';

const Vendors = () => {
  const sessionUser = useSelector(state => state.session.user);

  if (!sessionUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="vendors-container">
      <h1>Vendor Management</h1>
      <p>Track and manage all your vendors here. You can add, edit, or remove vendors as needed.</p>
      <div className="vendors-actions">
        <button className="add-vendor-btn">Add New Vendor</button>
      </div>
    </div>
  );
};

export default Vendors;