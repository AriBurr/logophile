import React from 'react';
import {
  Button,
  Form,
  Segment,
} from 'semantic-ui-react';

class SearchBar extends React.Component {
  state = { title: '', author: '', ibsn: '' }

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, author, ibsn } = this.state;
    const terms = { title, author, ibsn }
    this.props.searchTerms(terms);
    this.setState({ title: '', author: '', ibsn: '' });
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render () {
    const { title, author, ibsn } = this.state;
    return (
      <Segment basic textAlign='center'>
        <Form onSubmit={ this.handleSubmit }>
          <Form.Group widths='equal'>
            <Form.Input
              name='title'
              value={ title }
              onChange={ this.handleChange }
              placeholder='Title'
            >
            </Form.Input>
            <Form.Input
              name='author'
              value={ author }
              onChange={ this.handleChange }
              placeholder='Author'
            >
            </Form.Input>
            <Form.Input
              name='ibsn'
              value={ ibsn }
              onChange={ this.handleChange }
              placeholder='IBSN'
            >
            </Form.Input>
            <Button className='ui primary button' type='submit'>Submit</Button>
          </Form.Group>
        </Form>
      </Segment>
    );
  }
}

export default SearchBar;
