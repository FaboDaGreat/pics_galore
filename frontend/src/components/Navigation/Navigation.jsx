import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { useNavigate } from 'react-router-dom';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();

  const goToProfile = (e) => {
    e.preventDefault();
    navigate("/my-profile");
  }

  return (
    <nav className="nav-bar">
      <NavLink to="/" className="logo-container">
        <img 
          src="/flickrLogo.png" 
          alt="Site Logo" 
          className="site-logo" 
        />
        <h1>PicsGalore</h1>
      </NavLink>

      {sessionUser && (
        <button className='profile-button' onClick={(e) => goToProfile(e)}>
          My Profile
        </button>
      )}

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