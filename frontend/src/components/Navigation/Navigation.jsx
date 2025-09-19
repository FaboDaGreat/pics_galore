import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { FaUpload } from 'react-icons/fa';

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

  const uploadPhotoPage = (e) => {
    e.preventDefault();
    navigate("/photos/upload");
  };

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
      <div className="my-pages">
        {sessionUser && (
          <>
            <button className='nav-buttons' onClick={(e) => goHome(e)}>Home</button>
            <button className='nav-buttons' onClick={(e) => goToMyPhotos(e)}>My Photos</button>
            <button className='nav-buttons' onClick={(e) => goToMyAlbums(e)}>My Albums</button>
          </>
        )}
      </div>
      <ul className="nav-links">
        {sessionUser && (
          <button 
          className='upload-button' 
          onClick={(e) => uploadPhotoPage(e)}
          title='Post a Photo'>
            <FaUpload size={25} />
          </button>
        )}
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