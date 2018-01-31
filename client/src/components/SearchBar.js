import React from 'react';
import {
  Button,
  Form,
  Segment,
} from 'semantic-ui-react';

class SearchBar extends React.Component {
  state = { term: '' }

  handleSubmit = () => {
    const { term } = this.state;
    this.props.onSearchTermChange(term);
    this.setState({ term: '' })
  }

  handleChange = (e) => { this.setState({ term: e.target.value }) }

  render () {
    const { term } = this.state;
    return (
      <Segment basic textAlign='center'>
        <Form onSubmit={ this.handleSubmit }>
          <Form.Input
            fluid
            focus
            value={term}
            onChange={ this.handleChange }
            placeholder='Search'
            >
          </Form.Input>
          <Button className='ui primary button' type='submit'>Submit</Button>
        </Form>
      </Segment>
    );
  }
}

export default SearchBar;
