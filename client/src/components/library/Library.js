import React from 'react'
import styled from 'styled-components'
import SideNav from './SideNav'
import { Segment } from 'semantic-ui-react'

class Library extends React.Component {
  render(){
    return(
      <div>
        <SideNav />
        <div id='viewerCanvas'style={{width: '600px', height: '500px'}}>
        </div>
      </div>
    )
  }
}

export default Library;
