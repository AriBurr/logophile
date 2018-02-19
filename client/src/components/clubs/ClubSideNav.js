import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Menu } from 'semantic-ui-react';

const Wrapper = styled.div`
  height: 100vh;
  padding: 5%;
`

class ClubSideNav extends React.Component {

  render() {
    return (
      <Wrapper>
        <Menu vertical>
          <Menu.Item>Home</Menu.Item>
          <Menu.Item>Users</Menu.Item>
          <Menu.Item>Active Discussion</Menu.Item>
          <Menu.Item>Archives</Menu.Item>
        </Menu>
        <div>Moderator</div>
      </Wrapper>
    )
  }
}

export default connect()(ClubSideNav);
