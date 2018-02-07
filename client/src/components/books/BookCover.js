import React from 'react';
import noCover from '../../assets/default.jpg';
import styled from 'styled-components';
import { Container, Rating } from 'semantic-ui-react';

const Image = styled.img`
  height: 198px;
  width: 128px;
  box-shadow: 0 1px 2px #999;
  transition: box-shadow 0.25s;
    &:hover {
      box-shadow: 0 1px 20px #999;
    }
`

const BookCover = ({ book }) => {
  let data = null;
  book.item ? data = book.item: data = book

  const { volumeInfo } = data
  return(
    <Container>
      <Image
        src={ volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : noCover }
        alt={`${volumeInfo.title} cover`}
      />
    </Container>
  )
}

export default BookCover;
