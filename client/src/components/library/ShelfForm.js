import React from 'react';
import PropTypes from 'prop-types';
import { addBookshelf } from '../../actions/bookshelves';
import { Menu, Form, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';


class ShelfForm extends React.Component {
  state = { name: ''}

  handleSubmit = (e) => {
    e.preventDefault()
    const { name } = this.state
    const bookshelf = { name }
    this.props.dispatch(addBookshelf(bookshelf))
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  render () {
    const { name } = this.state
    return(
      <Menu.Item>
        <Form onSubmit={this.handleSubmit}>
          <Input
            onChange={this.handleChange}
            name='name'
            value={name}
            icon='book'
            placeholder='Create Bookshelf'
          />
        </Form>
      </Menu.Item>
    )
  }
}

export default connect()(ShelfForm);
