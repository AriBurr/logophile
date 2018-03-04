import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { fetchClubs } from '../../actions/clubs';
import { fetchUserClubs, joinClub } from '../../actions/userClubs';
import ClubForm from './ClubForm';
import styled from 'styled-components';
import { Divider, Grid, Header, Button } from 'semantic-ui-react';

const Wrapper = styled.div`
  height: 100vh;
  overflow: auto;
  padding: 1%;
`;

class Clubs extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchClubs());
    dispatch(fetchUserClubs());
  }

  handleClubJoin = clubId => {
    const { history, dispatch } = this.props;
    dispatch(joinClub(clubId));
    history.push('/my_clubs');
  };

  filterClubs = () => {
    const { allClubs, userClubs } = this.props;
    if (userClubs.length != 0) {
      // return clubs user clubs
    } else {
      return allClubs;
    }
  };

  displayAllClubs = () => {
    return this.filterClubs().map(c => {
      return (
        <Grid.Column
          key={c.id}
          mobile="16"
          tablet="5"
          computer="4"
          largeScreen="3"
        >
          <Link to={`/clubs/${c.id}`}>
            <Header>{c.name}</Header>
          </Link>
          <p>{c.description}</p>
          <Button onClick={() => this.handleClubJoin(c.id)}>
            Join this club
          </Button>
        </Grid.Column>
      );
    });
  };

  displayUserClubs = () => {
    const { userClubs } = this.props;
    return userClubs.map(c => {
      return (
        <Grid.Column
          key={c.id}
          mobile="16"
          tablet="5"
          computer="4"
          largeScreen="3"
        >
          <Link to={`/clubs/${c.id}`}>
            <Header>{c.name}</Header>
          </Link>
          <p>{c.description}</p>
        </Grid.Column>
      );
    });
  };

  render() {
    return (
      <Wrapper>
        <ClubForm />
        <Divider hidden />
        <Grid>
          {this.displayAllClubs()}
          {this.displayUserClubs()}
        </Grid>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    allClubs: state.clubs,
    user: state.user,
    userClubs: state.userClubs
  };
};

export default withRouter(connect(mapStateToProps)(Clubs));
