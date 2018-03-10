import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ButtonAction } from '../../styles/styles';
import { Grid, Header, Segment } from 'semantic-ui-react';

const Topic = styled(Segment)`
  width: 100%;
`;
const Wrapper = styled.div`
  padding: 1%;
`;

class DiscussionPreview extends React.Component {
  render() {
    return (
      <Wrapper>
        <Segment>
          <Grid>
            <Grid.Row>
              <Header>Discussion Preview</Header>
            </Grid.Row>
            <Grid.Row>
              <ButtonAction>Add Discussion Topic</ButtonAction>
            </Grid.Row>
          </Grid>
        </Segment>
      </Wrapper>
    );
  }
}

export default connect()(DiscussionPreview);
