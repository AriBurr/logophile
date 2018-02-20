import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button, Divider, Header, Segment } from 'semantic-ui-react';

const Wrapper = styled.div`
  padding: 1%;
`;

const Introduction = ({ club, toggleEdit }) => (
  <Wrapper>
    <Segment>
      <Header>{club.name}</Header>
      <p>{club.description}</p>
      <Divider hidden />
      <Button onClick={() => toggleEdit()}>Edit</Button>
    </Segment>
  </Wrapper>
);

const mapStateToProps = state => {
  return { club: state.club };
};

export default connect(mapStateToProps)(Introduction);
