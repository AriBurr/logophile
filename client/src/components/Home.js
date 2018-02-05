import React from 'react';
import { connect } from 'react-redux';
import { searchAll } from '../actions/books';
import { setActiveBook } from '../actions/activeBook';
import Banner from './Banner';
import BookDescription from './books/BookDescription';
import Books from './books/Books';
import Welcome from './Welcome';
import styled from 'styled-components';
import {
  Grid,
  Header,
  Segment,
 } from 'semantic-ui-react';

const EnlargeGrid = styled(Grid)`
  height: 100vh;
`

const LeftGrid = styled(Grid.Column)`

`
const GridContainer = styled(Grid)`
  margin: 2rem !important;
`
const RightGrid = styled(Grid.Column)`
`

class Home extends React.Component {
  state = { searchLoaded: false, terms: {} }

  setSearchLoaded = () => this.setState({ searchLoaded: true });

  handleSearch = (terms) => {
    this.setState({terms: terms})
    this.props.dispatch(searchAll(this.setSearchLoaded, terms));
  }

  searchTerms = () => {
    const { terms } = this.state;
    let results = ''
    if (terms.title.length > 0) results += `${terms.title} `
    if (terms.author.length > 0) results += `${terms.author} `
    if (terms.ibsn.length > 0) results += terms.ibsn
    return results
  }

  toggleDescription = (book) => this.props.dispatch(setActiveBook(book))

  renderHeader = () => {
    return(
      <Segment textAlign='center'>
        <Header>Your Search Results for { this.searchTerms() }...</Header>
      </Segment>
    )
  }

  renderSearched = (searchLoaded) => {
    const { book, books } = this.props
    return(
      <Grid divided as={GridContainer}>
        <Grid.Column as={LeftGrid} width={10}>
          { searchLoaded && this.renderHeader() }
          <Grid
            as={EnlargeGrid}
            columns={5}
            >
            { books && <Books toggleDescription={this.toggleDescription} /> }
          </Grid>
        </Grid.Column>
        <Grid.Column as={RightGrid} width={6}>
          { Object.keys(book).length !== 0 && <BookDescription/> }
        </Grid.Column>
      </Grid>
    )
  }

  render() {
    const { searchLoaded } = this.state;
    return (
      <div>
        <Banner searchTerms={this.handleSearch} />
        { searchLoaded ? this.renderSearched(searchLoaded) : <Welcome /> }
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    books: state.books,
    book: state.activeBook,
  }
}

export default connect(mapStateToProps)(Home);
