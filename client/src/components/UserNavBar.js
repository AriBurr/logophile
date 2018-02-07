import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { objectCheck } from '../utils/modules';
import { handleLogout } from '../actions/auth';
import logo from '../assets/logo.jpg';
import styled from 'styled-components';
import { Menu } from 'semantic-ui-react';

const MenuStyle = styled(Menu)`
  &&& {
    border: none;
    border-radius: 0px;
    box-shadow: none;
    margin-bottom: 0;
  }
`
const MenuItem = styled(Menu.Item)`
  letter-spacing: 3px;
  margin-right: 50px;
  &:hover {
    background-color: #223843 !important;
    color: white !important;
  }
`
const Image = styled.img`
  margin-top: 5px;
  margin-bottom: 1px;
  height: 60px;
`
const LinkStyle = styled(Link)`
  letter-spacing: 3px;
  margin-right: 50px;
  &:hover {
    background-color: #223843 !important;
    color: white !important;
  }
`

class UserNavBar extends Component {
  state = { user: {} }

  componentWillReceiveProps = (nextProps) => {
    const user = nextProps.user;
    if (user !== null)
      this.setState({ user: nextProps.user });
  }

  componentDidMount = () => {
    this.setState({ user: this.props.user });
  }

  userNavs = () => {
    const { dispatch, history } = this.props;
    const { user } = this.state;
    if (objectCheck(user)) {
      if (user.id) {
        return (
          <Menu.Menu position='right'>
            <Menu.Item
              as={MenuItem}
              name='Logout'
              onClick={() => dispatch(handleLogout(user, history))}
            />
          </Menu.Menu>
        );
      }
    } else {
        return (
          <Menu.Menu position='right'>
            <Menu.Item
              as={LinkStyle}
              to='/register'
              name='Register'
            />
            <Menu.Item
              as={LinkStyle}
              to='/login'
              name='Login'
            />
          </Menu.Menu>
      );
    }
  }

  render() {
    return (
      <Menu
        as={MenuStyle}
        borderless
      >
        <Image src={logo} />
        { this.userNavs() }
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user }
}

export default withRouter(connect(mapStateToProps)(UserNavBar));
