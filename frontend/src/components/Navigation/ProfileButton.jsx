import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import * as sessionActions from "../../store/session";
import "./ProfileButton.css";
import { useNavigate } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate("/");
  };

  
  const goHome = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const uploadPhotoPage = (e) => {
    e.preventDefault();
    navigate("/photos/upload");
  };

  const signupPage = (e) => {
    e.preventDefault();
    navigate("/sign-up");
  };

  const loginPage = (e) => {
    e.preventDefault();
    navigate("/log-in");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="profileContainer">
      {user && (
        <button className="upload-photo-button" onClick={(e) => uploadPhotoPage(e)} >
          Upload New Photo
        </button>
      )}

      <button onClick={toggleMenu} className="open-menu-button">
        <FaUserCircle />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>
              {user.firstName} {user.lastName}
            </li>
            <li>{user.email}</li>
            <li>
              <button className="logout-button" onClick={logout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <div className="home-link" onClick={(e) => goHome(e)}>Home</div>
            <div className="login-link" onClick={(e) => loginPage(e)}>Log In</div>
            <div className="signup-link" onClick={(e) => signupPage(e)}>Sign Up</div>
            
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
