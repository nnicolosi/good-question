import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import { login } from '../../services/account.service';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState('');
  const [, setCookie] = useCookies(['jwt']);
  const history = useHistory();

  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
    setButtonState();
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
    setButtonState();
  };

  const setButtonState = () => {
    setDisabled(!username || !password);
  };

  const submitLogin = (e) => {
    e.preventDefault();
    setDisabled(true);
    setError('');

    login(username, password)
      .then((response) => {
        if (response?.status === 201 && response?.data?.token) {
          setCookie('jwt', response.data.token);
          history.push('/');
        } else {
          setDisabled(false);
        }
      })
      .catch((error) => {
        if (error.response) {
          setError('Username or password is incorrect');
        } else if (error.request) {
          setError('Service is not available');
        } else {
          setError('Application error');
        }

        setDisabled(false);
      });
  };

  return (
    <div className="login-form">
      <div className="login-error">
        <span className="error">{error}</span>
      </div>
      <div className="input-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={handleUsernameInput}
        />
      </div>
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordInput}
        />
      </div>

      <button
        type="submit"
        className="login-button"
        disabled={disabled}
        onClick={submitLogin}
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
