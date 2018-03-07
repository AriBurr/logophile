import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { fetchClubs } from '../../actions/clubs';
import { fetchUserClubs } from '../../actions/userClubs';
import BookCover from '../books/BookCover';
import ClubForm from './ClubForm';
import styled from 'styled-components';
import { Divider, Grid } from 'semantic-ui-react';

const Description = styled.div`
  background-color: #f8f9fd;
  border-top: 1px solid rgba(87, 97, 122, 0.1);
  border-bottom: 1px solid rgba(87, 97, 122, 0.1);
  line-height: 25px;
  padding: 5% !important;
  width: 100%;
`;
const Header = styled.h3`
  line-height: 25px;
  padding: 1%;
`;
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

  displayAllClubs = () => {
    return this.props.allClubs.map(c => {
      return (
        <Grid.Column width={8} key={c.id}>
          <Divider />
          <Grid>
            <Grid.Column textAlign="center" width={4}>
              {c.item && <BookCover book={c} />}
              <em>Currently reading</em>
            </Grid.Column>
            <Grid.Column width={12}>
              <Grid.Row>
                <Link to={`/clubs/${c.id}`}>
                  <Header>{c.name}</Header>
                </Link>
              </Grid.Row>
              <Grid.Row>
                <Description>{c.description}</Description>
              </Grid.Row>
            </Grid.Column>
          </Grid>
          <Divider />
        </Grid.Column>
      );
    });
  };

  render() {
    return (
      <Wrapper>
        <ClubForm />
        <Divider hidden />
        <Grid>{this.displayAllClubs()}</Grid>
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
