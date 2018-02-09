import React from 'react';
import { connect } from 'react-redux';
import { objectCheck } from '../../utils/modules';
import { searchAll } from '../../actions/books';
import { setActiveBook } from '../../actions/activeBook';
import Banner from '../Banner';
import BooksCarousel from './BooksCarousel';
import BookDescription from '../books/BookDescription';
import Books from '../books/Books';
import styled from 'styled-components';
import { Grid } from 'semantic-ui-react';

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
  overflow: auto;
`

class SearchBooks extends React.Component {
  state = { searchLoaded: false, terms: {} }

  setSearchLoaded = () => this.setState({ searchLoaded: true });

  handleSearch = (terms) => {
    this.setState({terms: terms})
    this.props.dispatch(searchAll(terms, this.setSearchLoaded));
  }

  componentWillUnmount = () => {
    this.props.dispatch({ type: 'CLEAR_BOOKS', action: [] })
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
    const { books } = this.props;
    return (
      <Wrapper>
        <Banner searchTerms={this.handleSearch} />
        { searchLoaded || books.length > 0 ? this.renderSearched(searchLoaded) : <BooksCarousel /> }
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
