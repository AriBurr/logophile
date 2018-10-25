import axios from 'axios';
import { setFlash } from '../actions/flash';
import { setHeaders } from '../actions/headers';

export const fetchAnnouncement = clubId => {
  return dispatch => {
    axios
      .get(`/api/announcements?club_id=${clubId}`, setHeaders())
      .then(res =>
        dispatch({ type: 'ADD_ANNOUNCEMENT', announcement: res.data })
      )
      .catch(err =>
        setFlash('Could not retrieve announcement, please try again!', 'red')
      );
  };
};

export const editAnnouncement = (id, { body }) => {
  return dispatch => {
    axios
      .put(`/api/announcements/${id}`, { announcement: { body } }, setHeaders())
      .then(res => {
        dispatch({ type: 'EDIT_ANNOUNCEMENT', announcement: res.data });
      })
      .catch(err =>
        setFlash('Could not edit announcement, please try again!', 'red')
      );
  };
};
