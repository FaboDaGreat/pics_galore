import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useNavigate } from 'react-router-dom';
import './SignupForm.css';

function SignupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword: "Confirm Password field must be the same as the Password field"
      });
    } else {
      setErrors({});
      try {
        const newUser = await dispatch(
          sessionActions.signup({
            email,
            username,
            firstName,
            lastName,
            password
          }));
        if (newUser) {
          navigate('/')
        }
      } catch (res) {
        const data = await res.json();

        if (data && data.errors) {
          setErrors(data.errors)
        }
      }
    }

  };

  if (user) {
    navigate('/');
  }

  return (
    <div className='signup-page-container'>

      <form className='signup-form' onSubmit={handleSubmit}>
        <h1 className='signup-form-title'>Sign Up</h1>
        <div className='form-input-container'>
          <label>
            Email
            <input
              className='signup-input'
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && <p className='error-message'>{errors.email}</p>}
          <label>
            Username
            <input
              className='signup-input'
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          {errors.username && <p className='error-message'>{errors.username}</p>}
          <label>
            First Name
            <input
              className='signup-input'
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          {errors.firstName && <p className='error-message'>{errors.firstName}</p>}
          <label>
            Last Name
            <input
              className='signup-input'
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          {errors.lastName && <p className='error-message'>{errors.lastName}</p>}
          <label>
            Password
            (Case Sensitive)
            <input
              className='signup-input'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p className='error-message'>{errors.password}</p>}
          <label>
            Confirm Password
            <input
              className='signup-input'
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          {errors.confirmPassword && (
            <p className='error-message'>{errors.confirmPassword}</p>
          )}
          {errors.error && <h1 className='error-message'>{errors.error}</h1>}
        </div>
        <button className='signup-button' type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupForm;