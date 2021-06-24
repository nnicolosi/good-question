import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import { login } from '../../services/account.service';
import './login.scss';

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

  const clearError = (e) => {
    e.preventDefault();
    setError('');
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
    <form className="box login-form">
      <div className="field">
        <label className="label">Username</label>
        <div className="control has-icons-left">
          <input className="input" value={username} onChange={handleUsernameInput} />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control has-icons-left">
          <input className="input" type="password" value={password} onChange={handlePasswordInput} />
          <span className="icon is-small is-left">
            <i className="fas fa-lock" />
          </span>
        </div>
      </div>
      <br />
      <div className="buttons is-centered">
        <button type="submit" className="button is-primary" disabled={disabled} onClick={submitLogin}>
          Submit
        </button>
      </div>
      <div className={`notification is-danger ${error ? '' : 'is-hidden'}`}>
        <button className="delete" onClick={clearError}></button>
        {error}
      </div>
    </form>
  );
};

export default LoginPage;
