import React from 'react';
import { connect } from 'react-redux';
import { fetchReadings } from '../../actions/readings';
import { objectCheck } from '../../utils/modules';
import BookCover from '../books/BookCover';
import SelectReadingDropdown from './SelectReadingDropdown';
import styled from 'styled-components';
import IntroFull from './IntroFull'

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

  displayBookCover = (reading) => {
    const { readingsLoaded } = this.state;
    if (readingsLoaded && objectCheck(reading))
      return <BookCover book={reading} />;
  };

  displayDesc = (reading) => {
    const { readingsLoaded } = this.state;
    if (readingsLoaded && objectCheck(reading))
      return (
        <div>
          <b>Start: </b>{reading.start_date}
          <br />
          <b>Finish: </b>{reading.finish_date}
        </div>
      )
  }

  render() {
    const { isModerator, readings } = this.props;
    const { addingBook } = this.state;
    return (
      <Wrapper>
        <Segment>
          <Grid>
            <Grid.Column width={2}>
              {readings.length !== 0 && this.displayBookCover(readings[0])}
            </Grid.Column>
            <Grid.Column width={10}>
              <IntroFull />

              {readings.length !== 0 && this.displayDesc(readings[0])}
              {isModerator && (
                <Button onClick={this.toggleDropdown}>
                  {addingBook ? 'Cancel' : 'Add New Reading'}
                </Button>
              )}
            </Grid.Column>
          </Grid>
        </Segment>
        {addingBook && (
          <SelectReadingDropdown toggleDropdown={this.toggleDropdown} />
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return { readings: state.readings };
};

export default connect(mapStateToProps)(CurrentReading);
