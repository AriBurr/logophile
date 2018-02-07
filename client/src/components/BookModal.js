import React from 'react'
import BookCover from './books/BookCover'
import { connect } from 'react-redux'
import { addRating } from '../actions/ratings'
import { Header, Modal, Rating } from 'semantic-ui-react'

class BookModal extends React.Component {

  handleChange = (event: e, data: data) =>{
    const { book, dispatch } = this.props
    dispatch(addRating(data.rating, book.id))
  }

  render () {
    const { volumeInfo } = this.props.book.item
    return(
      <div>
        <Modal.Header>{volumeInfo.title}</Modal.Header>
        <Modal.Content image>
          <BookCover book={this.props.book} />
          <Modal.Description>
            <Rating
              onRate={this.handleChange}
              maxRating={5}
              defaultRating={3}
              icon='star'
              size='small'
            />

            <Header>Default Profile Image</Header>
            <p>We've found the following gravatar image associated with your e-mail address.</p>
            <p>Is it okay to use this photo?</p>
          </Modal.Description>
        </Modal.Content>
      </div>
    )
  }
}

export default connect()(BookModal);
