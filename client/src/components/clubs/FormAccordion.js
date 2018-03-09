import React from 'react';
import ClubForm from './ClubForm';
import { Accordion, Icon } from 'semantic-ui-react';

class FormAccordion extends React.Component {
  state = { activeIndex: -1 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;
    return (
      <Accordion>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={this.handleClick}
        >
          <Icon name="plus" />
          Add a Book Club
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <ClubForm />
        </Accordion.Content>
      </Accordion>
    );
  }
}

export default FormAccordion;
