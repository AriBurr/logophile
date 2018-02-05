import React from 'react';
import { connect } from 'react-redux';
import SideNav from './SideNav';
import Bookshelf from './Bookshelf';
import { Grid, Segment } from 'semantic-ui-react';

class Library extends React.Component {

  render() {
    const { shelvings } = this.props;
    return (
      <Grid>
        <Grid.Column width={3}>
          <SideNav />
        </Grid.Column>
        <Grid.Column width={13}>
          { shelvings && <Bookshelf /> }
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    shelvings: state.shelvings,
   }
}

export default connect(mapStateToProps)(Library);
