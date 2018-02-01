import React from 'react';
import noCover from '../assets/default.jpg';
import styled from 'styled-components';
import {
  Segment,
  Reveal,
 } from 'semantic-ui-react';

const Image = styled.img`
  height: 198px;
  width: 128px;
`

class Books extends React.Component {

  book = () => {
    const { book } = this.props;
    return (
      <Reveal animated='fade'>
        <Reveal.Content visible>
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
        </Reveal.Content>
        <Reveal.Content hidden>
        </Reveal.Content>
      </Reveal>
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

export default Books;
