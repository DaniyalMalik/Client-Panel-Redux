import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import store from './store';
import { rrfProps } from './store';
import {
  UserIsAuthenticated,
  UserIsNotAuthenticated,
} from './helpers/redirect';
import AppNavbar from './components/layout/AppNavbar';
import Dashboard from './components/layout/Dashboard';
import AddClient from './components/clients/AddClient';
import EditClient from './components/clients/EditClient';
import ClientDetails from './components/clients/ClientDetails';
import Login from './components/auth/Login';
import Settings from './components/settings/Settings';
import Register from './components/auth/Register';
import NotFound from './components/pages/NotFound';

export default function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router basename={process.env.PUBLIC_URL}>
          <div>
            <AppNavbar />
            <div className='container'>
              <Switch>
                <Route
                  exact
                  path='/'
                  component={UserIsAuthenticated(Dashboard)}
                />
                <Route
                  exact
                  path='/addclient'
                  component={UserIsAuthenticated(AddClient)}
                />
                <Route
                  exact
                  path='/clientdetails/:id'
                  component={UserIsAuthenticated(ClientDetails)}
                />
                <Route
                  exact
                  path='/editclient/:id'
                  component={UserIsAuthenticated(EditClient)}
                />
                <Route
                  exact
                  path='/register'
                  component={UserIsNotAuthenticated(Register)}
                />
                <Route
                  exact
                  path='/login'
                  component={UserIsNotAuthenticated(Login)}
                />
                <Route
                  exact
                  path='/settings'
                  component={UserIsAuthenticated(Settings)}
                />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}
