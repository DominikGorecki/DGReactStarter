import React, { useState } from 'react';
import {HashRouter as Router, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';

import history from './services/history';
import PrivateRoute from './components/PrivateRoute';

import Navbar from './components/navbar';
import Login from './scenes/login';
import Main from './scenes/main';
import Logout from './components/Logout';

const App = () => {
  const [token, setToken] = useState(Cookies.get('JWT'));

  return(
    <>
      <header>
        <Navbar />
      </header>
      <Router history={history}>
        <Switch>
          <PrivateRoute
            token={token}
            path="/"
            exact
            component={Main}
          />
          <Route
            path="/logout"
            exact
            render= {props => 
              <Logout {...props} setToken={setToken} />}
          />
          <Route
            path="/login"
            exact
            render={props => 
              <Login 
                {...props} 
                isSignedIn={typeof token=== 'string'}
                setToken={setToken} />}
          />
        </Switch>
      </Router>
      <footer className="fixed-bottom justify-content-center text-center">
        <hr/>
        <small>Version: {`${process.env.VERSION}-${process.env.BUILD}`}</small>
      </footer>
    </>

  );
};

export default App;

