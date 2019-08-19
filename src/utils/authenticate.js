import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');

  const verifyToken = jwt.verify(token, process.env.REACT_APP_SECRET);
  const verifyRefreshToken = jwt.decode(refreshToken);

  if (verifyRefreshToken.user.id || verifyToken.user.id) {
    return true;
  } else {
    return false;
  }
};
export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login'
            }}
          />
        )
      }
    />
  );
};
