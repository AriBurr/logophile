import React from 'react';
import { connect } from 'react-redux';
import ClubForm from './ClubForm';
import styled from 'styled-components';
import { Button, Grid } from 'semantic-ui-react';

const Wrapper = styled.div`
  height: 100vh;
  overflow: auto;
`;

class Clubs extends React.Component {
  render() {
    return (
      <Wrapper>
        <ClubForm />
        <Grid>
          <Grid.Column
            mobile="16"
            tablet="5"
            computer="4"
            largeScreen="3"
            width={3}
          />
        </Grid>
      </Wrapper>
    );
  }
}

export default connect()(Clubs);
