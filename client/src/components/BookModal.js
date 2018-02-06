import React from 'react'
import BookCover from './books/BookCover'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

class BookModal extends React.Component {
  render () {
    const { volumeInfo } = this.props.book.item
    return(
      <div>
        <Modal.Header>{volumeInfo.title}</Modal.Header>
        <Modal.Content image>
          <BookCover book={this.props.book} />
          <Modal.Description>
            <Header>Default Profile Image</Header>
            <p>We've found the following gravatar image associated with your e-mail address.</p>
            <p>Is it okay to use this photo?</p>
          </Modal.Description>
        </Modal.Content>
      </div>
    )
  }
}

export default BookModal;
