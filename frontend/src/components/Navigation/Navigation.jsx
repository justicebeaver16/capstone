import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <nav className="navigation">
      <div className="nav-header">
        <div className="nav-logo">
          <NavLink to="/dashboard" className="logo-link">MyEvent</NavLink>
        </div>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${menuOpen ? 'show' : ''}`}>
          <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active-link' : ''}>Dashboard</NavLink></li>
          <li><NavLink to="/vendors" className={({ isActive }) => isActive ? 'active-link' : ''}>Vendors</NavLink></li>
          <li><NavLink to="/guest-list" className={({ isActive }) => isActive ? 'active-link' : ''}>Guest List</NavLink></li>
          <li><NavLink to="/mood-board" className={({ isActive }) => isActive ? 'active-link' : ''}>Mood Board</NavLink></li>
          <li><NavLink to="/seating" className={({ isActive }) => isActive ? 'active-link' : ''}>Seating</NavLink></li>
          <li><NavLink to="/photo-album" className={({ isActive }) => isActive ? 'active-link' : ''}>Photo Album</NavLink></li>
          <li><NavLink to="/tasks" className={({ isActive }) => isActive ? 'active-link' : ''}>Tasks</NavLink></li>
        </ul>

        {isLoaded && sessionUser && (
          <div className="profile-button-container">
            <ProfileButton user={sessionUser} />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;