import React from 'react';
import { connect } from 'react-redux';
import Book from './Book';
import { Grid, Header } from 'semantic-ui-react';

const Books = ({ books, toggleDescription }) => (
  books.map( book => {
    return (
      <Grid.Column onClick={ () => toggleDescription(book) }>
        <Book
          key={book.id}
          book={book}
        />
      </Grid.Column>
    )
  })
)

const mapStateToProps = (state) => {
  return { books: state.books }
}

export default connect(mapStateToProps)(Books);
