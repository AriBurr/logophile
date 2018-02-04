import React from 'react';
import SearchBar from './SearchBar';
import banner from '../assets/book-banner.jpg';
import styled from 'styled-components';

const Header = styled.div`
  background-image: url(${banner});
  background-size: cover;
  background-position: center;
  height: 30vh;
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
