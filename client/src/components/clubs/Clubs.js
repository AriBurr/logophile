import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { fetchClubs } from '../../actions/clubs';
import { joinClub } from '../../actions/userClubs';
import { paginateText } from '../../utils/modules';
import FormAccordion from './FormAccordion';
import BookCover from '../books/BookCover';
import MyClubs from '../library/MyClubs';
import styled from 'styled-components';
import { ButtonAction } from '../../styles/styles';
import { Divider, Grid, Button } from 'semantic-ui-react';

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
  .with-button{
    padding-top: 5%;
  }
`;

class Clubs extends React.Component {
  state = { viewAll: 'true' };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchClubs());
  }

  toggleClubView = () => {
    this.setState({ viewAll: !this.state.viewAll });
  };

  displayAllClubs = () => {
    return this.props.allClubs.map(c => {
      return (
        <Grid.Column width={8} key={c.id}>
          <Divider />
          <Grid>
            <Grid.Column textAlign="center" width={4}>
              <BookCover book={c} />
            </Grid.Column>
            <Grid.Column width={12}>
              <Grid.Row>
                <Link to={`/clubs/${c.id}`}>
                  <Header>{c.name}</Header>
                </Link>
              </Grid.Row>
              <Grid.Row>
                <Description>
                  {paginateText(c.description, 240)}{" "}
                  <Link to={`/clubs/${c.id}`}>
                    (Read More)
                  </Link>
                </Description>
              </Grid.Row>
              <Grid.Row className='with-button'>
                <ButtonAction
                  onClick={() => this.props.dispatch(joinClub(c.id))}
                >
                  Join this club!
                </ButtonAction>
              </Grid.Row>
            </Grid.Column>
          </Grid>
          <Divider />
        </Grid.Column>
      );
    });
  };

  render() {
    const { viewAll } = this.state;
    return (
      <Wrapper>
        <Grid columns={2}>
          <Grid.Column>
            <FormAccordion />
          </Grid.Column>
          <Grid.Column textAlign="right">
            <Button onClick={() => this.toggleClubView()}>
              {viewAll ? 'My Clubs' : 'All Clubs'}
            </Button>
          </Grid.Column>
        </Grid>
        <Grid>{viewAll ? this.displayAllClubs() : <MyClubs />}</Grid>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    allClubs: state.clubs,
    user: state.user
  };
};

export default withRouter(connect(mapStateToProps)(Clubs));
