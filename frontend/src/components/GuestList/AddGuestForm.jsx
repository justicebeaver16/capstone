import { useState } from 'react';
import './GuestList.css';

const AddGuestForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    primaryName: '',
    primaryEmail: '',
    relation: '',
    rsvpStatus: 'pending'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!formData.primaryName.trim()) validationErrors.primaryName = 'Name is required';
    if (!formData.primaryEmail.trim()) validationErrors.primaryEmail = 'Email is required';

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);
    setFormData({ primaryName: '', primaryEmail: '', relation: '', rsvpStatus: 'pending' });
  };

  return (
    <form className="add-guest-form-inline" onSubmit={handleSubmit}>
      <input
        name="primaryName"
        placeholder="Full Name"
        value={formData.primaryName}
        onChange={handleChange}
      />
      {errors.primaryName && <span className="error-text">{errors.primaryName}</span>}

      <input
        name="primaryEmail"
        type="email"
        placeholder="Email"
        value={formData.primaryEmail}
        onChange={handleChange}
      />
      {errors.primaryEmail && <span className="error-text">{errors.primaryEmail}</span>}

      <input
        name="relation"
        placeholder="Relation (optional)"
        value={formData.relation}
        onChange={handleChange}
      />

      <select name="rsvpStatus" value={formData.rsvpStatus} onChange={handleChange}>
        <option value="pending">Pending</option>
        <option value="accepted">Accepted</option>
        <option value="declined">Declined</option>
      </select>

      <button type="submit">Add Guest</button>
    </form>
  );
};

export default AddGuestForm;