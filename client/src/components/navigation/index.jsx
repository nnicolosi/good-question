import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { logout } from '../../services/account.service';
import { JWT, USER } from '../../constants';
import './navigation.scss';

const Navigation = () => {
  const history = useHistory();
  const [cookies, setCookie] = useCookies([JWT, USER]);
  const [burgerMenuToggle, setBurgerMenuToggle] = useState(false);

  const logoutUser = () => {
    logout().then(() => {
      setCookie(JWT, null, { maxAge: 0 });
      setCookie(USER, null, { maxAge: 0 });
      history.push('/login');
    });
  };

  const startMenuItems = () => {
    const items = [];

    if (cookies.USER && cookies.USER.role === 'admin') {
      items.push(
        <NavLink key="users" className="navbar-item" to="/users" activeClassName="active">
          Users
        </NavLink>
      );
    }

    return items;
  };

  const endMenuItems = () => {
    const items = [];

    if (cookies.USER) {
      items.push(
        <Link key="logout" className="navbar-item" to="/" onClick={logoutUser}>
          Logout
        </Link>
      );
    } else {
      items.push(
        <NavLink key="login" className="navbar-item" to="/login" activeClassName="active">
          Login
        </NavLink>
      );
    }

    return items;
  };

  const toggleBurgerMenu = () => {
    setBurgerMenuToggle(!burgerMenuToggle);
  };

  return (
    <nav className="navbar is-light" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src="/favicon-32x32.png" alt="Logo" width="28" height="28" />
          <span className="navbar-brand-name">Good Question</span>
        </Link>
        {/* eslint-disable-next-line */}
        <a id="burger" className={`navbar-burger ${burgerMenuToggle ? 'is-active' : ''}`} onClick={toggleBurgerMenu} data-target="menu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="menu" className={`navbar-menu ${burgerMenuToggle ? 'is-active' : ''}`}>
        <div className="navbar-start">{startMenuItems()}</div>
        <div className="navbar-end">{endMenuItems()}</div>
      </div>
    </nav>
  );
};

export default Navigation;
