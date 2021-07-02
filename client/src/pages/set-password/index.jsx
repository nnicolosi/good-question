import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import { setPassword } from '../../services/account.service';
import { current } from '../../services/user.service';
import { USER } from '../../constants';
import './set-password.scss';

const SetPasswordPage = () => {
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [showMatchError, setShowMatchError] = useState(true);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [, setCookie] = useCookies([USER]);
  const history = useHistory();

  const isValidLength = (password) => {
    return password && password.length >= 8;
  };

  useEffect(() => {
    if (isValidLength(passwordOne) && passwordOne === passwordTwo) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }

    if (showMatchError) {
      setShowMatchError(passwordOne !== passwordTwo);
    }
  }, [passwordOne, passwordTwo, showMatchError]);

  const handlePasswordOneInput = (e) => {
    setPasswordOne(e.target.value);
  };

  const handlePasswordTwoInput = (e) => {
    setPasswordTwo(e.target.value);
  };

  const checkForMatchError = () => {
    setShowMatchError(passwordOne !== passwordTwo);
  };

  const clearError = (e) => {
    e.preventDefault();
    setError('');
  };

  const submitPassword = (e) => {
    e.preventDefault();
    setSubmitDisabled(true);
    setSubmitting(true);
    setError('');

    setPassword(passwordOne)
      .then((response) => {
        if (response?.status === 201) {
          current().then((response) => {
            setCookie(USER, response.data);
            history.push('/');
          });
        } else {
          setSubmitDisabled(false);
          setSubmitting(false);
        }
      })
      .catch((error) => {
        if (error.response) {
          setError('Password is invalid');
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
      <div className="box message">Your administrator requires you to set a new password.</div>
      <div className="field">
        <label className="label">Enter a New Password (at least eight characters)</label>
        <div className="control has-icons-left">
          <input className="input" type="password" autoFocus value={passwordOne} disabled={submitting} onChange={handlePasswordOneInput} />
          <span className="icon is-small is-left">
            <i className="fas fa-lock" />
          </span>
        </div>
      </div>
      <div className="field">
        <label className="label">Enter Password Again</label>
        <div className="control has-icons-left">
          <input
            className="input"
            type="password"
            value={passwordTwo}
            disabled={submitting}
            onChange={handlePasswordTwoInput}
            onBlur={checkForMatchError}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-lock" />
          </span>
        </div>
        <p className="help is-danger">{showMatchError ? 'Passwords do not match' : ''}</p>
      </div>
      <br />
      <div className="buttons is-centered">
        <button type="submit" className="button is-primary" disabled={submitDisabled} onClick={submitPassword}>
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

export default SetPasswordPage;
