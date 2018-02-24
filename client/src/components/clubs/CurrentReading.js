import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Grid, Header, Segment } from 'semantic-ui-react';

const Wrapper = styled.div`
  padding: 1%;
`;

class CurrentReading extends React.Component {
  render() {
    return (
      <Wrapper>
        <Segment>
          <Header>Currently Reading</Header>
          <Grid columns={2}>
            <Grid.Column>Book Cover</Grid.Column>
            <Grid.Column>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              lorem ligula, facilisis vel sollicitudin sit amet, eleifend.
            </Grid.Column>
          </Grid>
        </Segment>
      </Wrapper>
    );
  }
}

export default connect()(CurrentReading);
