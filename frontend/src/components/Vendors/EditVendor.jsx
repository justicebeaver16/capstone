import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateVendorThunk, getAllVendorsThunk } from '../../store/slices/vendorsSlice';

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

const EditVendor = () => {
  const { vendorId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const vendors = useSelector((state) => state.vendors.allVendors);
  const vendor = vendors[vendorId];

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    contactEmail: '',
    contactPhone: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

useEffect(() => {
  if (!vendor) {
    dispatch(getAllVendorsThunk());
  } else {
    setFormData({
      name: vendor.name || '',
      category: vendor.category || '',
      contactEmail: vendor.contactEmail || '',
      contactPhone: vendor.contactPhone || '',
      description: vendor.description || '',
      EventId: vendor.EventId
    });
  }
}, [vendor, dispatch]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (formData.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Invalid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const updated = await dispatch(updateVendorThunk(formData, vendorId));
    if (updated) {
      setSubmitSuccess(true);
      setTimeout(() => navigate('/vendors'), 1000);
    }
  };

  if (!vendor) return <p>Loading vendor details...</p>;

  return (
    <div className="edit-vendor-form">
      <h1>Edit Vendor #{vendorId}</h1>
      {submitSuccess && <p style={{ color: 'green' }}>Vendor updated successfully!</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <span>{errors.name}</span>}
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
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <span>{errors.category}</span>}
        </label>

        <label>
          Contact Email:
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
          />
          {errors.contactEmail && <span>{errors.contactEmail}</span>}
        </label>

        <label>
          Contact Phone:
          <input
            type="text"
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
          ></textarea>
        </label>

        <button type="submit">Update Vendor</button>
        <button type="button" onClick={() => navigate('/vendors')}>Cancel</button>
      </form>
    </div>
  );
};

export default EditVendor;