import React from 'react';
import axios from 'axios';
import { searchAll } from '../actions/books';
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
  state = { searchLoaded: false }

  setSearchLoaded = () => this.setState({ searchLoaded: true });

  handleSearch = (term) => {
    const { search } = this.state;
    this.props.dispatch(searchAll(term, this.setSearchLoaded));
  }

  render() {
    const { books } = this.props;
    return (
      <Container>
        <Header as='h1' textAlign='center' block>Search Books</Header>
        <SearchBar onSearchTermChange={this.handleSearch} />
        <Grid
          as={EnlargeGrid}
          columns={5}
        >
          { books && <Books books={books} /> }
        </Grid>
      </Container>
    );
  }

}

const mapStateToProps = (state) => {
  return { books: state.books }
}

export default connect(mapStateToProps)(Home);
