import { csrfFetch } from '../../store/csrf';
import { useState } from 'react';
import './Dashboard.css';

const CreateEventFormModal = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    eventType: '',
    description: '',
    status: 'planning'
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const validationErrors = {};
    if (!formData.title.trim()) validationErrors.title = 'Title is required.';
    if (!formData.date) validationErrors.date = 'Date is required.';
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    setSubmitting(true);
    try {
      const res = await csrfFetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const newEvent = await res.json();
        setMessage('Event created successfully!');
        setTimeout(() => onSubmit(newEvent), 1500);
      } else {
        const error = await res.json();
        console.error('Failed to create event:', error);
      }
    } catch (err) {
      console.error('CSRF-protected POST failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="edit-vendor-form">
      <h1>Create Event</h1>
      {message && <div className="confirmation-message">{message}</div>}
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
        <div className="modal-actions">
          <button type="submit" disabled={submitting}>Create Event</button>
          <button type="button" className="modal-cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventFormModal;