import React from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from '../../actions/shelvings';
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

export default connect()(Library);
