import { useCookies } from 'react-cookie';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { logout } from '../../services/account.service';
import { JWT, USER } from '../../constants';
import './navigation.scss';

const Navigation = () => {
  const history = useHistory();
  const [cookies, setCookie] = useCookies([JWT, USER]);

  const logoutUser = () => {
    logout().then(() => {
      setCookie(JWT, null, { maxAge: 0 });
      setCookie(USER, null, { maxAge: 0 });
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
        {cookies.USER ? (
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
