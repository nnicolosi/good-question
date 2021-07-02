import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import { login } from '../../services/account.service';
import { current } from '../../services/user.service';
import { JWT, USER } from '../../constants';
import './login.scss';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [, setCookie] = useCookies([JWT, USER]);
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
    setSubmitDisabled(!username || !password);
  };

  const clearError = (e) => {
    e.preventDefault();
    setError('');
  };

  const submitLogin = (e) => {
    e.preventDefault();
    setSubmitDisabled(true);
    setSubmitting(true);
    setError('');

    login(username, password)
      .then((response) => {
        if (response?.status === 201 && response?.data?.token) {
          setCookie(JWT, response.data.token);

          current().then((response) => {
            const user = response.data;
            setCookie(USER, user);

            if (user.reset) {
              history.push('/set-password');
            } else {
              history.push('/');
            }
          });
        } else {
          setSubmitDisabled(false);
          setSubmitting(false);
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

        setSubmitDisabled(false);
        setSubmitting(false);
      });
  };

  return (
    <form className="box login-form">
      <div className="field">
        <label className="label">Username</label>
        <div className="control has-icons-left">
          <input className="input" value={username} disabled={submitting} onChange={handleUsernameInput} />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control has-icons-left">
          <input className="input" type="password" value={password} disabled={submitting} onChange={handlePasswordInput} />
          <span className="icon is-small is-left">
            <i className="fas fa-lock" />
          </span>
        </div>
      </div>
      <br />
      <div className="buttons is-centered">
        <button type="submit" className="button is-primary" disabled={submitDisabled} onClick={submitLogin}>
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
