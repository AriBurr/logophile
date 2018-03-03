import axios from 'axios';
import { setHeaders } from '../actions/headers';
import { setFlash } from '../actions/flash';

export const addReading = (club, reading, start, end) => {
  return dispatch => {
    axios
      .post(
        `/api/readings`,
        {
          club_id: club.id,
          book_id: reading.id,
          start_date: start._d,
          finish_date: end._d
        },
        setHeaders()
      )
      .then(res => dispatch(fetchReadings(club.id)))
      .catch(err => dispatch(setFlash(`Could not add reading!`, 'red')));
  };
};

export const fetchReadings = id => {
  return dispatch => {
    axios
      .get(`/api/readings?club_id=${id}`, setHeaders())
      .then(res => {
        dispatch({ type: 'GET_READINGS', readings: res.data });
      })
      .catch(err => dispatch(setFlash('Could not fetch readings!', 'red')));
  };
};
