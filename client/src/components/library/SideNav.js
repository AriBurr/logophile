import React from 'react'
import styled from 'styled-components'
import ShelfForm from './ShelfForm'
import { Menu, Label, Input } from 'semantic-ui-react'

const MenuStyle =  styled(Menu)`
  padding-top: 85px;
  border: none !important;
  border-radius: 0px !important;
  box-shadow: none !important;

`

class SideNav extends React.Component {
  state = {
    activeItem: 'inbox',
    bookshelves: [],
  }

  componentDidMount(){
    //fetch the users bookshelves
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  mapBookshelves = () => {

  }


  render() {
    const { activeItem } = this.state

    return (
      <Menu vertical basic as={MenuStyle}>
        <Menu.Item name='inbox' active={activeItem === 'inbox'} onClick={this.handleItemClick}>
          <Label color='teal'>1</Label>
          Inbox
        </Menu.Item>

        <Menu.Item name='spam' active={activeItem === 'spam'} onClick={this.handleItemClick}>
          <Label>51</Label>
          Spam
        </Menu.Item>

        <Menu.Item name='updates' active={activeItem === 'updates'} onClick={this.handleItemClick}>
          <Label>1</Label>
          Updates
        </Menu.Item>
        <ShelfForm />
      </Menu>
    )
  }
}

export default SideNav;
