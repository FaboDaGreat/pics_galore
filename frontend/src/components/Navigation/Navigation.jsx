import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();

  const goToMyPhotos = (e) => {
    e.preventDefault();
    navigate('/my-profile/photos')
  }

  const goToMyAlbums = (e) => {
    e.preventDefault();
    navigate('/my-profile/albums')
  }

  const goHome = (e) => {
    e.preventDefault(e);
    navigate('/')
  }

  return (
    <nav className="nav-bar">
      <NavLink to="/" className="logo-container">
        <img
          src="/flickrLogo.png"
          alt="Site Logo"
          className="site-logo"
        />
        <h1 className="site-name">PicsGalore</h1>
      </NavLink>
      {sessionUser && (
        <div className="my-pages">
          <button className='home-button' onClick={(e) => goHome(e)}>Home</button>
          <button className='photos-button' onClick={(e) => goToMyPhotos(e)}>My Photos</button>
          <button className='albums-button' onClick={(e) => goToMyAlbums(e)}>My Albums</button>
        </div>
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