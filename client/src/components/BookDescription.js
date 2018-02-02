import React from 'react';
import { connect } from 'react-redux';
import noCover from '../assets/default.jpg';
import styled from 'styled-components';
import {
  Grid,
 } from 'semantic-ui-react';

const Image = styled.img`
  height: 198px;
  width: 128px;
`

class BookDescription extends React.Component {

  render () {
    const { book } = this.props;
    return (
      <Grid>
        <Grid.Row>
          { book.volumeInfo.imageLinks ?
            <Image
              src={ book.volumeInfo.imageLinks.thumbnail }
              alt={`${book.volumeInfo.title} cover`}
            /> :
            <Image
              src={ noCover }
              alt={`${book.volumeInfo.title} cover`}
            />
          }
        </Grid.Row>
        <Grid.Row>
          { book.volumeInfo.description }
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return { books: state.books }
}

export default connect(mapStateToProps)(BookDescription);
