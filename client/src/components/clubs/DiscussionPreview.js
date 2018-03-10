import React from 'react';
import { connect } from 'react-redux';
import DiscussionForm from './DiscussionForm';
import styled from 'styled-components';
import { Grid, Header, Segment } from 'semantic-ui-react';

const Wrapper = styled.div`
  padding: 1%;
`;

class DiscussionPreview extends React.Component {
  render() {
    const { readings } = this.props;
    return (
      <Wrapper>
        <Segment>
          <Grid>
            <Grid.Row>
              <Header>Discussion Preview</Header>
            </Grid.Row>
            <Grid.Row>
              {readings.length !== 0 && (
                <DiscussionForm reading={readings[0]} />
              )}
            </Grid.Row>
          </Grid>
        </Segment>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return { readings: state.readings };
};

export default connect(mapStateToProps)(DiscussionPreview);
