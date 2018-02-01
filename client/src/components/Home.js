import React from 'react';
import axios from 'axios';
import Books from './Books';
import SearchBar from './SearchBar';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  Container,
  Grid,
  Header,
 } from 'semantic-ui-react';

const EnlargeGrid = styled(Grid)`
  height: 100vh;
`

class Home extends React.Component {
  state = { books: [] }

  bookSearch = (term) => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${term}&startIndex=0&maxResults=15`)
      .then( res => {
        this.setState({ books: res.data.items })
      });
  }

  render() {
    const { books } = this.state;
    return (
      <Container>
        <Header as='h1' textAlign='center' block>Search Books</Header>
        <SearchBar onSearchTermChange={this.bookSearch} />
        <Grid
          as={EnlargeGrid}
          columns={5}>
          <Books books={books} />
        </Grid>
      </Container>
    );
  }

}

export default connect()(Home);
