import React from 'react';
import { connect } from 'react-redux';
import { objectCheck } from '../utils/modules';
import { searchAll } from '../actions/books';
import { setActiveBook } from '../actions/activeBook';
import Banner from './Banner';
import BookDescription from './books/BookDescription';
import Books from './books/Books';
import styled from 'styled-components';
import {
  Grid,
  Header,
  Segment,
 } from 'semantic-ui-react';

const EnlargeGrid = styled(Grid)`
  height: 100vh;
`
const GridContainer = styled(Grid)`
  &&& {
    margin: 2rem;
  }
`
const Wrapper = styled.div`
  height: 100vh;
`

class SearchBooks extends React.Component {
  state = { searchLoaded: false, terms: {} }

  setSearchLoaded = () => this.setState({ searchLoaded: true });

  handleSearch = (terms) => {
    this.setState({terms: terms})
    this.props.dispatch(searchAll(this.setSearchLoaded, terms));
  }

  toggleDescription = (book) => this.props.dispatch(setActiveBook(book))

  renderSearched = (searchLoaded) => {
    const { book, books } = this.props
    return(
      <Grid divided as={GridContainer}>
        <Grid.Column width={10}>
          <Grid
            as={EnlargeGrid}
            columns={4}
          >
            { books && <Books toggleDescription={this.toggleDescription} /> }
          </Grid>
        </Grid.Column>
        <Grid.Column width={6}>
          { objectCheck(book) && <BookDescription/> }
        </Grid.Column>
      </Grid>
    )
  }

  render() {
    const { searchLoaded } = this.state;
    return (
      <Wrapper>
        <Banner searchTerms={this.handleSearch} />
        { searchLoaded && this.renderSearched(searchLoaded) }
      </Wrapper>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    books: state.books,
    book: state.activeBook,
  }
}

export default connect(mapStateToProps)(SearchBooks);
