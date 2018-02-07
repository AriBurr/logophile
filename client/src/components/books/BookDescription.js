import React from 'react';
import { connect } from 'react-redux';
import { addBook } from '../../actions/shelvings.js';
import noCover from '../../assets/default.jpg';
import styled from 'styled-components';
import BookCover from './BookCover'
import {
  Dropdown,
  Grid,
  List,
  Segment,
  Header,
  Divider,
  Button,
 } from 'semantic-ui-react';

const Image = styled.img`
  height: 198px;
  width: 128px;
  border: 1px solid black;
  margin-right: -50px;
`
const ImgGrid = styled(Grid.Column)`
  margin: 0 -50px;
`
const DropdownStyle = styled.div`
  margin: 0 auto !important;
`
const DescContainer = styled.div`
  margin-left: 5% !important;
`
const PageContain = styled(Grid)`
  #desc-container{
    width: 67% !important;
  }
`
const ButtonStyle = styled(Button)`
  &&& {
    background-color: #E6C229;
    color: white;
      &:hover {
        background-color: #223843;
        color: white;
      }
  }
`

class BookDescription extends React.Component {
  state = { bookshelf: '' }

  // componentDidMount = () => {
  //   const { bookshelves } = this.props
  //   if(bookshelves)
  //     this.setState({ bookshelf: bookshelves[0].name })
  // }

  isLoggedIn = () => {
    const token = localStorage.getItem('userToken');
    return token ? true : false
  }

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

  getIBSN = (book) => {
    return book.industryIdentifiers.map( ibsn => {
      return (<div key={ibsn.identifier}>{ibsn.type}: {ibsn.identifier}</div>)
    });
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
        { book.industryIdentifiers && <List.Item>{this.getIBSN(book)}</List.Item> }
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
        <Grid.Row>
          { this.isLoggedIn() && this.renderDropdown() }
        </Grid.Row>
        <Grid.Row as={DescContainer} >
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
