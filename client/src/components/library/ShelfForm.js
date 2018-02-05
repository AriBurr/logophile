import React from 'react';
import { connect } from 'react-redux';
import { objectCheck } from '../../utils/modules';
import { addBookshelf } from '../../actions/bookshelves';
import { editBookshelf } from '../../actions/bookshelves';
import { Menu, Form, Icon, Input } from 'semantic-ui-react';
import styled from 'styled-components';

const IconStyle = styled(Icon)`
  color: white !important;
  padding: 5%;
`

class ShelfForm extends React.Component {
  state = { name: '' }

  handleSubmit = (e) => {
    e.preventDefault()
    const { name } = this.state
    const { active, dispatch, edit } = this.props
    const bookshelf = { name }
    this.setState({ name: '' })
    edit ? dispatch(editBookshelf(active.id, bookshelf)) : dispatch(addBookshelf(bookshelf))
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  render () {
    const { name } = this.state
    const { active, edit } = this.props
    return(
      <Menu.Item>
        <Form onSubmit={this.handleSubmit}>
          <Input
            onChange={this.handleChange}
            name='name'
            value={name}
            icon='plus'
            placeholder={
              edit && !objectCheck(active) ? 'Select Bookshelf' :
              edit && objectCheck(active) ? `Edit ${active.name}` : 'Create Bookshelf' }
          />
          <Icon
            as={IconStyle}
            size='large'
            onClick={ () => this.props.toggleEdit() }
            name='edit'>
          </Icon>
        </Form>
      </Menu.Item>
    )
  }
}

export default connect()(ShelfForm);
