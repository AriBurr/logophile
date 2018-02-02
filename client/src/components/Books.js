import React from 'react';
import Book from './Book';
import { Grid, Header } from 'semantic-ui-react';

const Books = ({ books, terms }) => (
  books.map( book => {
    return (
      <Grid.Column>
        <Book key={book.id} book={book} />
      </Grid.Column>
    )
  })
)

export default Books;
