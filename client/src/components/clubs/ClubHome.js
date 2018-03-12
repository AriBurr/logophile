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
import { Grid } from 'semantic-ui-react';

const Wrapper = styled.div`
  height: 100vh;
  overflow: auto;
  padding: 1%;
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
    readingsLoaded && dispatch(fetchDiscussion(readings[0]))
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
        <Grid className="container">
          <Grid.Row>
            <Grid columns={2}>
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
            <Grid.Column textAlign='center'>
              <AnnouncementHome />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row />
          <Grid.Row>
            <Grid.Column>
              <DiscussionHome />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return { club: state.currentClub, readings: state.readings };
};

export default connect(mapStateToProps)(ClubHome);
