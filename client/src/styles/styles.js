import styled from 'styled-components';
import {
  Button,
} from 'semantic-ui-react';

export const ButtonAction = styled(Button)`
  &&& {
    background-color: #93B7BE !important;
    color: white !important;
    cursor: pointer;
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
      &:hover {
        background-color: rgba(147, 183, 190, .75) !important;
        color: white;
      }
  }
`
export const ButtonWarning = styled(Button)`
  &&& {
    background-color: #DF2935;
    color: white;
    cursor: pointer;
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
      &:hover {
        background-color: rgba(223, 41, 53, .75);
        color: white;
      }
  }
`
