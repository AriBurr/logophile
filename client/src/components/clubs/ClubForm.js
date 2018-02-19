import React from 'react';
import { connect } from 'react-redux';
import { addClub } from '../../actions/clubs';
import styled from 'styled-components';
import { Button, Form } from 'semantic-ui-react';

class ClubForm extends React.Component {
  state = { name: '', description: '' };

  handleSubmit = e => {
    e.preventDefault();
    const { name, description } = this.state;
    const { dispatch } = this.props;
    const club = { name, description };
    this.setState({ name: '', description: '' });
    dispatch(addClub(club));
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

export default connect()(ClubForm);
