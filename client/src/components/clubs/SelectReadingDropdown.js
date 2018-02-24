import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ButtonStyle } from '../../styles/styles';
import { Button, Dropdown } from 'semantic-ui-react';

const DropdownStyle = styled.div`
  &&& {
    margin: 0 auto;
  }
`;

class SelectReadingDropdown extends React.Component {
  state = { club: '' };

  clubOptions = () => {
    const { clubs } = this.props;
    return clubs.map(shelf => {
      return { key: club.id, text: club.name, value: club.name };
    });
  };

  handleSelection = (e, { value }) => {
    this.setState({ club: value });
  };

  handleSubmit = () => {};

  render() {
    return (
      <DropdownStyle>
        <span>
          <Button as={ButtonStyle} onClick={() => this.handleSubmit()}>
            Select Club
          </Button>
          <Dropdown
            placeholder="Will Read"
            selection
            options={this.clubOptions()}
            onChange={this.handleSelection}
          />
        </span>
      </DropdownStyle>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(SelectReadingDropdown);
