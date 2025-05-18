import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createVendorThunk } from '../../store/slices/vendorsSlice';
import './NewVendorFormModal.css';

const CATEGORY_OPTIONS = [
  'Catering',
  'Photography',
  'Florist',
  'Entertainment',
  'Venue',
  'Transportation',
  'Hair & Makeup',
  'Planning',
  'Decor',
  'Other'
];

const NewVendorFormModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    contactEmail: '',
    contactPhone: '',
     description: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sessionUser?.primaryEventId) {
      setErrors({ form: 'You must be assigned to an event to add a vendor.' });
      return;
    }

    const payload = {
      ...formData,
      EventId: sessionUser.primaryEventId
    };

    try {
      const res = await dispatch(createVendorThunk(payload));
      if (res) onClose();
    } catch (err) {
      console.error('Failed to create vendor:', err);
      setErrors({ form: 'There was a problem creating the vendor.' });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Vendor</h2>
        <form onSubmit={handleSubmit}>
          {errors.form && <p className="error-message">{errors.form}</p>}

          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Category:
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>

          <label>
            Contact Email:
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
            />
          </label>

          <label>
            Phone:
            <input
              type="tel"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
            />
          </label>
           <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Add a brief description about the vendor..."
            />
          </label>

          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewVendorFormModal;