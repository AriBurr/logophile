import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BookCover from './BookCover'
import BookshelfDropdown from './BookshelfDropdown';
import ShelfForm from '../library/ShelfForm';
import styled from 'styled-components';
import {
  Divider,
  Grid,
  Header,
  Icon,
  List,
  Segment,
 } from 'semantic-ui-react';

const CreateBook = styled.div`
margin: 0 auto;
`
const DescContainer = styled.div`
  &&& {
    margin-left: 5%;
  }
`
const ImgGrid = styled(Grid.Column)`
margin: 0 -50px;
`
const PageContain = styled(Grid)`
  #desc-container {
    width: 67% !important;
  }
`

class BookDescription extends React.Component {
  state = { edit: false }

  isLoggedIn = () => {
    const token = localStorage.getItem('userToken');
    return token ? true : false;
  }

  toggleEdit = () => this.setState({ edit: !this.state.edit });

  bookDescriptionList = (book) => {
    return (
      <List>
        <List.Item as='h3'>
          {book.title}
        </List.Item>
        { book.authors && <List.Item><strong>Written by</strong> {book.authors[0]}</List.Item> }
        <Divider />
        <List.Item>{book.pageCount} pages</List.Item>
        <List.Item>Published {book.publishedDate} by {book.publisher}</List.Item>
      </List>
    );
  }

  renderDescription = (book) => (
    <Segment>
      <Header textAlign='center' as='h4'>About "<em>{book.title}</em>"</Header>
      <Divider />
      {book.description}
    </Segment>
  )

  bookshelfOptions = () => {
    const { bookshelves } = this.props;
    return bookshelves.map ( shelf => {
      return { key: shelf.id, text: shelf.name, value: shelf.name }
    });
  }

  render () {
    const { edit } = this.state;
    const book = this.props.book.volumeInfo;
    return (
      <Grid as={PageContain}>
        <Grid.Row columns={2}>
          <Grid.Column id='desc-container'>
            <Segment basic >
              { this.bookDescriptionList(book) }
            </Segment>
          </Grid.Column>
          <Grid.Column as={ImgGrid} textAlign='center'>
            <BookCover book={this.props.book} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          { !this.isLoggedIn() && <em><Link to='/login'>Sign in</Link> to add this book to your bookshelf!</em> }
          { this.isLoggedIn() && <BookshelfDropdown /> }
          { this.isLoggedIn() && <Icon name='book' onClick={() => this.toggleEdit()}></Icon> }
        </Grid.Row>
        <Grid.Row as={DescContainer} >
          { edit && <CreateBook><ShelfForm /></CreateBook> }
          { book.description && this.renderDescription(book) }
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return { book: state.activeBook, bookshelves: state.bookshelves }
}

export default connect(mapStateToProps)(BookDescription);
