import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrentClub } from '../../actions/clubs';
import Announcements from './Announcements';
import ClubBanner from './ClubBanner';
import ClubForm from './ClubForm';
import CurrentReading from './CurrentReading';
import ClubSideNav from './ClubSideNav';
import DiscussionPreview from './DiscussionPreview';
import Introduction from './Introduction';
import styled from 'styled-components';
import { Grid } from 'semantic-ui-react';

const Wrapper = styled.div`
  height: 100vh;
  overflow: auto;
  padding: 1%;
`;

class ClubHome extends React.Component {
  state = { edit: false };

  componentDidMount() {
    const clubID = this.props.match.params.id;
    this.props.dispatch(fetchCurrentClub(clubID));
  }

  toggleEdit = () => {
    const { edit } = this.state;
    this.setState({ edit: !edit });
  };

  render() {
    const { edit } = this.state;
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
              {edit ? (
                <ClubForm edit={edit} toggleEdit={this.toggleEdit} />
              ) : (
                <Introduction toggleEdit={this.toggleEdit} />
              )}
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

const mapStateToProps = state => {
  return { club: state.currentClub };
};

export default connect(mapStateToProps)(ClubHome);
