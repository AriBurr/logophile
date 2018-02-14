import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchBookshelves } from '../actions/bookshelves';
import { fetchUser } from '../actions/user';

class FetchUser extends React.Component {
  state = { loggedIn: false };

  componentWillReceiveProps = (nextProps) => {
    if(this.checkForToken())
      this.props.dispatch(fetchBookshelves());
  }

  checkForToken = () => {
    return localStorage.getItem('userToken');
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const token = this.checkForToken()
    if(token){
      if (token.length > 1){
        dispatch(fetchBookshelves());
        dispatch(fetchUser(token));
      }
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(connect()(FetchUser));
