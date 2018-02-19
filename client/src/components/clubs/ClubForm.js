import React from 'react';
import { connect } from 'react-redux';
import { addClub } from '../../actions/clubs';
import styled from 'styled-components';
import { Form, Input, Menu } from 'semantic-ui-react';

class ClubForm extends React.Component {
  state = { name: '' };

  handleSubmit = e => {
    e.preventDefault();
    const { name } = this.state;
    const { dispatch } = this.props;
    const club = { name };
    this.setState({ name: '' });
    dispatch(addClub(club));
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { name } = this.state;
    return (
      <Menu.Item>
        <Form onSubmit={this.handleSubmit}>
          <Input
            onChange={this.handleChange}
            name="name"
            value={name}
            icon="plus"
            placeholder={'Create Club'}
          />
        </Form>
      </Menu.Item>
    );
  }
}

export default connect()(ClubForm);
