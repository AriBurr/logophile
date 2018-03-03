import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Header, Segment, Form, Button } from 'semantic-ui-react';
import { editAnnouncement } from '../../actions/announcements';


const Wrapper = styled.div`
  padding: 1%;
`;

class AnnouncementForm extends React.Component {
  state = {
    body: '',
    bodyEdit: 'change me'
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { body, bodyEdit } = this.state;
    const { dispatch, edit, toggleEdit } = this.props;
    const ann = { body };
    const annEdit = { bodyEdit };
    this.setState({ name: '', description: '' });
    debugger
    edit && dispatch(editAnnouncement(this.props.club.id, annEdit))

    edit && toggleEdit();
  }

  render() {
    const { body, bodyEdit } = this.state;
    const { edit, toggleEdit } = this.props;
    return (
      <Wrapper>
        <Form onSubmit={this.handleSubmit}>
          <Form.TextArea
            type="text"
            onChange={this.handleChange}
            name={ edit ? "bodyEdit" : "body" }
            value={edit ? bodyEdit : body}
          />
          <Button type="submit">Submit</Button>
          {edit && <Button onClick={() => toggleEdit()}>Cancel</Button>}
        </Form>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return { announcement: state.announcement };
};

export default connect(mapStateToProps)(AnnouncementForm);
