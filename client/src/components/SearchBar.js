import React from 'react';
import styled from 'styled-components';
import { ButtonAction } from '../styles/styles';
import { Form, Segment } from 'semantic-ui-react';

const FormContainer = styled(Form)`
  margin: 0 auto;
  width: 60%;
  text-align: center;
  position: relative;
`;

class SearchBar extends React.Component {
  state = { title: '', author: '', ibsn: '' };

  handleSubmit = e => {
    e.preventDefault();
    const { title, author, ibsn } = this.state;
    const terms = { title, author, ibsn };
    this.props.searchTerms(terms);
    this.setState({ title: '', author: '', ibsn: '' });
  };

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { title, author, ibsn } = this.state;
    return (
      <Segment basic>
        <FormContainer onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              name="title"
              value={title}
              onChange={this.handleChange}
              placeholder="Title"
            />
            <Form.Input
              name="author"
              value={author}
              onChange={this.handleChange}
              placeholder="Author"
            />
            <Form.Input
              name="ibsn"
              value={ibsn}
              onChange={this.handleChange}
              placeholder="IBSN"
            />
            <ButtonAction type="submit">Submit</ButtonAction>
          </Form.Group>
        </FormContainer>
      </Segment>
    );
  }
}

export default SearchBar;
