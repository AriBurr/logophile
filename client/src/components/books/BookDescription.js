import React from 'react';
import { connect } from 'react-redux';
import { addBook } from '../../actions/shelvings.js';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BookCover from './BookCover'
import ShelfForm from '../library/ShelfForm';
import { ButtonStyle } from '../../styles/styles';
import {
  Dropdown,
  Grid,
  Icon,
  List,
  Segment,
  Header,
  Divider,
  Button,
 } from 'semantic-ui-react';

const ImgGrid = styled(Grid.Column)`
  margin: 0 -50px;
`
const DropdownStyle = styled.div`
  &&& {
    margin: 0 auto;
  }
`
const DescContainer = styled.div`
  &&& {
    margin-left: 5%;
  }
`
const CreateBook = styled.div`
  margin: 0 auto;
`
const PageContain = styled(Grid)`
  #desc-container {
    width: 67% !important;
  }
`

class BookDescription extends React.Component {
  state = { bookshelf: '', edit: false }

  isLoggedIn = () => {
    const token = localStorage.getItem('userToken');
    return token ? true : false
  }

  toggleEdit = () => this.setState({ edit: !this.state.edit });

  bookshelfOptions = () => {
    const { bookshelves } = this.props;
    return bookshelves.map ( shelf => {
      return { key: shelf.id, text: shelf.name, value: shelf.name }
    });
  }

  handleSelection = (e, { value }) =>  {
    this.setState({ bookshelf: value });
  }

  handleSubmit = () => {
    const { bookshelf } = this.state;
    const { book, bookshelves, dispatch } = this.props;
    const shelf = bookshelves.filter( shelf => shelf.name === bookshelf );
    dispatch(addBook(book, shelf[0]));
  }

  bookDescriptionList = (book) => {
    return(
      <List>
        <List.Item as='h3'>
          {book.title}
        </List.Item>
        { book.authors && <List.Item><strong>Written by</strong> {book.authors[0]}</List.Item> }
        <Divider />
        <List.Item>{book.pageCount} pages</List.Item>
        <List.Item>Published {book.publishedDate} by {book.publisher}</List.Item>
      </List>
    )
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

  renderDropdown = () => (
    <DropdownStyle>
      <span>
        <Button
          as={ButtonStyle}
          onClick={ () => this.handleSubmit() }
          disabled={this.state.bookshelf.length < 1 ? true : false}
        >
          Select Bookshelf
        </Button>
        <Dropdown
          placeholder='Will Read'
          selection
          options={this.bookshelfOptions()}
          onChange={this.handleSelection}
        />
      </span>
    </DropdownStyle>
  )

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
          { this.isLoggedIn() && this.renderDropdown() }
          { this.isLoggedIn() && <Icon name='book' onClick={() => this.toggleEdit()}></Icon> }
        </Grid.Row>
        <Grid.Row as={DescContainer} >
          { edit && <CreateBook><ShelfForm /></CreateBook> }
          { book.description && this.renderDescription(book) }
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return { book: state.activeBook, bookshelves: state.bookshelves }
}

export default connect(mapStateToProps)(BookDescription);
