import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {paginateText} from '../utils/modules';
import noCover from '../assets/default.jpg';
import styled from 'styled-components';
import {
  Grid,
  List,
 } from 'semantic-ui-react';

const Image = styled.img`
  height: 198px;
  width: 128px;
`

class BookDescription extends React.Component {

  render () {
    const { book } = this.props;
    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
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
            <List>
              <List.Item>Title: {book.volumeInfo.title}</List.Item>
              <List.Item>Author: {book.volumeInfo.authors[0]}</List.Item>
              <List.Item>Pages: {book.volumeInfo.pageCount} pgs</List.Item>
              <List.Item>Published: {book.volumeInfo.publisher}, {book.volumeInfo.publishedDate}</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column>
            {paginateText(book.volumeInfo.description)}
            <Link to={`/books/${book.id}`}>Read More</Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return { books: state.books }
}

export default connect(mapStateToProps)(BookDescription);
