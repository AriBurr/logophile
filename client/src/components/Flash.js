import React from 'react';
import { connect } from 'react-redux';
import { Message, Container, Header } from 'semantic-ui-react';
import { clearFlash } from '../actions/flash';
import styled from 'styled-components'

const FlashStyle = styled(Container)`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
`

const fadeFlash = dispatch => {
  setTimeout(() => {
    dispatch(clearFlash());
  }, 15000);
};

const Flash = ({ flash, dispatch }) => {
  if (flash.message) {
    return (
      <Container as={FlashStyle}>
        <Message
          onDismiss={() => dispatch(clearFlash())}
          color={flash.color}
        >
          <Header as='h5' textAlign='center'>{flash.message}</Header>
          {fadeFlash(dispatch)}
        </Message>
      </Container>
    );
  }
  return null;
};

const mapStateToProps = state => {
  const { flash } = state;
  return { flash };
};

export default connect(mapStateToProps)(Flash);
