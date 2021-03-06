import React from 'react';
import { connect } from 'react-redux';
import { objectCheck } from '../../utils/modules';
import { deleteShelving } from '../../actions/shelvings';
import BookModal from '../books/BookModal';
import noCover from '../../assets/default.jpg';
import styled from 'styled-components';
import { Divider, Grid, Icon, Modal, Segment } from 'semantic-ui-react';

const Image = styled.img`
  height: 198px;
  width: 128px;
  box-shadow: 0 1px 2px #999;
  margin: 0 auto;
  transition: box-shadow 0.25s;
  &:hover {
    box-shadow: 0 1px 20px #999;
  }
`;
const Banner = styled.div`
  letter-spacing: 1px;
  margin-left: 5px;
`;

class Bookshelf extends React.Component {
  state = { edit: false };

  toggleEdit = () => {
    const { edit } = this.state;
    this.setState({ edit: !edit });
  };

  modalTrigger = (volumeInfo, title) => (
    <Image
      src={volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : noCover}
      alt={`${title} cover`}
    />
  );

  shelvings = () => {
    const { edit } = this.state;
    const { dispatch, shelvings, bookshelf } = this.props;
    return shelvings.map(book => {
      const { volumeInfo, title } = book.item;
      return (
        <Grid.Column
          mobile="8"
          tablet="5"
          computer="3"
          largeScreen="3"
          key={book.id}
        >
          <Modal size="large" trigger={this.modalTrigger(volumeInfo, title)}>
            <BookModal book={book} />
          </Modal>
          {edit && (
            <Icon
              onClick={() => dispatch(deleteShelving(book, bookshelf.id))}
              name="trash"
            />
          )}
        </Grid.Column>
      );
    });
  };

  renderBanner = bookshelf => (
    <Banner>
      <Grid columns={2}>
        <Grid.Column>
          <h2>
            <em>{bookshelf.name}</em>
          </h2>
        </Grid.Column>
        <Grid.Column textAlign="right">
          <Icon size="large" onClick={this.toggleEdit} name="edit" />
        </Grid.Column>
      </Grid>
      <Divider />
    </Banner>
  );

  render() {
    const { bookshelf } = this.props;
    return (
      <Segment basic>
        {objectCheck(bookshelf) && this.renderBanner(bookshelf)}
        <Grid columns={5}>{this.shelvings()}</Grid>
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    shelvings: state.shelvings,
    bookshelf: state.bookshelf
  };
};

export default connect(mapStateToProps)(Bookshelf);
