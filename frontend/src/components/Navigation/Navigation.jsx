import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav className="nav-bar">
      <NavLink to="/" className="logo-container">
        <img 
          src="/fablogo.jpg" 
          alt="Site Logo" 
          className="site-logo" 
        />
      </NavLink>

      <ul className="nav-links">
        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;