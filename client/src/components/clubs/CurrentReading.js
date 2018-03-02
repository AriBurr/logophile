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
  state = { addingBook: false };

  componentDidMount() {
    const { clubID, dispatch } = this.props;
    dispatch(fetchReadings(clubID));
  }

  toggleDropdown = () => {
    const { addingBook } = this.state;
    this.setState({ addingBook: !addingBook });
  };

  render() {
    const { isModerator, readings } = this.props;
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
              {isModerator && [
                readings.length !== 0 && <BookCover book={readings[0]} />,
                <Button key={1} onClick={this.toggleDropdown}>
                  {addingBook ? 'Cancel' : 'Add New Reading'}
                </Button>
              ]}
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
