import React from 'react'
import { Segment, Divider, Grid, Header, Button } from 'semantic-ui-react';


class MyClubs extends React.Component {

  mapUserClubs = () => {

  }


  render () {
    return(
      <Segment basic>
        <Grid>
          HORRAY
        </Grid>
      </Segment>
    )
  }
}

const mapStateToProps = (state) => {
  return { userClubs:  state.userClubs}
}

export default MyClubs;
