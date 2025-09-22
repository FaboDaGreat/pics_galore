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
    closeMenu();
    navigate("/");
  };

  const signupPage = (e) => {
    e.preventDefault();
    closeMenu();
    navigate("/sign-up");
  };

  const loginPage = (e) => {
    e.preventDefault();
    closeMenu();
    navigate("/log-in");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="profileContainer">
      <button onClick={toggleMenu} className="open-menu-button">
        <FaUserCircle size={32} style={{ color: '#7d7a85' }} />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className="user-greeting">{`Hello, ${user.username}!`}</div>
            <div className="menu-links" onClick={logout}>Log Out</div>

          </>
        ) : (
          <>
            <div className="menu-links" onClick={(e) => goHome(e)}>Home</div>
            <div className="menu-links" onClick={(e) => loginPage(e)}>Log In</div>
            <div className="menu-links" onClick={(e) => signupPage(e)}>Sign Up</div>

          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
