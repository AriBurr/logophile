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

const ensureNormalData = (data) => {
let normal = {}
data.item || data.item === null ? normal = data : normal.item = data
return normal
}

const imagesAvailable = (data) => {
  if(data.item === null) return
  if (data.item.volumeInfo === undefined) return false
  if (data.item.volumeInfo.imageLinks) return true
  return false
}

const BookCover = ({ book }) => {
  const data = ensureNormalData(book)
  return (
    <Container>
      <Image
        src={imagesAvailable(data) ? data.item.volumeInfo.imageLinks.thumbnail : defaultCover}
        alt={imagesAvailable(data) ? `${data.title} cover` : 'Default Cover'}
      />
    </Container>
  );
};

export default BookCover;
