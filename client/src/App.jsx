import '@fortawesome/fontawesome-free/css/all.min.css';
import { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/navigation';
import Routes from './routes';
import './App.scss';

const App = () => {
  return (
    <Fragment>
      <Router>
        <Navigation />
        <Routes />
      </Router>
    </Fragment>
  );
};

export default App;
