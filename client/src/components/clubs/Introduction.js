import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteClub } from '../../actions/clubs';
import styled from 'styled-components';
import { ButtonAction, ButtonWarning } from '../../styles/styles';
import { Divider, Header } from 'semantic-ui-react';

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
        <Header>{club.name}</Header>
        <p>{club.description}</p>
        <Divider hidden />
        {isModerator && [
          <ButtonAction key={1} onClick={() => toggleEdit()}>
            Edit
          </ButtonAction>,
          <ButtonWarning key={2} onClick={() => handleDelete()}>
            Delete
          </ButtonWarning>
        ]}
      </div>
    </Wrapper>
  );
};

const mapStateToProps = state => {
  return { club: state.currentClub };
};

export default withRouter(connect(mapStateToProps)(Introduction));
