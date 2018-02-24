import React from 'react';
import { connect } from 'react-redux';
import Bookshelf from './Bookshelf';
import SideNav from './SideNav';
import { Grid } from 'semantic-ui-react';

const Library = ({ shelvings }) => (
  <Grid>
    <Grid.Column mobile="16" tablet="5" computer="4" largeScreen="3" width={3}>
      <SideNav />
    </Grid.Column>
    <Grid.Column
      mobile="16"
      tablet="11"
      computer="12"
      largeScreen="13"
      width={13}
    >
      {shelvings && <Bookshelf />}
    </Grid.Column>
  </Grid>
);

const mapStateToProps = state => {
  return { shelvings: state.shelvings };
};

export default connect(mapStateToProps)(Library);
