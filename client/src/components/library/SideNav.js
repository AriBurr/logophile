import React from 'react'
import styled from 'styled-components'
import ShelfForm from './ShelfForm'
import { deleteBookshelf } from '../../actions/bookshelves';
import { fetchShelvings } from '../../actions/shelvings';
import { Icon, Menu, Label } from 'semantic-ui-react'
import { connect } from 'react-redux'


const MenuStyle =  styled(Menu)`
  padding-top: 85px;
  border: none !important;
  border-radius: 0px !important;
  box-shadow: none !important;

`

class SideNav extends React.Component {
  state = {
    activeItem: '',
    edit: false,
  }

  toggleEdit = () => {
    const { edit } = this.state;
    this.setState({ edit: !edit })
  }

  handleItemClick = (shelf) => this.props.dispatch(fetchShelvings(shelf));

  setActiveItemCb = (item) => this.setState({ activeItem: item })

  mapBookshelves = (activeItem) => {
    const { edit } = this.state;
    const { bookshelves, dispatch } = this.props
    return bookshelves.map( shelf => {
      return(
        <Menu.Item
          key={shelf.id}
          name={shelf.name}
          active={activeItem === `${shelf.name}`}
          onClick={() => this.handleItemClick(shelf)}
        >
          { edit && <Icon onClick={ () => dispatch(deleteBookshelf(shelf)) } name='trash'></Icon> }
          <Label color='teal'>1</Label>
          {shelf.name}
        </Menu.Item>
      )
    })
  }


  render() {
    const { activeItem } = this.state

    return (
      <Menu vertical as={MenuStyle}>
        <Icon onClick={ () => this.toggleEdit() } name='edit'></Icon>
        { this.mapBookshelves(activeItem) }
        <ShelfForm />
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    bookshelves: state.bookshelves,
    shelvings: state.shelvings,
  }
}

export default connect(mapStateToProps)(SideNav);
