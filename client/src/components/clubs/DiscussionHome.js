import React from 'react';
import { connect } from 'react-redux';
import CommentForm from './CommentForm';
import DiscussionForm from './DiscussionForm';
import styled from 'styled-components';
import { ButtonAction } from '../../styles/styles';
import {
  Accordion,
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Segment
} from 'semantic-ui-react';

const Wrapper = styled.div`
  padding: 1%;
`;

class DiscussionHome extends React.Component {
  state = { activeIndex: 0, comment: false };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  toggleCommentForm = () => {
    const { comment } = this.state;
    this.setState({ comment: !comment });
  };

  displayTopics = () => {
    const { discussion } = this.props;
    const { activeIndex, comment } = this.state;
    return discussion.map(d => {
      return (
        <Grid.Row key={d.id}>
          <Accordion>
            <Accordion.Title
              active={activeIndex === d.id}
              index={d.id}
              onClick={this.handleClick}
            >
              <Icon name="chevron down" />
              {d.title}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === d.id}>
              {d.content}
              <Divider />
              {comment && <CommentForm {...d} comment={comment} />}
              <ButtonAction onClick={this.toggleCommentForm}>
                {comment ? 'Cancel' : 'Reply'}
              </ButtonAction>
            </Accordion.Content>
          </Accordion>
        </Grid.Row>
      );
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
