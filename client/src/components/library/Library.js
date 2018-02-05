import React from 'react';
import { connect } from 'react-redux';
import SideNav from './SideNav';

class Library extends React.Component {
  render() {
    return (
      <div>
        <SideNav />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { shelvings: state.shelvings }
}

export default connect(mapStateToProps)(Library);
