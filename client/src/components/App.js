import React from 'react';
import NoMatch from './NoMatch';
import { Switch, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={#} />
          <Route component={#} />
        </Switch>
      </div>
    );
  }
}

export default App;
