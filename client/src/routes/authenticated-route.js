import { useCookies } from 'react-cookie';
import { Redirect, Route } from 'react-router-dom';
import { USER } from '../constants';

const AuthenticatedRoute = (props) => {
  const [cookies] = useCookies([USER]);
  const user = cookies.USER;
  const authorized = !!user;

  return authorized ? <Route {...props} /> : <Redirect to="/access-denied" />;
};

export default AuthenticatedRoute;
