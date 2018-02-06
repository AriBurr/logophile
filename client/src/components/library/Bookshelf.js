import React from 'react';
import { connect } from 'react-redux';
import noCover from '../../assets/default.jpg';
import { deleteShelving } from '../../actions/shelvings';
import styled from 'styled-components';
import BookModal from '../BookModal'
import {
  Button,
  Grid,
  Icon,
  Segment,
  Header,
  Modal,
} from 'semantic-ui-react';

const Image = styled.img`
  height: 198px;
  width: 128px;
  margin: 0 auto;
  box-shadow: 0 1px 2px #999;
  transition: box-shadow 0.25s;
    &:hover {
      box-shadow: 0 1px 20px #999;
    }
`
const Banner = styled(Segment)`
  margin-right: 6.5% !important;
`

class Bookshelf extends React.Component {
  state = { edit: false }

  toggleEdit = () => {
    const { edit } = this.state;
    this.setState({ edit: !edit })
  }

  modalTrigger = (volumeInfo, title) => (
    <Image
      src={ volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : noCover }
      alt={`${title} cover`}
    />
  )

  shelvings = () => {
    const { edit } = this.state;
    const { dispatch, shelvings, bookshelf } = this.props;
    return shelvings.map( book => {
      const { volumeInfo, title } = book.item
      return (
        <Grid.Column key={book.id}>
          <Modal trigger={this.modalTrigger(volumeInfo, title)}>
            <BookModal book={book}/>
          </Modal>
          { edit && <Icon
                      onClick={ () => dispatch(deleteShelving(book, bookshelf.id)) }
                      name='trash'>
                    </Icon> }
        </Grid.Column>
      )
    });
  }

  renderBanner = (bookshelf) => (
    <Banner>
      <Header textAlign='center' as='h1'>
        { bookshelf.name }
      </Header>
      <Button color ='teal' onClick={this.toggleEdit}>Edit Bookshelves</Button>
    </Banner>
  )

  render () {
    const { bookshelf } = this.props
    return (
      <Segment basic>
        { bookshelf && this.renderBanner(bookshelf) }
        <Grid columns={5}>
          { this.shelvings() }
        </Grid>
      </Segment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    shelvings: state.shelvings,
    bookshelf: state.bookshelf,
   }
}

export default connect(mapStateToProps)(Bookshelf);
