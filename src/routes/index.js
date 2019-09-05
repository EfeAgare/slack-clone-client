/* eslint-disable no-unused-expressions */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import CreateWorkSpace from './CreateWorkSpace';
import ViewTeam from './ViewTeam';
import { PrivateRoute } from '../utils/authenticate';

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/view-team" component={ViewTeam} />
        <PrivateRoute exact path="/create-team" component={CreateWorkSpace} />
      </Switch>
    </BrowserRouter>
  );
};
