import React from 'react';
import Flash from './Flash';
import SearchBooks from './books/SearchBooks';
import NoMatch from './NoMatch';
import Navigation from './Navigation';
import Footer from './Footer';
import Welcome from './Welcome';
import FetchUser from './FetchUser';
import Library from './library/Library';
import Login from './auth/Login';
import ProtectedRoute from './auth/ProtectedRoute';
import Register from './auth/Register';
import { Switch, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        <FetchUser>
          <Navigation />
          <Flash />
          <Switch>
            <Route exact path='/' component={Welcome} />
            <Route exact path='/books' component={SearchBooks} />
            <ProtectedRoute exact path='/library' component={Library} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route component={NoMatch} />
          </Switch>
          <Footer />
        </FetchUser>
      </div>
    );
  }
}

export default App;
