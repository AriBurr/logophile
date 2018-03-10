import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchAnnouncement } from '../../actions/announcements';
import styled from 'styled-components';
import { ButtonAction } from '../../styles/styles';
import { Header, Segment } from 'semantic-ui-react';

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
          {isModerator && (
            <ButtonAction onClick={() => toggleEdit()}>Edit</ButtonAction>
          )}
        </Segment>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return { announcement: state.announcement };
};

export default withRouter(connect(mapStateToProps)(Announcements));
