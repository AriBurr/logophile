import React from 'react';
import { Header } from 'semantic-ui-react';
import styled from 'styled-components'
import landing from '../assets/landing.jpg'

const WelcomeWrapper = styled.div`
  width: 100%;
  height: 100vh;
  text-align: center;
  margin: 0 auto !important;
  background-image: url(${landing});
  background-size: cover;
  background-position: center;
  color: white !important;
  h1,h2,h3{
    color: white !important;
  }
`

const Transparent = styled.div`

  background: rgba(40,75,99, 0.5);
  height: 100vh;
`

const Welcome = (props) => {
  return (
      <WelcomeWrapper>
        <Transparent>
          <Header as='h1'>Join the community of word lovers and book enthusiasts</Header>
          <Header as="h2">Keep track of your book archives </Header>
        </Transparent>
      </WelcomeWrapper>
  )
}

export default Welcome;
