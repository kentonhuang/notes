import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';

import createHistory from 'history/createBrowserHistory';

import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];

export const history = createHistory();

export const onAuthChange = (isAuthenticated) => {
  const pathname = history.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isUnauthenticatedPage && isAuthenticated) {
    history.push('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    history.push('/');
  }
};

export const AppRouter = () => (
  <Router history ={history}>
    <Switch>
      <Route exact={true} path ="/" render={() => {
        return Meteor.userId() ? <Redirect to="dashboard"/> : <Login/>
      }}/>
      <Route path="/signup" render={() => {
        return Meteor.userId() ? <Redirect to="dashboard"/> : <Signup/>
      }}/>
      <Route path="/dashboard" component={Dashboard}/>
      <Route component ={NotFound}/>
    </Switch>
  </Router>
);
