import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Header, Segment } from 'semantic-ui-react';
import { fetchAnnouncement } from '../../actions/announcements';
import { withRouter } from 'react-router-dom';



const Wrapper = styled.div`
  padding: 1%;
`;

class Announcements extends React.Component {

  componentDidMount(){
    const clubId = parseInt(this.props.match.params.id)
    this.props.dispatch(fetchAnnouncement(clubId))
  }

  render() {
    return (
      <Wrapper>
        <Segment>
          <Header>Announcements</Header>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            lorem ligula, facilisis vel sollicitudin sit amet, eleifend nec
            turpis. Integer ante ex, varius sit amet maximus quis, facilisis eu
            tellus. Nunc feugiat, tellus at maximus viverra, orci risus auctor
            dolor, a accumsan mauris sapien quis libero. Nam et rutrum tortor.
          </p>
        </Segment>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return { club: state.currentClub };
};

export default withRouter(connect(mapStateToProps)(Announcements));
