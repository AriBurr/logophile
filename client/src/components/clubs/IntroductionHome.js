import React from 'react';
import Introduction from './Introduction';
import ClubForm from './ClubForm';
import { connect } from 'react-redux';
import { fetchCurrentClub } from '../../actions/clubs';
import { withRouter } from 'react-router-dom';

class IntroFull extends React.Component {
  state = {
    introEdit: false,
    isModerator: false
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const clubID = this.props.match.params.id;
    dispatch(fetchCurrentClub(clubID, this.setClubLoaded));
  }

  setClubLoaded = () => {
    const { club } = this.props;
    this.setState({ isModerator: club.is_moderator });
  };

  toggleEditIntro = () => {
    const { introEdit } = this.state;
    this.setState({ introEdit: !introEdit });
  };

  render() {
    const { introEdit, isModerator } = this.state;
    return (
      <div>
        {introEdit ? (
          <ClubForm edit={introEdit} toggleEdit={this.toggleEditIntro} />
        ) : (
          <Introduction
            isModerator={isModerator}
            toggleEdit={this.toggleEditIntro}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { club: state.currentClub, user: state.user };
};

export default withRouter(connect(mapStateToProps)(IntroFull));
