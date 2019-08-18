/* eslint-disable no-unused-expressions */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import  Home  from './Home';
import Login from './Login';
import Register from './Register';
import CreateTeam from './CreateTeam';

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/create-team" component={CreateTeam} />
      </Switch>
    </BrowserRouter>
  );
};
