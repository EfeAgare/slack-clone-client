/* eslint-disable no-unused-expressions */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import CreateWorkSpace from './CreateWorkSpace';
import ViewWorkSpace from './ViewWorkSpace';
import DirectMessage from './DirectMessage';
import { PrivateRoute } from '../utils/authenticate';

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute
          exact
          path="/view-workspace/:workSpaceId?/:channelId?"
          component={ViewWorkSpace}
        />
        <PrivateRoute
          exact
          path="/view-workspace/user/:workSpaceId/:receiverId"
          component={DirectMessage}
        />
        <PrivateRoute
          exact
          path="/create-workspace"
          component={CreateWorkSpace}
        />
      </Switch>
    </BrowserRouter>
  );
};
