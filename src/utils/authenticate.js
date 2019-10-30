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

  if (verifyToken.user.id || verifyRefreshToken.user.id) {
    return true;
  } else {
    return false;
  }
};

export const currentUser = () => {

  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');

  if (token || refreshToken) {

    const verifyToken = jwt.verify(token, process.env.REACT_APP_SECRET);
    const verifyRefreshToken = jwt.decode(refreshToken);
    let user = verifyToken.user || verifyRefreshToken.user
    return user
  } else {
    return false;
  }
}

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
