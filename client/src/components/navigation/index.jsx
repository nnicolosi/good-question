import { useContext, useMemo } from 'react';
import { Cookies } from 'react-cookie';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { logout } from '../../services/account.service';
import { UserContext } from '../../context/user-context';
import './navigation.scss';

const Navigation = () => {
  const cookies = useMemo(() => new Cookies(), []);
  const userContext = useContext(UserContext);
  const history = useHistory();

  const logoutUser = () => {
    logout().then(() => {
      cookies.set('jwt', null, { maxAge: 0 });
      userContext.removeCurrentUser();
      history.push('/login');
    });
  };

  return (
    <nav className="navbar is-light" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src="/favicon-32x32.png" alt="Logo" width="28" height="28" />
          <span className="navbar-brand-name">Good Question</span>
        </Link>
      </div>
      <div className="navbar-end">
        {userContext.user ? (
          <Link className="navbar-item" to="/" onClick={logoutUser}>
            Logout
          </Link>
        ) : (
          <NavLink className="navbar-item" to="/login" activeClassName="active">
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
