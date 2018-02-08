import styled from 'styled-components';
import {
  Button,
} from 'semantic-ui-react';

export const ButtonStyle = styled(Button)`
  &&& {
    background-color: #FFD400;
    color: white;
    cursor: pointer;
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
      &:hover {
        background-color: #223843;
        color: white;
      }
  }
`
