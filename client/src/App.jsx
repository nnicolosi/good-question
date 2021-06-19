import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import NotFound from './pages/not-found';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/login' component={LoginPage} />
        <Route path='/home' component={HomePage} />
        <Route exact path='/' component={HomePage} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
