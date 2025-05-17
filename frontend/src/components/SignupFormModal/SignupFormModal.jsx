import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import './SignupFormModal.css';

function SignupFormModal({ onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.signup({ firstName, lastName, email, password }))
      .then(() => {
        if (onClose) onClose();
        else closeModal();
        navigate('/dashboard');
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <div className="signup-modal-container">
      <div className="signup-modal-content">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <label>
            First Name
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>

          <label>
            Last Name
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && <p className="error-message">{errors.email}</p>}

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p className="error-message">{errors.password}</p>}

          <button type="submit" className="signup-submit-btn">Sign Up</button>
        </form>
        <button className="signup-close-btn" onClick={onClose || closeModal}>Cancel</button>
      </div>
    </div>
  );
}

export default SignupFormModal;