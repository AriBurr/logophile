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

export const fetchClubs = () => {
  return dispatch => {
    axios
      .get('/api/clubs/', setHeaders())
      .then(res => dispatch({ type: 'GET_CLUBS', clubs: res.data }))
      .catch(err =>
        setFlash('Could not retrieve clubs, please try again!', 'red')
      );
  };
};

export const fetchCurrentClub = id => {
  return dispatch => {
    axios
      .get(`/api/clubs/${id}`, setHeaders())
      .then(res => dispatch({ type: 'GET_CURRENT_CLUB', club: res.data }))
      .catch(err =>
        setFlash('Could not retrieve club, please try again!', 'red')
      );
  };
};

export const editClub = (id, club) => {
  return dispatch => {
    axios
      .put(`/api/clubs/${id}`, { club }, setHeaders())
      .then(res => {
        dispatch({ type: 'EDIT_CLUB', club: res.data });
        dispatch({ type: 'GET_CURRENT_CLUB', club: res.data });
      })
      .catch(err => setFlash('Could not edit club, please try again!', 'red'));
  };
};
