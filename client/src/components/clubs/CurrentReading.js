import React from 'react';
import { connect } from 'react-redux';
import { objectCheck } from '../../utils/modules';
import BookCover from '../books/BookCover';
import SelectReadingDropdown from './SelectReadingDropdown';
import styled from 'styled-components';
import { ButtonAction } from '../../styles/styles';
import { Grid} from 'semantic-ui-react';

const Container = styled.div`
  border: 0;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
`;

const Wrapper = styled.div`
  padding: 1%;
`;

class CurrentReading extends React.Component {
  state = { addingBook: false };

  toggleDropdown = () => {
    const { addingBook } = this.state;
    this.setState({ addingBook: !addingBook });
  };

  displayBookCover = reading => {
    const { readingsLoaded } = this.props;
    if (readingsLoaded && objectCheck(reading))
      return <BookCover book={reading} />;
  };

  displayDesc = reading => {
    const { readingsLoaded } = this.props;
    if (readingsLoaded && objectCheck(reading))
      return (
        <div>
          <b>Start: </b>
          {reading.start_date}
          <br />
          <b>Finish: </b>
          {reading.finish_date}
        </div>
      );
  };

  render() {
    const { isModerator, readings } = this.props;
    const { addingBook } = this.state;
    return (
      <Wrapper>
        <Container>
          <Grid columns={2}>
            <Grid.Column textAlign='center'>
              {readings.length !== 0 && this.displayBookCover(readings[0])}
              {isModerator && (
                <ButtonAction onClick={this.toggleDropdown}>
                  {addingBook ? 'Cancel' : 'Add New Reading'}
                </ButtonAction>
              )}
            </Grid.Column>
            <Grid.Column>
              {readings.length !== 0 && this.displayDesc(readings[0])}
            </Grid.Column>
          </Grid>
        </Container>
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
