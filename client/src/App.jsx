import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import { Provider } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import './css/App.scss';
import about from './components/about';
import recipes from './components/RecipeProfile';
import { logoutUser, setCurrentUser } from './actions/authActions';
import store from './store/store';
import Landing from './components/layout/landing';
import Register from './components/auth/register';
import Login from './components/auth/login';
import PrivateRoute from './components/private-route/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import Navigation from './components/layout/navbar';
import YeastCalculator from './components/yeastCalc';
import RecipeList from './components/RecipeList';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = './login';
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navigation />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/yeastcalc" component={YeastCalculator} />
          <Route path="/about" component={about} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/recipes" component={recipes} />
            <PrivateRoute exact path="/recipelist" component={RecipeList} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
