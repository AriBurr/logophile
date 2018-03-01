import React from 'react';
import { connect } from 'react-redux';
import { fetchReadings } from '../../actions/readings';
import BookCover from '../books/BookCover';
import SelectReadingDropdown from './SelectReadingDropdown';
import styled from 'styled-components';
import { Button, Grid, Header, Modal, Segment } from 'semantic-ui-react';

const Wrapper = styled.div`
  padding: 1%;
`;

class CurrentReading extends React.Component {
  componentDidMount() {
    const { clubID, dispatch } = this.props;
    dispatch(fetchReadings(clubID));
  }

  render() {
    const { isModerator, readings } = this.props;
    return (
      <Wrapper>
        <Segment>
          <Header>Currently Reading</Header>
          <Grid>
            <Grid.Column>
              {isModerator && [
                <BookCover book={readings[0]} />,
                <Modal trigger={<Button>Add New Reading</Button>}>
                  <Modal.Content>
                    <SelectReadingDropdown />
                  </Modal.Content>
                </Modal>
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
