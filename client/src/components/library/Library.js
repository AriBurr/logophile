import React from 'react';
import { connect } from 'react-redux';
import { fetchShelvings } from '../../actions/shelvings';
import SideNav from './SideNav';
import Bookshelf from './Bookshelf';
import { Grid } from 'semantic-ui-react';

class Library extends React.Component {

  render() {
    const { shelvings } = this.props;
    return (
      <Grid>
        <Grid.Column width={4}>
          <SideNav />
        </Grid.Column>
        <Grid.Column width={12}>
          { shelvings && <Bookshelf /> }
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return { shelvings: state.shelvings }
}

export default connect(mapStateToProps)(Library);
