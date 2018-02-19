import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Header, Segment } from 'semantic-ui-react';

const Wrapper = styled.div`
  padding: 1%;
`;

class Announcements extends React.Component {
  render() {
    return (
      <Wrapper>
        <Segment>
          <Header>Announcements</Header>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lorem
            ligula, facilisis vel sollicitudin sit amet, eleifend nec turpis.
            Integer ante ex, varius sit amet maximus quis, facilisis eu tellus. Nunc
            feugiat, tellus at maximus viverra, orci risus auctor dolor, a accumsan
            mauris sapien quis libero. Nam et rutrum tortor.
          </p>
        </Segment>
      </Wrapper>
    );
  }
}

export default connect()(Announcements);
