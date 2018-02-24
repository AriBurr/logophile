import React from 'react';
import bookshelf from '../assets/bookshelf.svg';
import landing from '../assets/landing.jpg';
import openbook from '../assets/open-book.svg';
import study from '../assets/study.svg';
import styled from 'styled-components';
import { Image } from 'semantic-ui-react';

const LogoContain = styled.div`
  border: 4px solid white;
  border-radius: 50%;
  padding: 2%;
`;
const Logos = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-top: 7%;
`;
const Transparent = styled.div`
  background: rgba(40, 75, 99, 0.5);
  height: 100vh;
  padding-top: 8%;
`;
const WelcomeWrapper = styled.div`
  background-image: url(${landing});
  background-position: center;
  background-size: cover;
  color: white !important;
  height: 100vh;
  width: 100%;
  margin: 0 auto !important;
  text-align: center;
  h1 {
    font-size: 40px;
  }
  h1,
  h2,
  h3 {
    color: white;
  }
  img {
    height: 100px;
    width: 100px;
    margin: 0 auto;
    position: center;
  }
  p {
    font-weight: 800;
    padding-top: 1%;
  }
`;

const Welcome = props => {
  return (
    <WelcomeWrapper>
      <Transparent>
        <h1>
          Join a <em>community</em> of word lovers and book enthusiasts
        </h1>
        <Logos>
          <LogoContain>
            <Image src={bookshelf} alt="logo" />
            <p>Organize your books</p>
          </LogoContain>
          <LogoContain>
            <Image src={openbook} alt="logo" />
            <p>Search digital archive</p>
          </LogoContain>
          <LogoContain>
            <Image src={study} alt="logo" />
            <p>Join the community</p>
          </LogoContain>
        </Logos>
      </Transparent>
    </WelcomeWrapper>
  );
};

export default Welcome;
