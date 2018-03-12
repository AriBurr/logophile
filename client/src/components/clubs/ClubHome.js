import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrentClub } from '../../actions/clubs';
import { fetchReadings } from '../../actions/readings';
import { fetchDiscussion } from '../../actions/discussions';
import AnnouncementHome from './AnnouncementHome';
import CurrentReading from './CurrentReading';
import DiscussionHome from './DiscussionHome';
import IntroductionHome from './IntroductionHome';
import styled from 'styled-components';
import { Grid, Segment } from 'semantic-ui-react';

const Wrapper = styled.div`
  height: 100%;
  padding: 1%;
  .scroll-container {
    width: 70%;
    padding: 3% !important;
    margin: 0 auto !important;
  }
  .row {
    width: 90% !important;
  }
  .grid-row {
    width: 100%;
    margin: 0 auto !important;
    padding: 0 !important;
  }
`;

class ClubHome extends React.Component {
  state = { isModerator: false, readingsLoaded: false };

  componentDidMount() {
    const { dispatch } = this.props;
    const clubID = this.props.match.params.id;
    dispatch(fetchCurrentClub(clubID, this.setClubLoaded));
    dispatch(fetchReadings(clubID, this.setReadingsLoaded));
  }

  componentWillUpdate() {
    const { dispatch, readings } = this.props;
    const { readingsLoaded } = this.state;
    //A Club should have a reading before fetching discussions
    if (readings.length > 0)
      readingsLoaded && dispatch(fetchDiscussion(readings[0]));
  }

  setReadingsLoaded = () => {
    this.setState({ readingsLoaded: true });
  };

  setClubLoaded = () => {
    const { club } = this.props;
    this.setState({ isModerator: club.is_moderator });
  };

  render() {
    const { isModerator, readingsLoaded } = this.state;
    return (
      <Wrapper>
        <Segment className="scroll-container">
          <Grid>
            <Grid.Row>
              <Grid columns={2} className="grid-row">
                <Grid.Column>
                  <CurrentReading
                    clubID={this.props.match.params.id}
                    isModerator={isModerator}
                    readingsLoaded={readingsLoaded}
                  />
                </Grid.Column>
                <Grid.Column>
                  <IntroductionHome />
                </Grid.Column>
              </Grid>
            </Grid.Row>
            <Grid.Row>
              <AnnouncementHome />
            </Grid.Row>
            <Grid.Row />
            <Grid.Row>
              <DiscussionHome />
            </Grid.Row>
          </Grid>
        </Segment>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return { club: state.currentClub, readings: state.readings };
};

export default connect(mapStateToProps)(ClubHome);
