import React from 'react';
import BookCover from './books/BookCover';
import { connect } from 'react-redux';
import { addRating } from '../actions/ratings';
import { editShelving } from '../actions/shelvings';
import styled from 'styled-components';
import {
  Divider,
  Dropdown,
  Grid,
  List,
  Modal,
  Rating,
} from 'semantic-ui-react';

const Wrapper = styled.div`
  margin: 5%;
`

class BookModal extends React.Component {
  state = { bookshelf: '' }

  handleChange = (event: e, data: data) =>{
    const { book, dispatch } = this.props
    dispatch(addRating(data.rating, book.id))
  }

  getIBSN = (book) => {
    return book.industryIdentifiers.map( ibsn => {
      return (<div key={ibsn.identifier}>{ibsn.type}: {ibsn.identifier}</div>)
    });
  }

  handleSelection = (e, { value }) =>  {
    const { book, bookshelves, dispatch } = this.props;
    const shelf = (bookshelves.filter( shelf => shelf.name === value ))[0];
    const shelving = { id: book.shelving_id, book_id: book.id, bookshelf_id: shelf.id };
    dispatch(editShelving(shelf, shelving));
  }

  bookshelfOptions = () => {
    const { bookshelves } = this.props;
    return bookshelves.map ( shelf => {
      return { key: shelf.id, text: shelf.name, value: shelf.name }
    });
  }

  description = (volumeInfo) => {
    return (
      <Wrapper>
        <Grid>
          <Grid.Row>
            <Modal.Header as='h1'><em>{volumeInfo.title}</em></Modal.Header>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3}>
              <BookCover book={this.props.book} />
              <Rating
                onRate={this.handleChange}
                maxRating={5}
                defaultRating={3}
                icon='star'
                size='small'
              />
            </Grid.Column>
            <Grid.Column width={13}>
              <Grid.Row>
                {volumeInfo.description}
              </Grid.Row>
              <br />
              <Grid.Row>
                <List>
                  <List.Item>
                    { volumeInfo.authors && <List.Item><strong>Written by</strong> {volumeInfo.authors[0]}</List.Item> }
                  </List.Item>
                  <Divider />
                  <List.Item>{volumeInfo.pageCount} pages</List.Item>
                  <List.Item>Published {volumeInfo.publishedDate} by {volumeInfo.publisher}</List.Item>
                  { volumeInfo.industryIdentifiers && <List.Item>{this.getIBSN(volumeInfo)}</List.Item> }
                </List>
                <strong>Move to </strong>
                <Dropdown
                  placeholder='Will Read'
                  selection
                  options={this.bookshelfOptions()}
                  onChange={this.handleSelection}
                />
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Wrapper>
    );
  }

  render () {
    const { volumeInfo } = this.props.book.item;
    return(
      <div>
        <Modal.Content image>
          {this.description(volumeInfo)}
        </Modal.Content>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { bookshelves: state.bookshelves, shelvings: state.shelvings }
}

export default connect(mapStateToProps)(BookModal);
