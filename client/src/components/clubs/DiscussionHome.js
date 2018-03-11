import React from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../../actions/comments';
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
    const { dispatch, discussion } = this.props;
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    const discussionID = discussion.filter(
      d => d.title === e.target.innerText
    )[0].id;
    dispatch(fetchComments(discussionID));
    this.setState({ activeIndex: newIndex });
  };

  toggleCommentForm = () => {
    const { comment } = this.state;
    this.setState({ comment: !comment });
  };

  displayComments = () => {
    const { comments } = this.props;
    return comments.map(c => {
      return <div>{c.content}</div>;
    });
  };

  displayTopics = () => {
    const { comments, discussion } = this.props;
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
              {comments.length !== 0 && this.displayComments()}
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
  return {
    readings: state.readings,
    discussion: state.discussions,
    comments: state.comments
  };
};

export default connect(mapStateToProps)(DiscussionHome);
