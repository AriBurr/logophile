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
  width: 18rem !important;
  padding: 5%;
  .ui.menu .active.item:hover, .ui.vertical.menu .active.item:hover{
    background-color: white !important;
  }
`
const MenuStyle = styled(Menu)`
  color: white !important;
  font-size: 18px !important;
    &:hover {

    }
`
const LabelStyle = styled(Label)`
  margin-right: 7% !important;
`
const Image = styled.img`
  height: 175px;
  width: 175px;
`
const IconStyle = styled(Icon)`
  color: white !important;
  padding: 5%;
`

class SideNav extends React.Component {
  state = {
    activeItem: {},
    edit: false,
    loaded: 0,
  }

  componentDidMount = () => {
    this.setState({ loaded: 0 })
  }

  setDefaultShelf = (nextProps) => {
    const { loaded } = this.state
    if(loaded === 0)
      this.handleItemClick(nextProps.bookshelves[0])
      this.setState({ loaded: loaded + 1 })
  }

  componentWillReceiveProps = (nextProps) => {
    const { bookshelves } = this.props;
    bookshelves && this.setDefaultShelf(nextProps)
  }

  toggleEdit = () => {
    const { edit } = this.state;
    this.setState({ edit: !edit })
  }

  handleItemClick = (shelf , e = null) => {
    const { dispatch } = this.props;
    dispatch(fetchShelvings(shelf));
    dispatch(fetchShelf(shelf));
    this.setState({ activeItem: shelf });
  }

  mapBookshelves = (activeItem) => {
    const { edit } = this.state;
    const { bookshelves, dispatch } = this.props
    return bookshelves.map( shelf => {
      return (
        <Menu.Item
          as={MenuStyle}
          key={shelf.id}
          name={shelf.name}
          active={activeItem === shelf}
          onClick={() => this.handleItemClick(shelf)}
        >
          <Label as={LabelStyle} color='yellow'>{shelf.book_count}</Label>
        {shelf.name}
        { edit &&
          <span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Icon
              size='tiny'
              circular
              inverted
              onClick={ () => dispatch(deleteBookshelf(shelf)) }
              name='trash'>
            </Icon>
            <Icon
              size='tiny'
              circular
              inverted
              onClick={ () => this.handleItemClick(shelf) }
              name='pencil'>
            </Icon>
          </span>
        }
        </Menu.Item>
      )
    })
  }

  render() {
    const { edit, activeItem } = this.state;
    return (
      <Menu vertical as={EnlargeMenu}>
        <Image src={bookshelf}></Image>
        <ShelfForm
          edit={edit}
          active={activeItem}
        />
      { this.mapBookshelves(activeItem) }
        <Icon
          as={IconStyle}
          size='large'
          onClick={() => this.toggleEdit()}
          name='edit'
        />
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
