import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleLogout } from '../actions/auth';
import styled from 'styled-components';

const MenuStyle = styled(Menu)`
  background-color: rgba(0, 0, 0, .5) !important;
  padding-top: 1%;
  position: fixed !important;
  width: 100%;
  z-index: 50 !important;
`

const MenuItem = styled(Menu.Item)`
  color: white !important;
`

class NavBar extends Component {
  state = { user: {} }

  componentWillReceiveProps = (nextProps) => {
    const user = nextProps.user
    if (user !== null)
      this.setState({ user: nextProps.user })
  }

  componentDidMount = () => {
    this.setState({ user: this.props.user })
  }

  rightNavs = () => {
    const { dispatch, history } = this.props;
    const { user } = this.state
    if(Object.keys(user).length !== 0){
      if(user.id){
        return (
          <Menu.Menu position='right'>
            <Menu.Item
              as={MenuItem}
              name='Logout'
              onClick={() => dispatch(handleLogout(user, history))}
              />
          </Menu.Menu>
        )
      }
    }else{
      return (
        <Menu.Menu position='right'>
          <Link to='/register'>
            <Menu.Item as={MenuItem} name='Register' />
          </Link>
          <Link to='/login'>
            <Menu.Item as={MenuItem} name='Login' />
          </Link>
        </Menu.Menu>
      );
    }
  }

  loggedInLinks = () => {
    return(
      <Link to='/library'>
        <Menu.Item as={MenuItem} name='Bookshelves' />
      </Link>
    )
  }

  render() {
    const { user } = this.props
    return (
      <div>
        <Menu
          as={MenuStyle}
          pointing
          secondary
        >
          <Link to='/'>
            <Menu.Item as={MenuItem} name='home' />
          </Link>
          <Link to='/books'>
            <Menu.Item as={MenuItem} name='Find Books' />
          </Link>
          { user && this.loggedInLinks()}
          { this.rightNavs() }
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default withRouter(connect(mapStateToProps)(NavBar));
