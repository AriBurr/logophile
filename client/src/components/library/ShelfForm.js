import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Form, Input } from 'semantic-ui-react'


class ShelfForm extends React.Component {
  state = { bookshelf: ''}

  handleSubmit = () => {

  }

  handleChange = () => {

  }

  render () {
    return(
      <Menu.Item>
        <Form onSumbit={this.handleSubmit}>
          <Input onChange={this.handleChange} name='bookshelf' icon='book' placeholder='Create Bookshelf' />
        </Form>
      </Menu.Item>
    )
  }
}

export default ShelfForm;
