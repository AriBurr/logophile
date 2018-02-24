import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Grid, Header, Segment } from 'semantic-ui-react';

const Wrapper = styled.div`
  padding: 1%;
`;

class CurrentReading extends React.Component {
  render() {
    return (
      <Wrapper>
        <Segment>
          <Header>Currently Reading</Header>
          <Grid>
            <Grid.Column>
              <Button as={Link} to="/library">
                Add New Reading
              </Button>
            </Grid.Column>
          </Grid>
        </Segment>
      </Wrapper>
    );
  }
}

export default connect()(CurrentReading);
