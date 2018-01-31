import React from 'react';
import Books from './Books';
import Flash from './Flash';
import NoMatch from './NoMatch';
import NavBar from './NavBar';
import Login from '../auth/Login';
import Register from '../auth/Register';
import { Switch, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        <Flash />
        <NavBar />
        <Switch>
          <Route exact path='/' component={Books} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default App;
