import '@fortawesome/fontawesome-free/css/all.min.css';
import { Fragment, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContext } from './context/user-context';
import Navigation from './components/navigation';
import Footer from './components/footer';
import Routes from './routes';
import './App.scss';

const App = () => {
  const [user, setUser] = useState();

  const setCurrentUser = (user) => {
    setUser(user);
  };

  const removeCurrentUser = () => {
    setUser();
  };

  return (
    <Fragment>
      <UserContext.Provider value={{ user, setCurrentUser, removeCurrentUser }}>
        <Router>
          <Navigation />
          <Routes />
          <Footer />
        </Router>
      </UserContext.Provider>
    </Fragment>
  );
};

export default App;
