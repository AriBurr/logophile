import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserClubs } from '../../actions/userClubs';
import BookCover from '../books/BookCover';
import styled from 'styled-components';
import { Grid, Header, Segment } from 'semantic-ui-react';

const Container = styled.div`
  height: 100vh;
  .parent-column {
    padding-bottom: 3%;
  }
  .card {
    border: 1px solid black;
    border-radius: 0 !important;
    width: 100% !important;
    .right-top {
      padding: 2%;
      font-weight: 800;
      color: hsl(0, 0%, 13%);
    }
    .right-bottom {
      background: rgba(0, 0, 0, 0.025) !important;
      color: hsl(0, 0%, 45%);
      color: black;
    }
  }
  .columns {
    padding: 0 !important;
  }
  .row-style {
    padding: 0 !important;
  }
`;

class MyClubs extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchUserClubs());
  }

  mapUserClubs = () => {
    return this.props.userClubs.map(club => {
      return (
        <Grid.Column className="parent-column">
          <Link to={`/clubs/${club.id}`} key={club.id}>
            <Grid className="card" columns={2}>
              <Grid.Row stretched className="row-style">
                <Grid.Column width={4} className="columns">
                  <BookCover book={club} />
                </Grid.Column>
                <Grid.Column width={12} className='columns'>
                  <Header className='right-top'>{club.name}</Header>
                  <Segment basic className='right-bottom'>{club.description}</Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Link>
        </Grid.Column>
      );
    });
  };

  render() {
    return (
      <Segment as={Container} basic className="container">
        <Grid>
          <Grid.Row columns={2}>{this.mapUserClubs()}</Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return { userClubs: state.userClubs };
};

export default connect(mapStateToProps)(MyClubs);
