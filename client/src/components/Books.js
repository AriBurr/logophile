import React from 'react';
import {
  Container,
  Header,
 } from 'semantic-ui-react';

class Books extends React.Component {

  render() {
    return (
      <Container>
        <Header as='h1' textAlign='center' block>Search Books</Header>
      </Container>
    );
  }

}

export default Books;
