import React from 'react';
import { connect } from 'react-redux';
import { addRating } from '../../actions/ratings';
import BookCover from './BookCover';
import BookshelfDropdown from './BookshelfDropdown';
import styled from 'styled-components';
import {
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  List,
  Modal,
  Rating
} from 'semantic-ui-react';

const BookDetail = styled.p`
  color: rgba(87, 97, 122, 0.5);
  display: inline;
`;
const Description = styled(Grid.Row)`
  &&& {
    background-color: #f8f9fd;
    border-top: 1px solid rgba(87, 97, 122, 0.1);
    border-bottom: 1px solid rgba(87, 97, 122, 0.1);
    line-height: 25px;
    padding: 5% !important;
    width: 100%;
  }
  .ui.header {
    color: #223845;
    border-bottom: 3px solid #1dd3b0;
  }
`;
const Wrapper = styled.div`
  margin: 5%;
`;

const BookModal = ({ book, dispatch }) => {
  const { volumeInfo } = book.item;

  const handleChange = (event: e, data: data) => {
    dispatch(addRating(data.rating, book.id));
  };

  return (
    <Container>
      <Modal.Content scrolling image>
        <Wrapper>
          <Grid>
            <Grid.Column width={4}>
              <BookCover book={book} />
            </Grid.Column>
            <Grid.Column width={12}>
              <Grid.Row>
                <Modal.Header as="h1">
                  <em>{volumeInfo.title}</em>
                </Modal.Header>
                {volumeInfo.authors && (
                  <List.Item>
                    <strong>by</strong> {volumeInfo.authors[0]}
                  </List.Item>
                )}
                <Divider />
              </Grid.Row>
              <Grid.Row>
                <Rating
                  onRate={handleChange}
                  maxRating={5}
                  defaultRating={3}
                  icon="star"
                  size="huge"
                />
                <BookDetail>
                  <em>&nbsp;|&nbsp;{volumeInfo.pageCount} pages</em>&nbsp;|&nbsp;
                </BookDetail>
                <a href={volumeInfo.previewLink} target="_blank">
                  <Icon color="green" name="google" />
                </a>
              </Grid.Row>
              <Grid.Row>
                <Divider hidden />
                <BookshelfDropdown editBook={book} />
              </Grid.Row>
            </Grid.Column>
            <Grid.Row as={Description}>
              <Header as="h3">About</Header>
              <Divider />
              {volumeInfo.description}
              <Divider />
            </Grid.Row>
          </Grid>
        </Wrapper>
      </Modal.Content>
    </Container>
  );
};

const mapStateToProps = state => {
  return { bookshelves: state.bookshelves, shelvings: state.shelvings };
};

export default connect(mapStateToProps)(BookModal);
