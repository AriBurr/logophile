import React from 'react';
import { connect } from 'react-redux';
import { fetchShelvings } from '../../actions/shelvings';
import { addReading } from '../../actions/readings';
import { ButtonStyle } from '../../styles/styles';
import { Button, Dropdown, Grid, Header } from 'semantic-ui-react';

class SelectReadingDropdown extends React.Component {
  state = {
    bookshelf: '',
    bookshelfLoaded: false,
    shelvingsLoaded: false,
    bookID: '',
    bookLoaded: false
  };

  bookshelfOptions = () => {
    return this.props.bookshelves.map(shelf => {
      return { key: shelf.id, text: shelf.name, value: shelf.name };
    });
  };

  bookOptions = () => {
    return this.props.shelvings.map(book => {
      return {
        key: book.id,
        text: book.item.volumeInfo.title,
        value: book.id
      };
    });
  };

  fetchBooks = shelf => {
    this.props.dispatch(fetchShelvings(shelf));
    this.setState({ shelvingsLoaded: true });
  };

  handleShelfSelection = (e, { value }) => {
    const { bookshelves } = this.props;
    const { bookshelf } = this.state;
    if (bookshelf !== value) {
      const shelf = bookshelves.filter(shelf => shelf.name === value);
      this.fetchBooks(shelf[0]);
    }
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
    const reading = shelvings.filter(b => b.id === bookID)[0];
    dispatch(addReading(club, reading));
  };

  render() {
    const { bookLoaded, bookshelfLoaded } = this.state;
    return (
      <Grid columns="equal">
        <Grid.Column textAlign="center">
          <Header>Select Bookshelf</Header>
          <Dropdown
            placeholder="From Bookshelf"
            selection
            options={this.bookshelfOptions()}
            onChange={this.handleShelfSelection}
          />
        </Grid.Column>
        <Grid.Column textAlign="center">
          {bookshelfLoaded && (
            [<Header key={1}>Select Reading</Header>,
            <Dropdown
              key={2}
              placeholder="Book"
              selection
              options={this.bookOptions()}
              onChange={this.handleBookSelection}
            />]
          )}
        </Grid.Column>
        <Grid.Column textAlign="center">
          {bookLoaded && (
            [<Header key={1}>Add to Club</Header>,
            <Button key={2} as={ButtonStyle} onClick={() => this.handleSubmit()}>
              Go
            </Button>]
          )}
        </Grid.Column>
      </Grid>
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
