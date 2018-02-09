import React from 'react';
import { connect } from 'react-redux';
import Bookshelf from './Bookshelf';
import SideNav from './SideNav';
import { Grid } from 'semantic-ui-react';

const Library = ({ shelvings }) => (
  <Grid>
    <Grid.Column width={3}>
      <SideNav />
    </Grid.Column>
    <Grid.Column width={13}>
      { shelvings && <Bookshelf /> }
    </Grid.Column>
  </Grid>
)

const mapStateToProps = (state) => {
  return { shelvings: state.shelvings }
}

export default connect(mapStateToProps)(Library);
