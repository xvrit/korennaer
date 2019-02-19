import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Main from '../views/Main';

const Routes = () => (
  <Switch>
    <Route component={Main} exact={true} path="/" />
  </Switch>
);

export default Routes;
