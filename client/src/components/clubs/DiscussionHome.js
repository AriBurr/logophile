import React from 'react';
import { connect } from 'react-redux';
import DiscussionForm from './DiscussionForm';
import styled from 'styled-components';
import { Grid, Header, Segment } from 'semantic-ui-react';

const Wrapper = styled.div`
  padding: 1%;
`;

class DiscussionHome extends React.Component {
  displayTopics = () => {
    const { discussion } = this.props;
    return discussion.map(d => {
      return (
        <Grid.Row>
          {d.title}
        </Grid.Row>
      )
    });
  };

  render() {
    const { readings } = this.props;
    return (
      <Wrapper>
        <Segment>
          <Grid>
            <Grid.Row>
              <Header>Discussion</Header>
            </Grid.Row>
            <Grid.Row>
              {readings.length !== 0 && (
                <DiscussionForm reading={readings[0]} />
              )}
            </Grid.Row>
            {this.displayTopics()}
          </Grid>
        </Segment>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return { readings: state.readings, discussion: state.discussions };
};

export default connect(mapStateToProps)(DiscussionHome);
