import { Switch, Route } from 'react-router-dom';
import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import SetPasswordPage from '../pages/set-password';
import NotFound from '../pages/not-found';

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/set-password" component={SetPasswordPage} />
      <Route path="/home" component={HomePage} />
      <Route exact path="/" component={HomePage} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
