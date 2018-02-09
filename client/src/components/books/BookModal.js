import React from 'react';
import { connect } from 'react-redux';
import BookCover from './BookCover';
import BookshelfDropdown from './BookshelfDropdown';
import { addRating } from '../../actions/ratings';
import styled from 'styled-components';
import {
  Divider,
  Grid,
  Header,
  Icon,
  List,
  Modal,
  Rating,
  Segment,
} from 'semantic-ui-react';

const Wrapper = styled.div`
  margin: 5%;
`
const Description = styled(Grid.Row)`
  &&& {
    background-color: #F8F9FD;
    border-top: 1px solid rgba(87, 97, 122, 0.1);
    border-bottom: 1px solid rgba(87, 97, 122, 0.1);
    line-height: 25px;
    padding: 5% !important;
    width: 100%;
  }
  .ui.header {
    color: #223845;
    border-bottom: 3px solid #1DD3B0;
  }
`
const BookDetail = styled.p`
  color: rgba(87, 97, 122, 0.5);
  display: inline;
`

class BookModal extends React.Component {

  handleChange = (event: e, data: data) =>{
    const { book, dispatch } = this.props
    dispatch(addRating(data.rating, book.id))
  }

  getIBSN = (book) => {
    return book.industryIdentifiers.map( ibsn => {
      return (<div key={ibsn.identifier}>{ibsn.type}: {ibsn.identifier}</div>)
    });
  }

  description = (volumeInfo) => {
    return (
      <Wrapper>
        <Grid>
          <Grid.Column width={4}>
            <BookCover book={this.props.book} />
          </Grid.Column>
          <Grid.Column width={12}>
            <Grid.Row>
              <Modal.Header as='h1'><em>{volumeInfo.title}</em></Modal.Header>
              { volumeInfo.authors && <List.Item><strong>by</strong> {volumeInfo.authors[0]}</List.Item> }
              <Divider />
            </Grid.Row>
            <Grid.Row>
              <Rating
                onRate={this.handleChange}
                maxRating={5}
                defaultRating={3}
                icon='star'
                size='huge'
              />
            <BookDetail>
              <em>&nbsp;|&nbsp;{volumeInfo.pageCount} pages</em>&nbsp;|&nbsp;
            </BookDetail>
            <a href={volumeInfo.previewLink} target='_blank'><Icon color='green' name='google'></Icon></a>
            </Grid.Row>
            <Grid.Row>
              <Divider hidden />
              <BookshelfDropdown editBook={this.props.book} />
            </Grid.Row>
          </Grid.Column>
          <Grid.Row as={Description}>
            <Header as='h3'>About</Header>
            <Divider />
            {volumeInfo.description}
            <Divider />
          </Grid.Row>
        </Grid>
      </Wrapper>
    )
  }

  render () {
    const { volumeInfo } = this.props.book.item;
    return(
      <div>
        <Modal.Content scrolling image>
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
