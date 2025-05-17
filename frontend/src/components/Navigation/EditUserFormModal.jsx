import { csrfFetch } from '../../store/csrf';
import { useState, useEffect } from 'react';
import './Navigation.css';

const EditUserFormModal = ({ userData, onSubmit, onCancel, onDelete }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    planningPermissions: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        role: userData.role || '',
        planningPermissions: userData.planningPermissions || 'none'
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const validationErrors = {};
    if (!formData.name.trim()) validationErrors.name = 'Name is required.';
    if (!formData.email.trim()) validationErrors.email = 'Email is required.';
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    setSubmitting(true);
    try {
      const res = await csrfFetch(`/api/users/${userData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setMessage('User updated successfully!');
        setTimeout(() => onSubmit(updatedUser), 1500);
      } else {
        console.error('Failed to update user');
      }
    } catch (err) {
      console.error('CSRF-protected PUT failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        const res = await csrfFetch(`/api/users/${userData.id}`, {
          method: 'DELETE'
        });

        if (res.ok) {
          setMessage('User deleted successfully.');
          setTimeout(() => onDelete(), 1500);
        } else {
          console.error('Failed to delete user');
        }
      } catch (err) {
        console.error('CSRF-protected DELETE failed:', err);
      }
    }
  };

  const shouldShowPermissions = !['vendor', 'attendee', 'planning_team'].includes(formData.role);

  return (
    <div className="edit-vendor-form">
      <h1>Edit User</h1>
      {message && <div className="confirmation-message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="edit-form-grid">
          <label>
            Name
            <input name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <span>{errors.name}</span>}
          </label>
          <label>
            Email
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <span>{errors.email}</span>}
          </label>
          <label>
            Role
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="bride">Bride</option>
              <option value="groom">Groom</option>
              <option value="event_planner">Event Planner</option>
              <option value="planning_team">Planning Team</option>
              <option value="attendee">Attendee</option>
              <option value="vendor">Vendor</option>
              <option value="user">User</option>
            </select>
          </label>
          {shouldShowPermissions && (
            <label>
              Planning Permissions
              <select name="planningPermissions" value={formData.planningPermissions} onChange={handleChange}>
                <option value="none">None</option>
                <option value="view">View</option>
                <option value="edit">Edit</option>
                <option value="full">Full</option>
              </select>
            </label>
          )}
        </div>
        <div className="modal-actions">
          <button type="submit" disabled={submitting}>Save Changes</button>
          <button type="button" className="modal-cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
        <div className="modal-actions">
          <button type="button" className="modal-delete-btn" onClick={handleDelete}>
            Delete User
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserFormModal;