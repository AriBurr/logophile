import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import { fetchShelvings } from '../../actions/shelvings';
import { addReading } from '../../actions/readings';
import { archiveReading } from '../../actions/readings';
import { ButtonAction } from '../../styles/styles';
import { Dropdown, Grid, Header } from 'semantic-ui-react';

class SelectReadingDropdown extends React.Component {
  state = {
    bookshelf: '',
    bookshelfLoaded: false,
    shelvingsLoaded: false,
    bookID: '',
    bookLoaded: false,
    startDate: moment(),
    endDate: moment()
  };

  handleStartDate = date => {
    this.setState({ startDate: date });
  };

  handleEndDate = date => {
    this.setState({ endDate: date });
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
      const shelf = bookshelves.find(shelf => shelf.name === value);
      this.fetchBooks(shelf);
    }
    this.setState({ bookshelf: value });
    this.setState({ bookshelfLoaded: true });
  };

  handleBookSelection = (e, { value }) => {
    this.setState({ bookID: value });
    this.setState({ bookLoaded: true });
  };

  handleSubmit = () => {
    const { club, dispatch, readings, shelvings, toggleDropdown } = this.props;
    const { bookID, startDate, endDate } = this.state;
    const reading = shelvings.find(b => b.id === bookID);
    if (readings.length !== 0) {
      const confirm = window.confirm(
        'This will archive the current reading. Are you sure?'
      );
      confirm &&
        dispatch(
          archiveReading(readings[0], club, reading, startDate, endDate)
        );
    } else {
      dispatch(addReading(club, reading, startDate, endDate));
    }
    toggleDropdown();
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
          {bookshelfLoaded && [
            <Header key={1}>Select Reading</Header>,
            <Dropdown
              key={2}
              placeholder="Book"
              selection
              options={this.bookOptions()}
              onChange={this.handleBookSelection}
            />
          ]}
        </Grid.Column>
        <Grid.Column textAlign="center">
          {bookLoaded && [
            <Header key={1}>Select Dates</Header>,
            <DatePicker
              key={2}
              selected={moment(this.state.startDate)}
              onChange={this.handleStartDate}
              placeholder="Start"
            />,
            <DatePicker
              key={3}
              selected={moment(this.state.endDate)}
              onChange={this.handleEndDate}
              placeholder="End"
            />
          ]}
        </Grid.Column>
        <Grid.Column textAlign="center">
          {bookLoaded && [
            <Header key={1}>Add to Club</Header>,
            <ButtonAction key={2} onClick={() => this.handleSubmit()}>
              Go
            </ButtonAction>
          ]}
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    bookshelves: state.bookshelves,
    club: state.currentClub,
    currentReading: state.currentReading,
    readings: state.readings,
    shelvings: state.shelvings
  };
};

export default connect(mapStateToProps)(SelectReadingDropdown);
