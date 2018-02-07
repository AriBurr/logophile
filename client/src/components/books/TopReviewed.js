import React from 'react';
import { connect } from 'react-redux'
import BookCover from './BookCover'
import { paginateText } from '../../utils/modules'
import { booksWithRatings } from '../../actions/books';
import { Rating, Grid, Header } from 'semantic-ui-react'

class TopReviewed extends React.Component {

  componentDidMount = () => {
    this.props.dispatch(booksWithRatings())
  }

  mapTopBooks = () => {
    const { topBooks } = this.props
    return topBooks.map(book => (
      <Grid.Column key={book.item.id}>
        <BookCover book={book} />
        <Header>{ paginateText(book.item.volumeInfo.title, 20) }</Header>
        <Rating icon='star' defaultRating={book.avg} maxRating={5} disabled />
      </Grid.Column>
    ))
  }

  render () {
    return(
      <Grid className='container' columns={7}>
        {this.mapTopBooks()}
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    topBooks: state.topBooks
  }
}

export default connect(mapStateToProps)(TopReviewed);
