import React from 'react';
import { connect } from 'react-redux';
import SelectReadingDropdown from './SelectReadingDropdown';
import styled from 'styled-components';
import { Button, Grid, Header, Modal, Segment } from 'semantic-ui-react';

const Wrapper = styled.div`
  padding: 1%;
`;

class CurrentReading extends React.Component {
  render() {
    const { isModerator } = this.props;
    return (
      <Wrapper>
        <Segment>
          <Header>Currently Reading</Header>
          <Grid>
            <Grid.Column>
              {isModerator && (
                <Modal trigger={<Button>Add New Reading</Button>}>
                  <Modal.Content>
                    <SelectReadingDropdown />
                  </Modal.Content>
                </Modal>
              )}
            </Grid.Column>
          </Grid>
        </Segment>
      </Wrapper>
    );
  }
}

export default connect()(CurrentReading);
