import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, token, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      typeof token === 'string' ? (
        <Component {...props} token={token} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }
  />
);

export default PrivateRoute;