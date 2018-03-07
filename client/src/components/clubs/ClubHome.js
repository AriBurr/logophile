import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrentClub } from '../../actions/clubs';
import ClubBanner from './ClubBanner';
import ClubForm from './ClubForm';
import CurrentReading from './CurrentReading';
import ClubSideNav from './ClubSideNav';
import DiscussionPreview from './DiscussionPreview';
import Introduction from './Introduction';
import styled from 'styled-components';
import { Grid } from 'semantic-ui-react';
import IntroFull from './IntroFull'
import AnnouncementFull from './AnnouncementFull'

const Wrapper = styled.div`
  height: 100vh;
  overflow: auto;
  padding: 1%;
`;

class ClubHome extends React.Component {
  state = {
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

  render() {
    const { annEdit, introEdit, isModerator } = this.state;
    return (
      <Wrapper>
        <ClubBanner />
        <Grid className='container'>
          <Grid.Column width={16}>
            <Grid.Row>
              <CurrentReading
                clubID={this.props.match.params.id}
                isModerator={isModerator}
              />
            </Grid.Row>
            <Grid.Row>
              <AnnouncementFull />
            </Grid.Row>
            <Grid.Row>
            </Grid.Row>
            <Grid.Row>
              <DiscussionPreview />
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return { club: state.currentClub };
};

export default connect(mapStateToProps)(ClubHome);
