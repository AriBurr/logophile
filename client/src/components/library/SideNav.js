import React from 'react'
import styled from 'styled-components'
import ShelfForm from './ShelfForm'
import { Menu, Label, Input } from 'semantic-ui-react'
import { fetchBookshelves } from '../../actions/bookshelves';
import { connect } from 'react-redux'
import axios from 'axios'


const MenuStyle =  styled(Menu)`
  padding-top: 85px;
  border: none !important;
  border-radius: 0px !important;
  box-shadow: none !important;

`

class SideNav extends React.Component {
  state = {
    activeItem: '',
    loaded: false
  }

  componentDidMount(){
    this.props.dispatch(fetchBookshelves())
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  mapBookshelves = (activeItem) => {
    const { bookshelves } = this.props
    debugger
    return bookshelves.map( shelf => {
      return(
        <Menu.Item
          key={shelf.id}
          name={shelf.name}
          active={activeItem === `${shelf.name}`}
          onClick={this.handleItemClick}
        >
          <Label color='teal'>1</Label>
          {shelf.name}
        </Menu.Item>
      )
    })
  }


  render() {
    const { activeItem, loaded } = this.state

    return (
      <Menu vertical basic as={MenuStyle}>
        { this.mapBookshelves(activeItem) }
        <ShelfForm />
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return { bookshelves: state.bookshelves}
}

export default connect(mapStateToProps)(SideNav);
