import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchCurrentClub } from '../actions/clubs';

class FetchModeratorStatus extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const clubID = this.props.match.params.id;
    dispatch(fetchCurrentClub(clubID));
    debugger
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = state => {
  return { club: state.currentClub, userClubs: state.userClubs };
};

export default withRouter(connect()(FetchModeratorStatus));
