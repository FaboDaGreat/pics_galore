import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  

  const demoLogin = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password' }))
    .then(() => {
      navigate('/');
    })

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

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button type="submit">Log In</button>
        <div>
  <a 
    href="#"
    onClick={(e) => {
      e.preventDefault(); 
      demoLogin(e);
    }}
  >
    Demo User
  </a>
</div>

      </form>
    </>
  );
}

export default LoginForm;