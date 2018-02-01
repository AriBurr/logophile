import React from 'react';
import Book from './Book';
import { Grid } from 'semantic-ui-react';

const Books = ({ books }) => (
  books.map( book => {
    debugger
    return (
      <Grid.Column>
        <Book key={book.id} book={book} />
      </Grid.Column>
    )
  })
)

export default Books;
