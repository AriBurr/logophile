import React from 'react';
import { connect } from 'react-redux';
import noCover from '../../assets/default.jpg';
import styled from 'styled-components';
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
const DescContainer = styled.div`
  margin-left: 5% !important;
`
const PageContain = styled(Grid)`
  #desc-container{
    width: 67% !important;
  }
`

class BookDescription extends React.Component {
  state = { bookshelf: '' }

  bookshelfOptions = () => {
    const { bookshelves } = this.props;
    return bookshelves.map ( shelf => {
      return { key: shelf.id, text: shelf.name, value: shelf.name }
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

  bookDescriptionList = (book) => {
    return(
      <List>
        <List.Item as='h3'>
          Title: {book.title}
        </List.Item>
        <Divider basic />
        { book.authors && <List.Item>Author: {book.authors[0]}</List.Item> }
        <List.Item>Pages: {book.pageCount} pgs</List.Item>
        <List.Item>Published: {book.publisher}, {book.publishedDate}</List.Item>
        <List.Item>{this.getIBSN(book)}</List.Item>
      </List>
    )
  }

  renderDescription = (book) => (
    <Segment>
      <Header textAlign='center' as='h4'>About: "<em>{book.title}</em>"</Header>
      <Divider />
      {book.description}
    </Segment>
  )

  trigger = () => (
    <Button color='blue'>
      Add To Bookshelf
    </Button>
  )

  render () {
    const book = this.props.book.volumeInfo;
    return (
      <Grid as={PageContain}>
        <Grid.Row columns={2}>
          <Grid.Column as={ImgGrid} textAlign='center'>
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
          <Grid.Column id='desc-container'>
            <Segment basic >
              { this.bookDescriptionList(book) }
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Button.Group color='teal'>
            <Button>Save to bookshelf</Button>
            <Dropdown
              floating button className='icon'
              placeholder='Add to Bookshelf'
              options={this.bookshelfOptions()}
              onChange={this.handleSelection}
              >
            </Dropdown>
          </Button.Group>
        </Grid.Row>
        <Grid.Row as={DescContainer} >
          {book.description && this.renderDescription(book)}
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return { book: state.activeBook, bookshelves: state.bookshelves }
}

export default connect(mapStateToProps)(BookDescription);
