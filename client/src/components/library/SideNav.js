import React from 'react'
import { connect } from 'react-redux'
import { deleteBookshelf } from '../../actions/bookshelves';
import { fetchShelvings } from '../../actions/shelvings';
import { fetchShelf } from '../../actions/bookshelf';
import ShelfForm from './ShelfForm'
import { objectCheck } from '../../utils/modules'
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
  width: 16rem !important;
  padding: 5%;
`
const MenuStyle = styled(Menu)`
  color: white !important;
  font-size: 18px !important;
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

  componentWillReceiveProps = (nextProps) => {
    if(!objectCheck(this.state.activeItem)){
      if(nextProps.bookshelves.length > 0)
        this.handleItemClick(nextProps.bookshelves[0], 'allow')
    }
  }

  beforeFetchShelvings = (shelf, event = null) => {
    const { bookshelves, dispatch } = this.props;
    if(bookshelves.length > 0 || event === 'allow'){
      dispatch(fetchShelvings(shelf));
      dispatch(fetchShelf(shelf));
    }
  }

  toggleEdit = () => {
    const { edit } = this.state;
    this.setState({ edit: !edit })
  }

  handleItemClick = (shelf , e = null) => {
    this.beforeFetchShelvings(shelf, e)
    this.setState({ activeItem: shelf });
  }

  handleClick = (shelf) => {
    this.state.editing && this.handleItemClick(shelf)
  }

  mapBookshelves = (activeItem) => {
    const { edit } = this.state;
    const { bookshelves, dispatch } = this.props

    return bookshelves.map( shelf => {
      return (
        <Menu.Item
          className='myMenu'
          as={MenuStyle}
          key={shelf.id}
          name={shelf.name}
          active={activeItem === shelf}
          onClick={() => !edit && this.handleItemClick(shelf)}
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
    bookshelf: state.bookshelf,
    bookshelves: state.bookshelves,
    shelvings: state.shelvings,
  }
}

export default connect(mapStateToProps)(SideNav);
