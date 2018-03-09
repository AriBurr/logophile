import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteClub } from '../../actions/clubs';
import styled from 'styled-components';
import { Button, Divider, Header } from 'semantic-ui-react';

const Wrapper = styled.div`
  padding: 1%;
`;

const Introduction = ({ club, dispatch, history, isModerator, toggleEdit }) => {
  const handleDelete = () => {
    dispatch(deleteClub(club));
    history.push('/clubs');
  };

  return (
    <Wrapper>
      <div>
        <Header>{club.created_at}</Header>
        <Header>{club.name}</Header>
        <p>{club.description}</p>
        <Divider hidden />
        {isModerator && [
          <Button key={1} onClick={() => toggleEdit()}>
            Edit
          </Button>,
          <Button key={2} onClick={() => handleDelete()}>
            Delete
          </Button>
        ]}
      </div>
    </Wrapper>
  );
};

const mapStateToProps = state => {
  return { club: state.currentClub };
};

export default withRouter(connect(mapStateToProps)(Introduction));
