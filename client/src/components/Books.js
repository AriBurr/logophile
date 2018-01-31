import React from 'react';
import axios from 'axios';
import noCover from '../assets/default.jpg';
import SearchBar from './SearchBar';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  Button,
  Container,
  Grid,
  Header,
  Modal,
  Reveal,
 } from 'semantic-ui-react';

const Image = styled.img`
  height: 198px;
  width: 128px;
`
const EnlargeGrid = styled(Grid)`
  height: 100vh;
`

class Books extends React.Component {
  state = { books: [] }

  bookSearch = (term) => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${term}&startIndex=0&maxResults=15`)
      .then( res => {
        this.setState({ books: res.data.items })
      });
  }

  displayBookCovers = () => {
    const { books } = this.state;
    return books.map( book => {
      return (
        <Grid.Column key={book.id}>
          <Reveal animated='fade'>
            <Reveal.Content visible>
              { book.volumeInfo.imageLinks ?
              <Image
                src={ book.volumeInfo.imageLinks.thumbnail }
                alt={`${book.volumeInfo.title} cover`}
              /> :
              <Image
                src={ noCover }
                alt={`${book.volumeInfo.title} cover`}
              /> }
            </Reveal.Content>
            <Reveal.Content hidden >
            </Reveal.Content>
          </Reveal>
        </Grid.Column>
      );
    });
  }

  displayBookDescription = (book) => {
    return (
      <Modal.Content>
        <Modal.Header>
          {book.volumeInfo.title}
        </Modal.Header>
        <Modal.Description>
          This is a book
        </Modal.Description>
      </Modal.Content>
    );
  }

  render() {
    return (
      <Container>
        <Header as='h1' textAlign='center' block>Search Books</Header>
        <SearchBar onSearchTermChange={this.bookSearch} />
        <Grid
          as={EnlargeGrid}
          columns={5}
          >
          { this.displayBookCovers() }
        </Grid>
      </Container>
    );
  }

}

export default connect()(Books);
