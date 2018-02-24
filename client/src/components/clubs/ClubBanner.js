import React from 'react';
import banner from '../../assets/book-banner.jpg';
import styled from 'styled-components';

const Header = styled.div`
  background-image: url(${banner});
  background-size: cover;
  background-position: center;
  height: 200px;
  width: 100%;
`;

const Banner = () => <Header />;

export default Banner;
