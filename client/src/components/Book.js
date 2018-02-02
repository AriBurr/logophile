import React from 'react';
import noCover from '../assets/default.jpg';
import styled from 'styled-components';
import {
  Container,
  Segment,
 } from 'semantic-ui-react';

const Image = styled.img`
  height: 198px;
  width: 128px;
  box-shadow: 0 1px 2px #999;
  transition: box-shadow 0.25s;
    &:hover {
      box-shadow: 0 1px 20px #999;
    }
`

class Book extends React.Component {

  book = () => {
    const { book } = this.props;
    return (
      <Container>
        { book.volumeInfo.imageLinks ?
          <Image
            src={ book.volumeInfo.imageLinks.thumbnail }
            alt={`${book.volumeInfo.title} cover`}
          /> :
          <Image
            src={ noCover }
            alt={`${book.volumeInfo.title} cover`}
          />
        }
      </Container>
    );
  }

  render() {
    return (
      <Segment basic>
        { this.book() }
      </Segment>
    );
  }

}

export default Book;
