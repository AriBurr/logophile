import React from 'react';
import NavBar from'./NavBar';
import UserNavBar from './UserNavBar';

class Navigation extends React.Component {
  state = { activeItem: '' }

  setActiveItem = (e, { name }) => this.setState({ activeItem: name })
  clearActiveItem = () => this.setState({ activeItem: '' })

  render() {
    const { activeItem } = this.state;
    return (
      <div>
        <UserNavBar clearActiveItem={this.clearActiveItem} activeItem={activeItem} />
        <NavBar setActiveItem={this.setActiveItem} activeItem={activeItem} />
      </div>
    );
  }
}

export default Navigation;
