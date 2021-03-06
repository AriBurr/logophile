import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleLogin } from '../../actions/auth';
import styled from 'styled-components';
import { ButtonAction } from '../../styles/styles';
import { Form, Header, Segment } from 'semantic-ui-react';

const ComponentStyle = styled(Segment)`
  height: 100vh;
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

class Login extends Component {
  state = { email: '', password: '' };

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    const { email, password } = this.state;
    dispatch(handleLogin(email, password, history));
  };

  render() {
    const { email, password } = this.state;
    return (
      <Segment basic className="container" as={ComponentStyle}>
        <Segment textAlign="center" basic>
          <Header as="h1">Please sign in (it makes life more fun)</Header>
          <p>
            Unite with the greater logophile ecosystem: log books, get user
            recommendations, and more!
          </p>
        </Segment>
        <Form onSubmit={this.handleSubmit} as={FormStyle}>
          <Form.Field>
            <label htmlFor="email">
              Email <span>(required)</span>
            </label>
            <input
              autoFocus
              required
              id="email"
              value={email}
              placeholder="Email"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="password">
              Password <span>(required)</span>
            </label>
            <input
              required
              id="password"
              value={password}
              placeholder="Password"
              type="password"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Link to="/register">Not a member? Register today!</Link>
          <Segment textAlign="center" basic>
            <ButtonAction type="submit">Submit</ButtonAction>
          </Segment>
        </Form>
      </Segment>
    );
  }
}

export default connect()(Login);
