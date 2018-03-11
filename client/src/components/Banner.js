import React from 'react';
import SearchBar from './SearchBar';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #F8F9FD;
  height: 10vh;
`;

const Banner = ({ searchTerms }) => (
  <Wrapper>
    <SearchBar searchTerms={searchTerms} />
  </Wrapper>
);

export default Banner;
