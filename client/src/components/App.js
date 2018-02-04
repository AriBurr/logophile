import React from 'react';
import Books from './books/Books';
import Flash from './Flash';
import Home from './Home';
import NoMatch from './NoMatch';
import NavBar from './NavBar';
import FetchUser from './FetchUser';
import Library from './library/Library';
import Login from '../auth/Login';
import Register from '../auth/Register';
import { Switch, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        <FetchUser>
          <Flash />
          <NavBar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/library' component={Library} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route component={NoMatch} />
          </Switch>
        </FetchUser>
      </div>
    );
  }
}

export default App;
