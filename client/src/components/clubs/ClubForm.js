import React from 'react';
import { connect } from 'react-redux';
import { addClub } from '../../actions/clubs';
import { editClub } from '../../actions/clubs';
import styled from 'styled-components';
import { Button, Form } from 'semantic-ui-react';

const Wrapper = styled.div`
  padding: 1%;
`;

class ClubForm extends React.Component {
  state = { name: '', description: '' };

  handleSubmit = e => {
    e.preventDefault();
    const { name, description } = this.state;
    const { edit, dispatch, toggleEdit, user } = this.props;
    const club = { name, description };
    this.setState({ name: '', description: '' });
    edit
      ? dispatch(editClub(this.props.club.id, club))
      : dispatch(addClub(user, club));
    edit && toggleEdit();
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { name, description } = this.state;
    const { club, edit, toggleEdit } = this.props;
    return (
      <Wrapper>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            onChange={this.handleChange}
            name="name"
            value={name}
            placeholder={edit ? club.name : 'Name'}
          />
          <Form.TextArea
            type="text"
            onChange={this.handleChange}
            name="description"
            value={description}
            placeholder={edit ? club.description : 'Add a brief description'}
          />
          <Button type="submit">Submit</Button>
          {edit && <Button onClick={() => toggleEdit()}>Cancel</Button>}
        </Form>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return { club: state.club, user: state.user };
};

export default connect(mapStateToProps)(ClubForm);
