import axios from 'axios';
import { setHeaders } from '../actions/headers';
import { setFlash } from '../actions/flash';

export const addReading = (club, reading) => {
  return dispatch => {
    axios
      .post(
        `/api/readings`,
        { club_id: club.id, book_id: reading.id },
        setHeaders()
      )
      .then(res => dispatch(setFlash(`Added reading!`, 'green')))
      .catch(err => dispatch(setFlash(`Could not add reading!`, 'red')));
  };
};

export const fetchReadings = id => {
  return dispatch => {
    axios
      .get(`/api/readings?club_id=${id}`, setHeaders())
      .then(res => dispatch({ type: 'GET_READINGS', readings: res.data }))
      .catch(err => dispatch(setFlash('Could not fetch readings!', 'red')));
  };
};
