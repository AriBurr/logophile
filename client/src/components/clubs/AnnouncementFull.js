import React from 'react';
import Announcements from './Announcements';
import AnnouncementForm from './AnnouncementForm';

import { connect } from 'react-redux';
import { fetchCurrentClub } from '../../actions/clubs';
import { withRouter } from 'react-router-dom';

class AnnouncementFull extends React.Component {
  state = { annEdit: false, isModerator: false };

  componentDidMount() {
    const { dispatch } = this.props;
    const clubID = this.props.match.params.id;
    dispatch(fetchCurrentClub(clubID, this.setClubLoaded));
  }

  setClubLoaded = () => {
    const { club } = this.props;
    this.setState({ isModerator: club.is_moderator });
  };

  toggleEditAnn = () => {
    const { annEdit } = this.state;
    this.setState({ annEdit: !annEdit });
  };

  render() {
    const { annEdit, isModerator } = this.state;
    return (
      <div>
        {annEdit ? (
          <AnnouncementForm edit={annEdit} toggleEdit={this.toggleEditAnn} />
        ) : (
          <Announcements
            isModerator={isModerator}
            toggleEdit={this.toggleEditAnn}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { club: state.currentClub, user: state.user };
};

export default withRouter(connect(mapStateToProps)(AnnouncementFull));
