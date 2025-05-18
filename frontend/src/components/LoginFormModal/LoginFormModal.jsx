import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import './LoginFormModal.css';

function LoginFormModal({ onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login(credential, password))
      .then(() => {
        navigate('/dashboard');
        if (onClose) onClose();
        else closeModal();
        // navigate('/dashboard');
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <div className="login-modal-container">
      <div className="login-modal-content">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Email
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          {errors.credential && <p className="error-message">{errors.credential}</p>}

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

          <button type="submit" className="login-submit-btn">Log In</button>
        </form>
        <button className="login-close-btn" onClick={onClose || closeModal}>Cancel</button>
      </div>
    </div>
  );
}

export default LoginFormModal;

// import { useState } from 'react';
// import * as sessionActions from '../../store/session';
// import { useDispatch } from 'react-redux';
// import { useModal } from '../../context/Modal';
// import './LoginFormModal.css';

// function LoginFormModal({ onClose }) {
//   const dispatch = useDispatch();
//   const [credential, setCredential] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const { closeModal } = useModal();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setErrors({});
//     return dispatch(sessionActions.login(credential, password))
//       .then(() => {
//         if (onClose) onClose();
//         else closeModal();
//       })
//       .catch(async (res) => {
//         const data = await res.json();
//         if (data?.errors) {
//           setErrors(data.errors);
//         }
//       });
//   };

//   return (
//     <div className="login-modal-container">
//       <div className="login-modal-content">
//         <h1>Log In</h1>
//         <form onSubmit={handleSubmit} className="login-form">
//           <label>
//             Email
//             <input
//               type="text"
//               value={credential}
//               onChange={(e) => setCredential(e.target.value)}
//               required
//             />
//           </label>
//           {errors.credential && <p className="error-message">{errors.credential}</p>}

//           <label>
//             Password
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </label>
//           {errors.password && <p className="error-message">{errors.password}</p>}

//           <button type="submit" className="login-submit-btn">Log In</button>
//         </form>
//         <button className="login-close-btn" onClick={onClose || closeModal}>Cancel</button>
//       </div>
//     </div>
//   );
// }

// export default LoginFormModal;