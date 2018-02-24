import React from 'react';
import { connect } from 'react-redux';
import { objectCheck } from '../../utils/modules';
import { deleteBookshelf } from '../../actions/bookshelves';
import { fetchShelf } from '../../actions/bookshelf';
import { fetchShelvings } from '../../actions/shelvings';
import ShelfForm from './ShelfForm';
import bookshelf from '../../assets/bookshelf-component.svg';
import styled from 'styled-components';
import { Icon, Label, Menu } from 'semantic-ui-react';

const EnlargeMenu = styled(Menu.Item)`
  &&& {
    color: white;
    background-color: #35596b !important;
    border: none;
    border-radius: 0px;
    box-shadow: none;
    width: 16rem !important;
    height: 100vh;
    padding: 5%;
    #MenuStyle {
      padding-left: 14px !important;
    }
  }
`;
const IconStyle = styled(Icon)`
  color: white;
  padding: 5%;
`;
const LabelStyle = styled(Label)`
  margin-right: 7% !important;
`;
const Image = styled.img`
  height: 175px;
  width: 175px;
`;
const MenuStyle = styled(Menu)`
  &&& {
    height: auto;
    color: white !important;
    font-size: 18px;
    text-align: left !important;
  }
`;

class SideNav extends React.Component {
  state = {
    activeItem: {},
    edit: false
  };

  componentWillReceiveProps = nextProps => {
    if (!objectCheck(this.state.activeItem)) {
      if (nextProps.bookshelves.length > 0)
        this.handleItemClick(nextProps.bookshelves[0], 'allow');
    }
  };

  beforeFetchShelvings = (shelf, event = null) => {
    const { bookshelves, dispatch } = this.props;
    if (bookshelves.length > 0 || event === 'allow') {
      dispatch(fetchShelvings(shelf));
      dispatch(fetchShelf(shelf));
    }
  };

  toggleEdit = () => {
    const { edit } = this.state;
    this.setState({ edit: !edit });
  };

  handleItemClick = (shelf, e = null) => {
    this.beforeFetchShelvings(shelf, e);
    this.setState({ activeItem: shelf });
  };

  handleClick = shelf => {
    this.state.editing && this.handleItemClick(shelf);
  };

  handleDelete = shelf => {
    const { dispatch } = this.props;
    dispatch(deleteBookshelf(shelf));
    dispatch({ type: 'CLEAR_SHELVINGS' });
  };

  mapBookshelves = activeItem => {
    const { edit } = this.state;
    const { bookshelves } = this.props;

    return bookshelves.map(shelf => {
      return (
        <Menu.Item
          id="MenuStyle"
          as={MenuStyle}
          key={shelf.id}
          name={shelf.name}
          active={activeItem === shelf}
          onClick={() => !edit && this.handleItemClick(shelf)}
        >
          <Label as={LabelStyle} color="yellow">
            {shelf.book_count}
          </Label>
          {shelf.name}
          {edit && (
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Icon
                size="tiny"
                circular
                inverted
                onClick={() => this.handleDelete(shelf)}
                name="trash"
              />
              <Icon
                size="tiny"
                circular
                inverted
                onClick={() => this.handleItemClick(shelf)}
                name="pencil"
              />
            </span>
          )}
        </Menu.Item>
      );
    });
  };

  render() {
    const { edit, activeItem } = this.state;
    return (
      <Menu vertical as={EnlargeMenu}>
        <Image src={bookshelf} />
        <ShelfForm theme="yes" edit={edit} active={activeItem} />
        {this.mapBookshelves(activeItem)}
        <Icon
          as={IconStyle}
          size="large"
          onClick={() => this.toggleEdit()}
          name="edit"
        />
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return {
    bookshelf: state.bookshelf,
    bookshelves: state.bookshelves,
    shelvings: state.shelvings
  };
};

export default connect(mapStateToProps)(SideNav);
