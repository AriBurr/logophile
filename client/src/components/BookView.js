import React from 'react';
import BookViewer from './BookViewer';
import noCover from '../assets/default.jpg';
import { connect } from 'react-redux';
import {
  Container,
  Grid,
  Image,
  List,
 } from 'semantic-ui-react';

class BookView extends React.Component {

  getIBSN = (book) => {
    return book.volumeInfo.industryIdentifiers.map( ibsn => {
      return (
        <div>
          {ibsn.type}: {ibsn.identifier}
        </div>
      )
    })
  }

  render() {
    const { book } = this.props;
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              { book.volumeInfo.imageLinks ?
                <Image
                  src={ book.volumeInfo.imageLinks.thumbnail }
                  alt={`${book.volumeInfo.title} cover`}
                /> :
                <Image
                  src={ noCover }
                  alt={`${book.volumeInfo.title} cover`}
                />
              }
              <List>
                <List.Item>Title: {book.volumeInfo.title}</List.Item>
                <List.Item>Author: {book.volumeInfo.authors[0]}</List.Item>
                <List.Item>Pages: {book.volumeInfo.pageCount} pgs</List.Item>
                <List.Item>Published: {book.volumeInfo.publisher}, {book.volumeInfo.publishedDate}</List.Item>
                <List.Item>{this.getIBSN(book)}</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={12}>
              { book.volumeInfo.description }
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <BookViewer />
          </Grid.Row>
        </Grid>
        <div id='viewerCanvas'style={{width: '600px', height: '500px'}}>
        </div>
      </Container>
    )
  }

}

const mapStateToProps = (state) => {
  return { book: state.activeBook }
}

export default connect(mapStateToProps)(BookView);
