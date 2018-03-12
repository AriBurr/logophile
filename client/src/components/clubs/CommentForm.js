import React from 'react';
import { connect } from 'react-redux';
import { addComment, editComment } from '../../actions/comments';
import styled from 'styled-components';
import { ButtonAction, ButtonWarning } from '../../styles/styles';
import { Form } from 'semantic-ui-react';

const Wrapper = styled.div`
  padding: 1%;
`;

class CommentForm extends React.Component {
  state = {
    content: ''
    // titleEdit: this.props.club.title,
    // contentEdit: this.props.club.content
  };

  handleSubmit = e => {
    e.preventDefault();
    const { content, contentEdit } = this.state;
    const { edit, dispatch, toggleEdit, id } = this.props;
    const comment = { content, discussion_id: id };
    const commentEdit = { contentEdit };
    this.setState({ content: '' });
    edit
      ? dispatch(editComment(this.props.comment.id, commentEdit))
      : dispatch(addComment(comment));
    edit && toggleEdit();
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { content, contentEdit } = this.state;
    const { edit, toggleEdit } = this.props;
    return (
      <Wrapper>
        <Form onSubmit={this.handleSubmit}>
          <Form.TextArea
            type="text"
            onChange={this.handleChange}
            name={edit ? 'contentEdit' : 'content'}
            value={edit ? contentEdit : content}
            placeholder="Leave a comment!"
          />
          <ButtonAction type="submit">Submit</ButtonAction>
          {edit && (
            <ButtonWarning onClick={() => toggleEdit()}>Cancel</ButtonWarning>
          )}
        </Form>
      </Wrapper>
    );
  }
}

export default connect()(CommentForm);
