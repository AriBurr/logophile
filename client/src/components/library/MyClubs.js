import React from 'react';
import { connect } from 'react-redux';
import { fetchUserClubs } from '../../actions/userClubs';
import { Link } from 'react-router-dom';
import { Segment, Grid, Card } from 'semantic-ui-react';
import styled from 'styled-components';

const Container = styled.div`
  height: 85vh;
`;

class MyClubs extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchUserClubs());
  }

  mapUserClubs = () => {
    return this.props.userClubs.map(club => {
      return (
        <Link to={`/clubs/${club.id}`} key={club.id}>
          <Card>
            <Card.Content>
              <Card.Header>{club.name}</Card.Header>
            </Card.Content>
            <Card.Content>{club.description}</Card.Content>
          </Card>
        </Link>
      );
    });
  };

  render() {
    return (
      <Segment as={Container} basic className="container">
        <Grid>{this.mapUserClubs()}</Grid>
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return { userClubs: state.userClubs };
};

export default connect(mapStateToProps)(MyClubs);
