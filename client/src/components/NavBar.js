import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
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
const LinkStyle = styled(Link)`
  color: white !important;
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
    const { activeItem } = this.state;
    return (
      <Menu.Item
        as={LinkStyle}
        to='/library'
        onClick={this.setActiveItem}
        name='Bookshelves'
        active={activeItem === 'Bookshelves'}
      />
    );
  }

  renderHeader = () => {
    const path = this.props.location.pathname;
    const { activeItem } = this.state;
    if (path === '/login' || path === '/register' || path === '/')
      return ''
    else
      return activeItem
  }

  render() {
    const { user } = this.props;
    const { activeItem } = this.state;
    return (
      <ComponentStyle>
        <Menu as={MenuStyle}>
          <Menu.Item
            as={LinkStyle}
            to='/'
            onClick={this.setActiveItem}
            name='Home'
            active={activeItem === 'Home'}
          />
          <Menu.Item
            as={LinkStyle}
            to='/books'
            onClick={this.setActiveItem}
            name='Search Books'
            active={activeItem === 'Search Books'}
          />
          { user && this.loggedInLinks() }
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
