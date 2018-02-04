import React from 'react';
import {
  Button,
  Form,
  Segment,
} from 'semantic-ui-react';
import styled from 'styled-components'

const Container = styled.div`
  max-width: 75%;
  margin: 0 auto;
  text-align: center;
`
const FormInput = styled(Form.Input)`
  max-width: 20% !important;
`

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
      <Segment as={Container} basic>
        <Form onSubmit={ this.handleSubmit }>
          <Form.Group widths='equal'>
            <Form.Input
              as={FormInput}
              name='title'
              value={ title }
              onChange={ this.handleChange }
              placeholder='Title'
            >
            </Form.Input>
            <Form.Input
              as={FormInput}
              name='author'
              value={ author }
              onChange={ this.handleChange }
              placeholder='Author'
            >
            </Form.Input>
            <Form.Input
              as={FormInput}
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
