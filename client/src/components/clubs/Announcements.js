import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Header, Segment, Button } from 'semantic-ui-react';
import { fetchAnnouncement } from '../../actions/announcements';
import { withRouter } from 'react-router-dom';

const Wrapper = styled.div`
  padding: 1%;
`;

class Announcements extends React.Component {
  componentDidMount() {
    const clubId = parseInt(this.props.match.params.id, 10);
    this.props.dispatch(fetchAnnouncement(clubId));
  }

  render() {
    const { announcement, isModerator, toggleEdit } = this.props;
    return (
      <Wrapper>
        <Segment>
          <Header>Announcements</Header>
          <p>{announcement.body}</p>
          {isModerator && <Button onClick={() => toggleEdit()}>Edit</Button>}
        </Segment>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return { announcement: state.announcement };
};

export default withRouter(connect(mapStateToProps)(Announcements));
