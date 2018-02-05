import React from 'react'
import styled from 'styled-components'
import ShelfForm from './ShelfForm'
import { deleteBookshelf } from '../../actions/bookshelves';
import { fetchShelvings } from '../../actions/shelvings';
import { fetchShelf } from '../../actions/bookshelf';
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
    activeItem: {},
    edit: false,
  }

  toggleEdit = () => {
    const { edit } = this.state;
    this.setState({ edit: !edit })
  }

  handleItemClick = (shelf , e) => {
    this.props.dispatch(fetchShelvings(shelf));
    this.props.dispatch(fetchShelf(shelf));
    this.setState({ activeItem: shelf })
  }

  mapBookshelves = (activeItem) => {
    const { edit } = this.state;
    const { bookshelves, dispatch } = this.props
    return bookshelves.map( shelf => {
      return (
        <Menu.Item
          key={shelf.shelf.id}
          name={shelf.shelf.name}
          active={activeItem === shelf.shelf}
          onClick={() => this.handleItemClick(shelf.shelf)}
        >
          { edit &&
            <div>
              <Icon onClick={ () => dispatch(deleteBookshelf(shelf.shelf)) } name='trash'></Icon>
              <Icon onClick={ () => this.handleItemClick(shelf.shelf) } name='pencil'></Icon>
            </div>
          }
          <Label color='teal'>{shelf.count}</Label>
          {shelf.shelf.name}
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
        <ShelfForm edit={this.state.edit} active={this.state.activeItem} />
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
