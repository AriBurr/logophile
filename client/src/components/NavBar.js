import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { objectCheck } from '../utils/modules';
import styled from 'styled-components';
import { Menu } from 'semantic-ui-react';

const ComponentStyle = styled.div`
  .ui.menu .active.item {
    background-color: #1DD3B0 !important;
  }
`
const Header = styled.div`
  background-color: #1DD3B0;
  color: white;
  letter-spacing: 1px;
  height: 75px;
  padding: 20px 0;
  position: relative;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
    h1 {
      margin-left: 30px;
    }
`
const LinkStyle = styled(Link)`
  color: white !important;
  &: hover {
    background-color: #1DD3B0 !important;
  }
`
const MenuStyle = styled(Menu)`
  &&& {
    background-color: #223843;
    border: none;
    border-radius: 0px;
    box-shadow: none;
    margin: 0;
  }
`

class NavBar extends Component {
  state = { user: {} }

  componentDidMount = () => {
    this.setState({ user: this.props.user });
  }

  loggedInLinks = () => {
    const { activeItem, setActiveItem } = this.props;
    return (
      <Menu.Item
        as={LinkStyle}
        to='/library'
        onClick={setActiveItem}
        name='Bookshelves'
        active={activeItem === 'Bookshelves'}
      />
    );
  }

  renderHeader = () => {
    const path = this.props.location.pathname;
    const { activeItem } = this.props;
    if (path === '/login') return 'Sign In'
    if (path === '/register') return 'Register'
    return path === '/' ? 'Welcome' : activeItem
  }

  render() {
    const { setActiveItem, activeItem, user } = this.props;
    return (
      <ComponentStyle>
        <Menu as={MenuStyle}>
          <Menu.Item
            as={LinkStyle}
            to='/'
            onClick={setActiveItem}
            name='Home'
            active={activeItem === 'Home'}
          />
          <Menu.Item
            as={LinkStyle}
            to='/books'
            onClick={setActiveItem}
            name='Search Books'
            active={activeItem === 'Search Books'}
          />
        { user !== null && objectCheck(user) && this.loggedInLinks() }
        </Menu>
        <Header>
          <h1>{this.renderHeader()}</h1>
        </Header>
      </ComponentStyle>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user }
}

export default withRouter(connect(mapStateToProps)(NavBar));
