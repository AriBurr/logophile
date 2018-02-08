import React, { Component } from 'react';
import { Header, Form, Button, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/auth';
import { setFlash } from '../../actions/flash';
import { Link } from 'react-router-dom'
import { ButtonStyle } from '../../styles/styles';
import styled from 'styled-components'


const FormStyle = styled(Form)`
  width: 40% !important;
  margin: 0 auto !important;
`
const ComponentStyle = styled(Segment)`
  span{
    color: #FC7753;
    font-size: 10px;
  }
`

class Register extends Component {
  state = { email: '', password: '', passwordConfirmation: '', name: '' };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password, passwordConfirmation, name } = this.state;
    const { dispatch, history } = this.props;
    if (password === passwordConfirmation) {
      dispatch(registerUser(email, password, passwordConfirmation, history, name));
    } else dispatch(setFlash('Passwords do not match!, please try again', 'red'));
  }

  handleChange = event => {
    const id = event.target.id;
    const value = event.target.value;
    this.setState({ [id]: value });
  }

  render() {
    const { email, password, passwordConfirmation, name } = this.state;

    return (
      <Segment className='container' basic as={ComponentStyle}>
        <Segment textAlign='center' basic>
          <Header as='h1'>
            Awesome! Let's create your account.
          </Header>
          <p>
            Sign up and become part of a united reading community!
          </p>
        </Segment>
        <Form onSubmit={this.handleSubmit} as={FormStyle}>
          <Form.Field>
            <label htmlFor='name'>
              Name <span>(required)</span>
            </label>
            <input
              autoFocus
              id='name'
              placeholder='Name'
              required
              value={name}
              onChange={this.handleChange}
              />
          </Form.Field>
          <Form.Field>
            <label htmlFor='email'>
              Email <span>(required)</span>
            </label>
            <input
              id='email'
              placeholder='Email'
              required
              value={email}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='password'>
              Password <span>(required)</span>
            </label>
            <input
              id='password'
              placeholder='Password'
              type='password'
              required
              value={password}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='passwordConfirmation'>
              Password passwordConfirmation <span>(required)</span>
            </label>
            <input
              id='passwordConfirmation'
              placeholder='Password Confirmation'
              type='password'
              required
              value={passwordConfirmation}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Link to='/login'>Already a member? Sign in!</Link>
          <Segment basic textAlign='center'>
            <Button as={ButtonStyle} type='submit'>Submit</Button>
          </Segment>
        </Form>
      </Segment>
    );
  }
}

export default connect()(Register);
