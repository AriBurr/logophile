import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleLogout } from '../actions/auth';
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
    h1 {
      margin-left: 30px;
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
const MenuTheme = styled(Menu.Item)`
  color: white !important;
  background-color: ${props => props.active ? '#1DD3B0' : '#223843'} !important;
  &: hover {
    background-color: #1DD3B0 !important;
  }
`

class NavBar extends Component {
  state = { activeItem: '', user: {} }

  componentDidMount = () => {
    this.setState({ user: this.props.user })
  }

  setActiveItem = (e, { name }) => this.setState({ activeItem: name })

  loggedInLinks = () => {
    return (
      <Link to='/library'>
        <Menu.Item
          as={MenuTheme}
          onClick={this.setActiveItem}
          name='Bookshelves'
          active={this.state.activeItem === 'Bookshelves'}
        />
      </Link>
    );
  }

  render() {
    const { user } = this.props;
    const { activeItem } = this.state;
    return (
      <ComponentStyle>
        <Menu as={MenuStyle}>
          <Link to='/'>
            <Menu.Item
              as={MenuTheme}
              onClick={this.setActiveItem}
              name='Home'
              active={this.state.activeItem === 'Home'}
            />
          </Link>
          <Link to='/books'>
            <Menu.Item
              as={MenuTheme}
              onClick={this.setActiveItem}
              name='Find Books'
              active={this.state.activeItem === 'Find Books'}
            />
          </Link>
          { user && this.loggedInLinks() }
        </Menu>
        <Header>
          <h1>{ activeItem }</h1>
        </Header>
      </ComponentStyle>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user }
}

export default withRouter(connect(mapStateToProps)(NavBar));
