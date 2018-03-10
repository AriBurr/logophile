import React from 'react';
import SearchBar from './SearchBar';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #f8f9fd;
  height: 10vh;
`;

const Banner = ({ searchTerms }) => (
  <Wrapper>
    <SearchBar searchTerms={searchTerms} />
  </Wrapper>
);

export default Banner;
