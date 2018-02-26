import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Clubs from './clubs/Clubs';
import ClubHome from './clubs/ClubHome';
import FetchUser from './FetchUser';
import Flash from './Flash';
import Footer from './Footer';
import Library from './library/Library';
import MyClubs from './library/MyClubs';
import Login from './auth/Login';
import Navigation from './Navigation';
import NoMatch from './NoMatch';
import ProtectedRoute from './auth/ProtectedRoute';
import Register from './auth/Register';
import SearchBooks from './books/SearchBooks';
import Welcome from './Welcome';

class App extends React.Component {
  render() {
    return (
      <div>
        <FetchUser>
          <Navigation />
          <Flash />
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/books" component={SearchBooks} />
            <ProtectedRoute exact path="/library" component={Library} />
            <ProtectedRoute exact path="/my_clubs" component={MyClubs} />
            <Route exact path="/clubs" component={Clubs} />
            <Route exact path="/clubs/:id" component={ClubHome} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route component={NoMatch} />
          </Switch>
          <Footer />
        </FetchUser>
      </div>
    );
  }
}

export default App;
