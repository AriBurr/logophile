import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../../actions/auth';
import { setFlash } from '../../actions/flash';
import styled from 'styled-components';
import { ButtonAction } from '../../styles/styles';
import { Form, Header, Segment } from 'semantic-ui-react';

const ComponentStyle = styled(Segment)`
  span {
    color: #fc7753;
    font-size: 10px;
  }
`;
const FormStyle = styled(Form)`
  &&& {
    margin: 0 auto;
    width: 40%;
  }
`;

class Register extends Component {
  state = { email: '', password: '', passwordConfirmation: '', name: '' };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password, passwordConfirmation, name } = this.state;
    const { dispatch, history } = this.props;
    if (password === passwordConfirmation) {
      dispatch(
        registerUser(email, password, passwordConfirmation, history, name)
      );
    } else
      dispatch(setFlash('Passwords do not match!, please try again', 'red'));
  };

  handleChange = event => {
    const id = event.target.id;
    const value = event.target.value;
    this.setState({ [id]: value });
  };

  render() {
    const { email, password, passwordConfirmation, name } = this.state;
    return (
      <Segment className="container" basic as={ComponentStyle}>
        <Segment textAlign="center" basic>
          <Header as="h1">Awesome! Let's create your account.</Header>
          <p>Sign up and become part of a united reading community!</p>
        </Segment>
        <Form onSubmit={this.handleSubmit} as={FormStyle}>
          <Form.Field>
            <label htmlFor="name">
              Name <span>(required)</span>
            </label>
            <input
              autoFocus
              id="name"
              placeholder="Name"
              required
              value={name}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="email">
              Email <span>(required)</span>
            </label>
            <input
              id="email"
              placeholder="Email"
              required
              value={email}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="password">
              Password <span>(required)</span>
            </label>
            <input
              id="password"
              placeholder="Password"
              type="password"
              required
              value={password}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="passwordConfirmation">
              Password passwordConfirmation <span>(required)</span>
            </label>
            <input
              id="passwordConfirmation"
              placeholder="Password Confirmation"
              type="password"
              required
              value={passwordConfirmation}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Link to="/login">Already a member? Sign in!</Link>
          <Segment basic textAlign="center">
            <ButtonAction type="submit">Submit</ButtonAction>
          </Segment>
        </Form>
      </Segment>
    );
  }
}

export default connect()(Register);
