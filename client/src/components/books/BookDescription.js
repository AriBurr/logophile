import React from 'react';
import { connect } from 'react-redux';
import noCover from '../../assets/default.jpg';
import styled from 'styled-components';
import {
  Dropdown,
  Grid,
  List,
 } from 'semantic-ui-react';

const Image = styled.img`
  height: 198px;
  width: 128px;
`

class BookDescription extends React.Component {
  state = { bookshelf: '' }

  bookshelfOptions = () => {
    const { bookshelves } = this.props;
    return bookshelves.map ( (shelf, i) => {
      return { key: i, text: shelf.name, value: shelf.name }
    });
  }

  addBook =(book) => {
    window.confirm(`Add '${book.title}' by ${book.authors[0]} to your bookshelf?`)
  }

  handleSelection = (e, { value }) => this.setState({ bookshelf: value });

  getIBSN = (book) => {
    return book.industryIdentifiers.map( ibsn => {
      return (<div>{ibsn.type}: {ibsn.identifier}</div>)
    });
  }

  render () {
    const book = this.props.book.volumeInfo;
    debugger
    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column textAlign='center'>
            { book.imageLinks ?
              <Image
                src={book.imageLinks.thumbnail}
                alt={'book cover'}
              /> :
              <Image
                src={noCover}
                alt={'book cover'}
              />
            }
          </Grid.Column>
            <List>
              <List.Item>Title: {book.title}</List.Item>
              <List.Item>Author: {book.authors[0]}</List.Item>
              <List.Item>Pages: {book.pageCount} pgs</List.Item>
              <List.Item>Published: {book.publisher}, {book.publishedDate}</List.Item>
              <List.Item>{this.getIBSN(book)}</List.Item>
              <Dropdown
                placeholder='Add to Bookshelf'
                options={this.bookshelfOptions()}
                onChange={this.handleSelection}
              >
              </Dropdown>
            </List>
          <Grid.Column>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          {book.description}
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return { book: state.activeBook, bookshelves: state.bookshelves }
}

export default connect(mapStateToProps)(BookDescription);
