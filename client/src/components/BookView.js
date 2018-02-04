import React from 'react';
import { connect } from 'react-redux';

class BookView extends React.Component {

  render() {
    return (
      <div>
        Book View
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return { book: state.activeBook }
}

export default connect(mapStateToProps)(BookView);
