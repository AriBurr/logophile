import React from 'react';
import { connect } from 'react-redux';
import { fetchReadings } from '../../actions/readings';
import BookCover from '../books/BookCover';
import SelectReadingDropdown from './SelectReadingDropdown';
import styled from 'styled-components';
import { Button, Grid, Header, Segment } from 'semantic-ui-react';

const Wrapper = styled.div`
  padding: 1%;
`;

class CurrentReading extends React.Component {
  state = { addingBook: false, readingsLoaded: false };

  componentDidMount() {
    const { clubID, dispatch } = this.props;
    dispatch(fetchReadings(clubID, this.setReadingsLoaded));
  }

  setReadingsLoaded = () => {
    this.setState({ readingsLoaded: true });
  };

  toggleDropdown = () => {
    const { addingBook } = this.state;
    this.setState({ addingBook: !addingBook });
  };

  displayBookCover = () => {
    const { readings } = this.props;
    const { readingsLoaded } = this.state;
    if (readingsLoaded && readings.length !== 0)
      return <BookCover book={readings[0]} />;
  };

  render() {
    const { isModerator } = this.props;
    const { addingBook } = this.state;
    return (
      <Wrapper>
        {addingBook && (
          <SelectReadingDropdown toggleDropdown={this.toggleDropdown} />
        )}
        <Segment>
          <Header>Currently Reading</Header>
          <Grid>
            <Grid.Column>
              {this.displayBookCover()}
              {isModerator && (
                <Button onClick={this.toggleDropdown}>
                  {addingBook ? 'Cancel' : 'Add New Reading'}
                </Button>
              )}
            </Grid.Column>
          </Grid>
        </Segment>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return { readings: state.readings };
};

export default connect(mapStateToProps)(CurrentReading);
