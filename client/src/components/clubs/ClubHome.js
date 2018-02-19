import React from 'react';
import { connect } from 'react-redux';
import Announcements from './Announcements';
import ClubBanner from './ClubBanner';
import CurrentReading from './CurrentReading';
import ClubSideNav from './ClubSideNav';
import DiscussionPreview from './DiscussionPreview';
import Introduction from './Introduction';
import styled from 'styled-components';
import { Grid } from 'semantic-ui-react';

const Wrapper = styled.div`
  height: 100vh;
  overflow: auto;
`;

class ClubHome extends React.Component {
  render() {
    return (
      <Wrapper>
        <ClubBanner />
        <Grid>
          <Grid.Column
            mobile="16"
            tablet="5"
            computer="4"
            largeScreen="3"
            width={3}
          >
            <ClubSideNav />
          </Grid.Column>
          <Grid.Column
            mobile="16"
            tablet="11"
            computer="12"
            largeScreen="13"
            width={13}
          >
            <Grid.Row>
              <Introduction />
            </Grid.Row>
            <Grid.Row>
              <Announcements />
            </Grid.Row>
            <Grid.Row>
              <CurrentReading />
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

export default connect()(ClubHome);
