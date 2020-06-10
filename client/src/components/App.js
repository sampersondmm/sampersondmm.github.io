import React from 'react';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import Canvas from './canvas/Canvas';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import {authorizeUser} from '../actions/userActions';
import {removeError} from '../actions/errorActions';
import {connect} from 'react-redux';
import withAuth from '../hocs/withAuth';

const App = props => {
  const {authorizeUser, error, isAuthenticated, currentUser} = props;
  return (
    <div>
      <Switch>
        <Route 
          exact 
          path='/' 
          component={withAuth(HomePage)}
        />
        <Route 
          exact 
          path='/signup' 
          render={props => {
            return (
              <LoginPage 
                error={error}
                authType='signup'
                removeError={removeError}
                onAuth={authorizeUser}
                {...props}
              />
            )
          }}
        />
        <Route
          exact
          path='/signin'
          onAuth={authorizeUser}
          render={props => {
            return (
              <LoginPage 
                error={error}
                authType='signin'
                removeError={removeError}
                onAuth={authorizeUser}
              {...props}
            />
            )
          }}
        />
        <Route exact path='/canvas/new' component={Canvas}/>
      </Switch>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    error: state.error,
    isAuthenticated: state.currentUser.isAuthenticated
  }
}

export default withRouter(connect(mapStateToProps, {authorizeUser})(App));
