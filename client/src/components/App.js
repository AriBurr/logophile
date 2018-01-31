import React from 'react';
import Books from './Books';
import Flash from './Flash';
import NoMatch from './NoMatch';
import { Switch, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        <Flash />
        <Switch>
          <Route exact path='/' component={Books} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default App;
