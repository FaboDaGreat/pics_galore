import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});


  const demoLogin = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password' }))
      .then(() => {
        navigate('/');
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => {
        navigate('/');
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  if (user) {
    navigate('/');
  }

  return (
    <div className='login-page-container'>
      <form className='login-form' onSubmit={handleSubmit}>
        <h1 className='login-form-title'>Log In</h1>
        <div className='form-input-containter'>
          <label>
            Username or Email
            <input
              className='login-input'
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              className='login-input'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <a
            href="#"
            className='demo-login'
            onClick={(e) => {
              e.preventDefault();
              demoLogin(e);
            }}
          >
            Demo User
          </a>
          {errors.credential && (
            <p className='error-message'>{errors.credential}</p>
          )}
        </div>
        <button className='login-button' type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginForm;