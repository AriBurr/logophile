import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrentClub } from '../../actions/clubs';
import { withRouter } from 'react-router-dom';
import Announcements from './Announcements';
import AnnouncementForm from './AnnouncementForm';
import styled from 'styled-components';

const Container = styled.div`
  border: 0;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
`;

class AnnouncementHome extends React.Component {
  state = { edit: false, isModerator: false };

  componentDidMount() {
    const { dispatch } = this.props;
    const clubID = this.props.match.params.id;
    dispatch(fetchCurrentClub(clubID, this.setClubLoaded));
  }

  setClubLoaded = () => {
    const { club } = this.props;
    this.setState({ isModerator: club.is_moderator });
  };

  toggleEdit = () => {
    const { edit } = this.state;
    this.setState({ edit: !edit });
  };

  render() {
    const { edit, isModerator } = this.state;
    return (
      <Container>
        {edit ? (
          <AnnouncementForm edit={edit} toggleEdit={this.toggleEdit} />
        ) : (
          <Announcements
            isModerator={isModerator}
            toggleEdit={this.toggleEdit}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return { club: state.currentClub, user: state.user };
};

export default withRouter(connect(mapStateToProps)(AnnouncementHome));
