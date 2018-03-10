import React from 'react';
import styled from 'styled-components';
import { Container } from 'semantic-ui-react';
import defaultCover from '../../assets/default_book_cover.jpg'

const Image = styled.img`
  height: 202px;
  width: 132px;
  object-fit: cover;
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
  return (
    <Container>
      <Image
        src={volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : defaultCover}
        alt={volumeInfo ? `${volumeInfo.title} cover` : 'Default Cover'}
      />
    </Container>
  );
};

export default BookCover;
