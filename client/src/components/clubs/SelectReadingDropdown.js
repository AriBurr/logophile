import React from 'react';
import { connect } from 'react-redux';
import { fetchShelvings } from '../../actions/shelvings';
import { addReading } from '../../actions/readings';
import { ButtonStyle } from '../../styles/styles';
import { Button, Dropdown } from 'semantic-ui-react';

class SelectReadingDropdown extends React.Component {
  state = {
    bookshelf: '',
    bookshelfLoaded: false,
    shelvingsLoaded: false,
    bookID: '',
    bookLoaded: false
  };

  bookshelfOptions = () => {
    const { bookshelves } = this.props;
    return bookshelves.map(shelf => {
      return { key: shelf.id, text: shelf.name, value: shelf.name };
    });
  };

  bookOptions = () => {
    const { bookshelves, shelvings } = this.props;
    const { bookshelf, shelvingsLoaded } = this.state;
    const shelf = bookshelves.filter(shelf => shelf.name === bookshelf);
    if (!shelvingsLoaded) {
      this.fetchBooks(shelf[0]);
    } else {
      return shelvings.map(book => {
        return {
          key: book.id,
          text: book.item.volumeInfo.title,
          value: book.id
        };
      });
    }
  };

  fetchBooks = shelf => {
    this.props.dispatch(fetchShelvings(shelf));
    this.setState({ shelvingsLoaded: true });
  };

  handleShelfSelection = (e, { value }) => {
    this.setState({ bookshelf: value });
    this.setState({ bookshelfLoaded: true });
  };

  handleBookSelection = (e, { value }) => {
    this.setState({ bookID: value });
    this.setState({ bookLoaded: true });
  };

  handleSubmit = () => {
    const { club, dispatch, shelvings } = this.props;
    const { bookID } = this.state;
    const reading = (shelvings.filter(b => b.id === bookID))[0];
    dispatch(addReading(club, reading));
  };

  render() {
    const { bookLoaded, bookshelfLoaded } = this.state;
    return (
      <div>
        <Dropdown
          placeholder="From Bookshelf"
          selection
          options={this.bookshelfOptions()}
          onChange={this.handleShelfSelection}
        />
        {bookshelfLoaded && (
          <Dropdown
            placeholder="Book"
            selection
            options={this.bookOptions()}
            onChange={this.handleBookSelection}
          />
        )}
        {bookLoaded && (
          <Button as={ButtonStyle} onClick={() => this.handleSubmit()}>
            Select Reading
          </Button>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    bookshelves: state.bookshelves,
    club: state.currentClub,
    shelvings: state.shelvings
  };
};

export default connect(mapStateToProps)(SelectReadingDropdown);
