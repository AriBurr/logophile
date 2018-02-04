import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Segment } from 'semantic-ui-react';
import styled from 'styled-components'

export const FooterStyled = styled.div`
  flex-shrink: 0;
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: #424242
`;

const Footer = (props) => (
  <FooterStyled>
    <Segment style={styles.footer} attached='top'>
      <Grid columns={2}>
        <Grid.Column textAlign='left'>
          <h5 style={styles.text}>
            <i style={{fontWeight: '300'}}>
              Designed by
              <a href='https://github.com/AriBurr'> Ariel </a>
              &
              <a href='https://github.com/cgregs32'> Chris </a>
            </i>
          </h5>
        </Grid.Column>
        <Grid.Column textAlign='right'>
          <a href='https://github.com/AriBurr/logophile' style={styles.leftNav}>
            <h5 style={{fontWeight: '300'}}>
              Source Code
            </h5>
          </a>
        </Grid.Column>
      </Grid>
    </Segment>
  </FooterStyled>
)

const styles = {
  footer: {
    backgroundColor: '#424242',
    position: 'relative',
    border: 'none',
  },
  container: {
    padding: '0',
  },
  text: {
    color: 'white',
  },
  leftNav: {
    display: 'inline-block',
    color: 'white',
  },
  icons: {
    display: 'inline-block',
  },
}


export default Footer;
