import React from 'react';
import styled from 'styled-components';

const EmbeddedViewer = styled.div`
  height: 500px;
  width: 600px;
`

const BookViewer = () => (

  <div id='viewerCanvas'style={{width: '600px', height: '500px'}}></div>

)

export default BookViewer;
