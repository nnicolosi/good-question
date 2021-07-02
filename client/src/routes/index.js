import { Switch, Route } from 'react-router-dom';
import AuthenticatedRoute from './authenticated-route';
import AuthorizedRoute from './authorized-route';
import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import SetPasswordPage from '../pages/set-password';
import NotFound from '../pages/not-found';
import AccessDenied from '../pages/access-denied';
import UsersPage from '../pages/users';

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <AuthenticatedRoute path="/set-password" component={SetPasswordPage} />
      <Route path="/home" component={HomePage} />
      <AuthorizedRoute path="/users" component={UsersPage} roles={['admin']} />
      <Route path="/access-denied" component={AccessDenied} />
      <Route exact path="/" component={HomePage} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
