import React from 'react'
import PropTypes from 'prop-types'
import { setFlash } from '../../actions/flash'
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux'

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

  render() {
    if(this.props.loggedIn)
      return <Route {...this.props}/>
    return this.unpermitted();
  }
}

  const mapStateToProps = (state) => {
    return {
      loggedIn: state.user.id,
    }
  }

export default connect(mapStateToProps)(ProtectedRoute);
