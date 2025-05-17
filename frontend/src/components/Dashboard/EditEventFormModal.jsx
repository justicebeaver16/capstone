import { useEffect, useState } from 'react';
import './Dashboard.css';

const EditEventFormModal = ({ eventData, onSubmit, onCancel, onDelete }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    eventType: '',
    description: '',
    status: ''
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (eventData) {
      setFormData({
        title: eventData.title || '',
        date: eventData.date?.split('T')[0] || '',
        address: eventData.address || '',
        city: eventData.city || '',
        state: eventData.state || '',
        zipCode: eventData.zipCode || '',
        eventType: eventData.eventType || '',
        description: eventData.description || '',
        status: eventData.status || 'planning'
      });
    }
  }, [eventData]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    setServerError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!formData.title.trim()) validationErrors.title = 'Title is required.';
    if (!formData.date) validationErrors.date = 'Date is required.';
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    const payload = {
      ...formData,
      name: formData.title
    };

    try {
      await onSubmit(payload);
      setSuccessMessage('Event updated successfully!');
    } catch (err) {
      setServerError(err.message || 'Failed to update event.');
    }
  };

  return (
    <div className="edit-vendor-form">
      <h1>Edit Event</h1>
      <form onSubmit={handleSubmit}>
        <div className="edit-form-grid">
          <label>
            Title
            <input name="title" value={formData.title} onChange={handleChange} />
            {errors.title && <span>{errors.title}</span>}
          </label>
          <label>
            Date
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
            {errors.date && <span>{errors.date}</span>}
          </label>
          <label>
            Address
            <input name="address" value={formData.address} onChange={handleChange} />
          </label>
          <label>
            City
            <input name="city" value={formData.city} onChange={handleChange} />
          </label>
          <label>
            State
            <input name="state" value={formData.state} onChange={handleChange} />
          </label>
          <label>
            Zip Code
            <input name="zipCode" value={formData.zipCode} onChange={handleChange} />
          </label>
          <label className="full-width">
            Event Type
            <input name="eventType" value={formData.eventType} onChange={handleChange} />
          </label>
          <label className="full-width">
            Description
            <textarea name="description" value={formData.description} onChange={handleChange} />
          </label>
          <label className="full-width">
            Status
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="planning">Planning</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </label>
        </div>

        {serverError && <div className="error-message">{serverError}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <div className="modal-actions">
          <button type="submit">Save Changes</button>
          <button type="button" className="modal-cancel-btn" onClick={onCancel}>Cancel</button>
        </div>

        <div className="modal-actions">
          <button
            type="button"
            className="modal-delete-btn"
            onClick={() => {
              if (confirm('Are you sure you want to delete this event?')) {
                onDelete();
              }
            }}
          >
            Delete Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEventFormModal;