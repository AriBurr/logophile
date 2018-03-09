import React from 'react'
import { connect } from 'react-redux'
import { fetchUserClubs } from '../../actions/userClubs'
import { Link } from 'react-router-dom'
import { Segment, Grid, Card, Header } from 'semantic-ui-react';
import styled from 'styled-components'

const Container = styled.div`
  height: 85vh;
  .card{
    border: 1px solid black;
    border-radius: 0 !important;

    .right-top{

    }
    .right-bottom{
      background: #E4F1FE !important;
    }
  }
  .columns{
    padding: 0 !important;
  }
  .row-style{
    padding: 0 !important;
  }

`


class MyClubs extends React.Component {

  componentDidMount(){
    this.props.dispatch(fetchUserClubs())
  }

  mapUserClubs = () => {
    return this.props.userClubs.map(club => {
      return(
        <Grid.Column>
          <Link to={`/clubs/${club.id}`} key={club.id}>
          <Grid className='card' columns={2}>
              <Grid.Row stretched className='row-style'>
                <Grid.Column className='columns'>
                  <Segment basic>PLACEHOLDER IMAGE</Segment>
                </Grid.Column>
                <Grid.Column className='columns'>
                  <Header className='right-top'>{club.description}</Header>
                  <Segment basic className='right-bottom'>{ club.name }</Segment>
                </Grid.Column>
              </Grid.Row>
          </Grid>
        </Link>

        </Grid.Column>
      )
    })
  }


  render () {
    return(
      <Segment as={Container} basic className='container'>
        <Grid>
          <Grid.Row columns={2}>
            {this.mapUserClubs()}
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

const mapStateToProps = (state) => {
  return { userClubs:  state.userClubs}
}

export default connect(mapStateToProps)(MyClubs);
