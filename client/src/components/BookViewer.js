import React from 'react';
import styled from 'styled-components';

const EmbeddedViewer = styled.div`
  height: 500px;
  width: 600px;
`

class BookViewer extends React.Component {
  render () {
    return(
      <div id='viewerCanvas'style={{width: '600px', height: '500px'}}>
        
      </div>
    )
  }
}

export default BookViewer;
