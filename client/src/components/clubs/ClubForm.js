import React from 'react';
import { connect } from 'react-redux';
import { addClub } from '../../actions/clubs';
import { editClub } from '../../actions/clubs';
import styled from 'styled-components';
import { Button, Form } from 'semantic-ui-react';

class ClubForm extends React.Component {
  state = { name: '', description: '' };

  handleSubmit = e => {
    e.preventDefault();
    const { name, description } = this.state;
    const { edit, dispatch, toggleEdit } = this.props;
    const club = { name, description };
    this.setState({ name: '', description: '' });
    edit ? dispatch(editClub(this.props.club.id, club)) : dispatch(addClub(club));
    edit && toggleEdit();
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { name, description } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          width={5}
          onChange={this.handleChange}
          name="name"
          value={name}
          placeholder={'Name'}
        />
        <Form.TextArea
          width={5}
          type='text'
          onChange={this.handleChange}
          name="description"
          value={description}
          placeholder={'Add a Brief Description'}
        />
        <Button type='submit'>Submit</Button>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return { club: state.club };
};

export default connect(mapStateToProps)(ClubForm);
