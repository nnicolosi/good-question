import { Link, NavLink } from 'react-router-dom';
import './navigation.scss';

const Navigation = () => {
  return (
    <nav className="navbar is-light" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src="/favicon-32x32.png" alt="Logo" width="28" height="28" />
          <span className="navbar-brand-name">Good Question</span>
        </Link>
      </div>

      <div className="navbar-end">
        <NavLink className="navbar-item" to="/login" activeClassName="active">
          Login
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
