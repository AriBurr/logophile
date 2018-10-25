import React from 'react';
import { connect } from 'react-redux';
import { editAnnouncement } from '../../actions/announcements';
import styled from 'styled-components';
import { ButtonAction, ButtonWarning } from '../../styles/styles';
import { Form } from 'semantic-ui-react';

const Wrapper = styled.div`
  padding: 1%;
`;

class AnnouncementForm extends React.Component {
  state = {
    body: this.props.announcement.body
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { body } = this.state;
    const { dispatch, edit, toggleEdit, club } = this.props;
    const ann = { body };
    this.setState({ name: '', description: '' });
    edit && dispatch(editAnnouncement(club.id, ann));
    edit && toggleEdit();
  };

  render() {
    const { body } = this.state;
    const { edit, toggleEdit } = this.props;
    return (
      <Wrapper>
        <Form onSubmit={this.handleSubmit}>
          <Form.TextArea
            type="text"
            onChange={this.handleChange}
            name={edit && 'body'}
            value={edit && body}
          />
          {edit && (
            <ButtonWarning onClick={() => toggleEdit()}>Cancel</ButtonWarning>
          )}
          <ButtonAction type="submit">Submit</ButtonAction>
        </Form>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    announcement: state.announcement,
    club: state.currentClub
  };
};

export default connect(mapStateToProps)(AnnouncementForm);
