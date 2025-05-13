import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from '../ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav className="navigation">
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/vendors" className={({ isActive }) => isActive ? 'active-link' : ''}>
            Vendors
          </NavLink>
        </li>
        <li>
          <NavLink to="/guest-list" className={({ isActive }) => isActive ? 'active-link' : ''}>
            Guest List
          </NavLink>
        </li>
        <li>
          <NavLink to="/mood-board" className={({ isActive }) => isActive ? 'active-link' : ''}>
            Mood Board
          </NavLink>
        </li>
        <li>
          <NavLink to="/seating" className={({ isActive }) => isActive ? 'active-link' : ''}>
            Seating
          </NavLink>
        </li>
        <li>
          <NavLink to="/photo-album" className={({ isActive }) => isActive ? 'active-link' : ''}>
            Photo Album
          </NavLink>
        </li>
        <li>
          <NavLink to="/tasks" className={({ isActive }) => isActive ? 'active-link' : ''}>
            Tasks
          </NavLink>
        </li>
        {isLoaded && sessionUser && (
          <li className="profile-button-container">
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;