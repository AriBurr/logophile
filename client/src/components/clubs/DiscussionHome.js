import React from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../../actions/comments';
import CommentForm from './CommentForm';
import DiscussionForm from './DiscussionForm';
import styled from 'styled-components';
import { ButtonAction } from '../../styles/styles';
import {
  Accordion,
  Divider,
  Grid,
  Header,
  Icon,
  Segment
} from 'semantic-ui-react';

const Wrapper = styled.div`
  padding: 1%;
  width: 100%;
  .text-wrapper{
    padding: 3% !important;
  }
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
  background-color: #fcf5c7;
  padding: 1% !important;
`;
const Comment = styled.div`
  padding-left: 1% !important;
  padding-right: 1% !important;
`;
const Container = styled.div`
  border: 0;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
`;

class DiscussionHome extends React.Component {
  state = { activeIndex: 0, addComment: false, addDiscussion: false };

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
    const { addComment } = this.state;
    this.setState({ addComment: !addComment });
  };

  toggleDiscussionForm = () => {
    const { addDiscussion } = this.state;
    this.setState({ addDiscussion: !addDiscussion });
  };

  displayComments = () => {
    const { comments } = this.props;
    return comments.map((c, i) => {
      return (
        <Comment key={i}>
          <CommentIndex>Message {i + 1}</CommentIndex>
          <p>{c.content}</p>
          <br />
        </Comment>
      );
    });
  };

  displayDiscussion = () => {
    const { comments, discussion } = this.props;
    const { activeIndex, addComment } = this.state;
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
                {addComment ? 'Cancel' : 'Reply'}
              </ButtonAction>
              <Divider hidden />
              {addComment && <CommentForm {...d} addComment={addComment} />}
              {comments.length !== 0 && this.displayComments()}
            </AccordionContent>
          </Accordion>
        </Grid.Row>
      );
    });
  };

  render() {
    const { readings } = this.props;
    const { addDiscussion } = this.state;
    return (
      <Wrapper>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid columns={2}>
                <Grid.Column textAlign="right">
                  <Header>Discussion</Header>
                </Grid.Column>
                <Grid.Column textAlign="left">
                  <em>Add a Discussion Topic</em>&nbsp;
                  <Icon
                    name="plus"
                    size="small"
                    onClick={this.toggleDiscussionForm}
                  />
                </Grid.Column>
              </Grid>
            </Grid.Row>
            <Grid.Row textAlign="center">
              {addDiscussion &&
                readings.length !== 0 && (
                  <DiscussionForm
                    toggleDiscussionForm={this.toggleDiscussionForm}
                    reading={readings[0]}
                  />
                )}
            </Grid.Row>
            {this.displayDiscussion()}
          </Grid>
        </Container>
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
