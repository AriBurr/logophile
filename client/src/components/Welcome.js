import React from 'react';
import { Header, Image } from 'semantic-ui-react';
import styled from 'styled-components'
import landing from '../assets/landing.jpg'
import study from '../assets/study.svg'
import bookshelf from '../assets/bookshelf.svg'
import openbook from '../assets/open-book.svg'

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
  h1{
    font-size: 40px !important;
  }
  p{
    padding-top: 1%;
    font-weight: 800;
  }
  img{
    height: 100px;
    width: 100px;
    position: center;
    margin: 0 auto;
  }
`
const LogoContain = styled.div`
  border: 4px solid white;
  border-radius: 50%;
  padding: 2%;
`

const Logos = styled.div`
  padding-top: 7%;
  display: flex;
  justify-content: space-evenly;
`

const Transparent = styled.div`
  padding-top: 8%;
  background: rgba(40,75,99, 0.5);
  height: 100vh;
`

const Welcome = (props) => {
  return (
      <WelcomeWrapper>
        <Transparent>
          <Header as='h1'>Join a <em>community</em> of word lovers and book enthusiasts</Header>
          <Logos>
            <LogoContain>
              <Image src={bookshelf} alt="logo"></Image>
              <p>Organize your books</p>
            </LogoContain>
            <LogoContain>
              <Image src={openbook} alt="logo"></Image>
              <p>Search digital archive</p>
            </LogoContain>
            <LogoContain>
              <Image src={study} alt="logo"></Image>
              <p>Join the community</p>
            </LogoContain>
          </Logos>
        </Transparent>
      </WelcomeWrapper>
  )
}

export default Welcome;
