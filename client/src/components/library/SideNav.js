import React from 'react'
import { connect } from 'react-redux'
import { deleteBookshelf } from '../../actions/bookshelves';
import { fetchShelvings } from '../../actions/shelvings';
import { fetchShelf } from '../../actions/bookshelf';
import ShelfForm from './ShelfForm'
import bookshelf from '../../assets/bookshelf-component.svg'
import styled from 'styled-components'
import { Icon, Menu, Label } from 'semantic-ui-react'

const EnlargeMenu = styled(Menu.Item)`
  background-color: #223843 !important;
  border: none !important;
  border-radius: 0px !important;
  box-shadow: none !important;
  color: white;
  height: 100vh;
  width: 20rem !important;
  padding: 5%;
`
const MenuStyle = styled(Menu)`
  color: white !important;
`
const Image = styled.img`
  height: 175px;
  width: 175px;
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
          as={MenuStyle}
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
    const { edit, activeItem } = this.state
    return (
      <Menu vertical as={EnlargeMenu}>
        <Image src={bookshelf}></Image>
        <ShelfForm
          toggleEdit={this.toggleEdit}
          edit={edit}
          active={activeItem}
        />
        { this.mapBookshelves(activeItem) }
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
