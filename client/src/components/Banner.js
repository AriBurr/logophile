import React from 'react';
import SearchBar from './SearchBar';
import banner from '../assets/banner.png';
import styled from 'styled-components';
import {
  Container,
 } from 'semantic-ui-react';

const Header = styled.div`
  background-image: url(${banner});
  height: 50vh;
  width: 100%;
`

const Banner = ({ searchTerms }) => {
  return (
    <Header>
      <SearchBar searchTerms={searchTerms} />
    </Header>
  )
}

export default Banner;
