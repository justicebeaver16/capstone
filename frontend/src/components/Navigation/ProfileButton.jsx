import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import EditUserFormModal from './EditUserFormModal';
import './Navigation.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu((prev) => !prev);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    setShowMenu(false);
  };

  return (
    <div className="profile-button-wrapper">
      <button className="profile-icon-button" onClick={toggleMenu}>
        <FaUserCircle size={24} color="#fff" />
      </button>
      <ul className={`profile-dropdown${showMenu ? '' : ' hidden'}`} ref={ulRef}>
        {user ? (
          <>
            <li><strong>{user.name}</strong></li>
            <li className="profile-role">{user.role}</li>
            <li>
              <button className="profile-menu-btn" onClick={() => setShowEditModal(true)}>
                Edit Profile
              </button>
            </li>
            <li>
              <button className="profile-menu-btn" onClick={logout}>
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={() => setShowMenu(false)}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={() => setShowMenu(false)}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>

      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <EditUserFormModal
              userData={user}
              onSubmit={(updatedUser) => {
                dispatch(sessionActions.setSessionUser(updatedUser));
                setShowEditModal(false);
              }}
              onCancel={() => setShowEditModal(false)}
              onDelete={async () => {
                await dispatch(sessionActions.logout());
                window.location.href = '/';
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;