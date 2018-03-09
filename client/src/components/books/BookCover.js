import React from 'react';
import noCover from '../../assets/default.jpg';
import styled from 'styled-components';
import { Container } from 'semantic-ui-react';
import defaultCover from '../../assets/default_book_cover.jpg'

const Image = styled.img`
  height: 198px;
  width: 128px;
  box-shadow: 0 1px 2px #999;
  margin: 0 auto;
  transition: box-shadow 0.25s;
  &:hover {
    box-shadow: 0 1px 20px #999;
  }
`;

const BookCover = ({ book }) => {
  let data = null;
  book.item ? (data = book.item) : (data = book);

  const { volumeInfo } = data;
  debugger
  return (
    <Container>
      <Image
        src={volumeInfo ? volumeInfo.imageLinks.thumbnail : defaultCover}
        alt={volumeInfo ? `${volumeInfo.title} cover` : 'Default Cover'}
      />
    </Container>
  );
};

export default BookCover;
