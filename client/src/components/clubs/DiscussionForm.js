import React from 'react';
import { connect } from 'react-redux';
import { addDiscussion, editDiscussion } from '../../actions/discussions';
import styled from 'styled-components';
import { ButtonAction, ButtonWarning } from '../../styles/styles';
import { Form } from 'semantic-ui-react';

const Wrapper = styled.div`
  padding: 1%;
`;

class DiscussionForm extends React.Component {
  state = {
    title: '',
    content: '',
    // titleEdit: this.props.club.title,
    // contentEdit: this.props.club.content
  };

  handleSubmit = e => {
    e.preventDefault();
    const { title, content, titleEdit, contentEdit } = this.state;
    const { edit, dispatch, toggleEdit } = this.props;
    const discussion = { title, content };
    const discussionEdit = { titleEdit, contentEdit };
    this.setState({ title: '', content: '' });
    edit
      ? dispatch(editDiscussion(this.props.discussion.id, discussionEdit))
      : dispatch(addDiscussion(discussion));
    edit && toggleEdit();
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { title, content, titleEdit, contentEdit } = this.state;
    const { edit, toggleEdit } = this.props;
    return (
      <Wrapper>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            onChange={this.handleChange}
            name={edit ? 'titleEdit' : 'title'}
            value={edit ? titleEdit : title}
            placeholder='Discussion Title'
          />
          <Form.TextArea
            type="text"
            onChange={this.handleChange}
            name={edit ? 'contentEdit' : 'content'}
            value={edit ? contentEdit : content}
            placeholder='Discussion Body'
          />
        <ButtonAction type="submit">Submit</ButtonAction>
          {edit && <ButtonWarning onClick={() => toggleEdit()}>Cancel</ButtonWarning>}
        </Form>
      </Wrapper>
    );
  }
}

export default connect()(DiscussionForm);
