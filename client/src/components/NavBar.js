import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { objectCheck } from '../utils/modules';
import styled from 'styled-components';
import { Dropdown, Menu } from 'semantic-ui-react';

const ComponentStyle = styled.div`
  .ui.menu .active.item {
    background-color: #1dd3b0 !important;
  }
`;
const DropdownStyle = styled(Dropdown)`
  color: white !important;
`;
const Header = styled.div`
  background-color: #1dd3b0;
  color: white;
  letter-spacing: 1px;
  height: 75px;
  padding: 20px 0;
  position: relative;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  h1 {
    margin-left: 30px;
  }
`;
const LinkStyle = styled(Link)`
  color: white !important;
  &: hover {
    background-color: #1dd3b0 !important;
  }
`;
const MenuStyle = styled(Menu)`
  &&& {
    background-color: #223843;
    border: none;
    border-radius: 0px;
    box-shadow: none;
    margin: 0;
  }
`;

class NavBar extends Component {
  state = { user: {} };

  componentDidMount = () => {
    this.setState({ user: this.props.user });
  };

  loggedInLinks = () => {
    return (
      <DropdownStyle
        item text="Profile"
      >
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/library">
            My Bookshelves
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/my_clubs">
            My Clubs
          </Dropdown.Item>
        </Dropdown.Menu>
      </DropdownStyle>
    );
  };

  renderHeader = () => {
    //text for the current page - sub header text
    const path = this.props.location.pathname;
    const data = [
      { match: '/', text: 'Welcome'},
      { match: '/login', text: 'Sign In'},
      { match: '/register', text: 'Register'},
      { match: '/books', text: 'Search Books'},
      { match: '/clubs', text: 'Find Book Clubs'},
      { match: '/library', text: 'Your Bookshelves'},
      { match: '/my_clubs', text: 'Your Clubs'},
    ]
    const headerText =  data.filter((each) => {
      if(path === each.match)
        return each.text
    })
    return headerText[0].text
  };

  render() {
    const { setActiveItem, activeItem, user } = this.props;
    return (
      <ComponentStyle>
        <Menu as={MenuStyle}>
          <Menu.Item
            as={LinkStyle}
            to="/"
            onClick={setActiveItem}
            name="Home"
            active={activeItem === 'Home'}
          />
          <Menu.Item
            as={LinkStyle}
            to="/books"
            onClick={setActiveItem}
            name="Search Books"
            active={activeItem === 'Search Books'}
          />
          <DropdownStyle item text="Community">
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/clubs">
                Book Clubs
              </Dropdown.Item>
              <Dropdown.Item>Users</Dropdown.Item>
            </Dropdown.Menu>
          </DropdownStyle>
          {user !== null && objectCheck(user) && this.loggedInLinks()}
        </Menu>
        <Header>
          <h1>{this.renderHeader()}</h1>
        </Header>
      </ComponentStyle>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default withRouter(connect(mapStateToProps)(NavBar));
