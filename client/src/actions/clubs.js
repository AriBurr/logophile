import axios from 'axios';
import { setFlash } from '../actions/flash';
import { setHeaders } from '../actions/headers';

export const addClub = club => {
  return dispatch => {
    axios
      .post('/api/clubs', { club }, setHeaders())
      .then(res => dispatch({ type: 'ADD_CLUB', club: res.data }))
      .catch(err =>
        dispatch(
          setFlash(`Could not create ${club.name}, please try again!`, 'red')
        )
      );
  };
};
