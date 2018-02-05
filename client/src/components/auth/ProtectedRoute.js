import React from 'react'
import { connect } from 'react-redux'
import { setFlash } from '../../actions/flash'
import { Redirect, Route } from 'react-router-dom';

class ProtectedRoute extends React.Component {

  unpermitted = () => {
    this.props.dispatch(setFlash('Must login to view this page', 'red'))
    return (
      <Redirect to={{
        pathname: '/login',
        state: { from: this.props.location }
      }}/>
    );
  }

  isLoggedIn = () => {
    const token = localStorage.getItem('userToken');
    return token ? true : false
  }

  render() {

    if(this.isLoggedIn())
      return <Route {...this.props}/>
    return this.unpermitted();
  }
}

export default connect()(ProtectedRoute);
