import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/user';
import { withRouter } from 'react-router-dom';


class FetchUser extends React.Component {
  state = { loggedIn: false }

  componentDidMount(){
    const { dispatch } = this.props
    const token = localStorage.getItem('userToken');
    if (token.length > 1)
      dispatch(fetchUser(token))
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(connect()(FetchUser));
