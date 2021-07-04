import { useCookies } from 'react-cookie';
import { Redirect, Route } from 'react-router-dom';
import { USER } from '../constants';

const AuthorizedRoute = (props) => {
  const [cookies] = useCookies([USER]);
  const user = cookies.USER;
  const authorized = user && props.roles.includes(user.role);

  return authorized ? <Route {...props} /> : <Redirect to="/access-denied" />;
};

export default AuthorizedRoute;
