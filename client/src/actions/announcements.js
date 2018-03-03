import axios from 'axios';
import { setFlash } from '../actions/flash';
import { setHeaders } from '../actions/headers';

export const fetchAnnouncement = () => {
  return dispatch => {
    axios
      .get('/api/announcements/', setHeaders())
      // .then(res => dispatch({ type: 'GET_CLUBS', clubs: res.data }))
      .catch(err =>
        setFlash('Could not retrieve announcement, please try again!', 'red')
      );
  };
};

export const editAnnouncement = (id, callback = {}) => {
  return dispatch => {
    axios
      .get(`/api/announcements/${id}`, setHeaders())
      .then(res => {
        dispatch({ type: 'GET_CURRENT_CLUB', announcement: res.data })
        callback()
      })
      .catch(err =>
        setFlash('Could not edit announcement, please try again!', 'red')
      );
  };
};
export const addAnnouncement = (id, callback = {}) => {
  return dispatch => {
    axios
      .post(`/api/announcements/`, setHeaders())
      .then(res => {
        dispatch({ type: 'SET_ANNOUNCEMENT', announcement: res.data })
        // callback()
      })
      .catch(err =>
        setFlash('Could not create announcement, please try again!', 'red')
      );
  };
};
