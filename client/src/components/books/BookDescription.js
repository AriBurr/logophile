import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import noCover from '../../assets/default.jpg';
import styled from 'styled-components';
import {
  Button,
  Grid,
  List,
 } from 'semantic-ui-react';

const Image = styled.img`
  height: 198px;
  width: 128px;
`

class BookDescription extends React.Component {

  addBook =(book) => {
    window.confirm(`Add '${book.volumeInfo.title}' by ${book.volumeInfo.authors[0]} to your bookshelf?`)
  }

  getIBSN = (book) => {
    return book.volumeInfo.industryIdentifiers.map( ibsn => {
      return (
        <div>
          {ibsn.type}: {ibsn.identifier}
        </div>
      )
    })
  }

  render () {
    const { book } = this.props;
    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column textAlign='center'>
            { book.volumeInfo.imageLinks ?
              <Image
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={'book cover'}
              /> :
              <Image
                src={noCover}
                alt={'book cover'}
              />
            }
            <Button onClick={ () => this.addBook(book) }>Add to Bookshelf</Button>
          </Grid.Column>
            <List>
              <List.Item>Title: {book.volumeInfo.title}</List.Item>
              <List.Item>Author: {book.volumeInfo.authors[0]}</List.Item>
              <List.Item>Pages: {book.volumeInfo.pageCount} pgs</List.Item>
              <List.Item>Published: {book.volumeInfo.publisher}, {book.volumeInfo.publishedDate}</List.Item>
              <List.Item>{this.getIBSN(book)}</List.Item>
            </List>
          <Grid.Column>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          {book.volumeInfo.description}
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return { books: state.books }
}

export default connect(mapStateToProps)(BookDescription);
