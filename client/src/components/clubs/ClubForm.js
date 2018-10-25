import React from 'react';
import { connect } from 'react-redux';
import { addClub, editClub } from '../../actions/clubs';
import styled from 'styled-components';
import { ButtonAction, ButtonWarning } from '../../styles/styles';
import { Form } from 'semantic-ui-react';

const Wrapper = styled.div`
  padding: 1%;
`;

class ClubForm extends React.Component {
  state = {
    name: '',
    description: '',
    nameEdit: this.props.club.name,
    descEdit: this.props.club.description
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, description, nameEdit, descEdit } = this.state;
    const { edit, dispatch, toggleEdit, user } = this.props;
    const club = { name, description };
    const clubEdit = { nameEdit, descEdit };
    this.setState({ name: '', description: '' });
    edit
      ? dispatch(editClub(this.props.club.id, clubEdit))
      : dispatch(addClub(user, club));
    edit && toggleEdit();
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { name, description, nameEdit, descEdit } = this.state;
    const { edit, toggleEdit } = this.props;
    return (
      <Wrapper>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            onChange={this.handleChange}
            name={edit ? 'nameEdit' : 'name'}
            value={edit ? nameEdit : name}
            placeholder="Club Name"
            width={12}
          />
          <Form.TextArea
            type="text"
            onChange={this.handleChange}
            name={edit ? 'descEdit' : 'description'}
            value={edit ? descEdit : description}
            placeholder="Club Description"
            width={12}
          />
          <ButtonAction type="submit">Submit</ButtonAction>
          {edit && (
            <ButtonWarning onClick={() => toggleEdit()}>Cancel</ButtonWarning>
          )}
        </Form>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return { club: state.currentClub, user: state.user };
};

export default connect(mapStateToProps)(ClubForm);
