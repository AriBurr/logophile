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
const AccordionTitle = styled(Accordion.Title)`
  background-color: rgba(147, 183, 190, 0.5);
  padding-left: 1% !important;
`;
const AccordionContent = styled(Accordion.Content)`
  padding-left: 1% !important;
  padding-right: 1% !important;
`;
const CommentIndex = styled.p`
  background-color: #FCF5C7;
  padding: 1% !important;
`;
const Comment = styled.div`
  padding-left: 1% !important;
  padding-right: 1% !important;
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
    return comments.map((c, i) => {
      return (
        <Comment>
          <CommentIndex>Message {i + 1}</CommentIndex>
          <p>{c.content}</p>
          <br />
        </Comment>
      );
    });
  };

  displayTopics = () => {
    const { comments, discussion } = this.props;
    const { activeIndex, comment } = this.state;
    return discussion.map(d => {
      return (
        <Grid.Row stretched key={d.id}>
          <Accordion fluid>
            <AccordionTitle
              active={activeIndex === d.id}
              index={d.id}
              onClick={this.handleClick}
            >
              {d.title}
            </AccordionTitle>
            <AccordionContent active={activeIndex === d.id}>
              <p>{d.content}</p>
              <ButtonAction onClick={this.toggleCommentForm}>
                {comment ? 'Cancel' : 'Reply'}
              </ButtonAction>
              <Divider hidden />
              {comment && <CommentForm {...d} comment={comment} />}
              {comments.length !== 0 && this.displayComments()}
            </AccordionContent>
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
