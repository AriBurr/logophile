import axios from 'axios';
import { setFlash } from '../actions/flash';
import { setHeaders } from '../actions/headers';

export const addDiscussion = (discussion, reading) => {
  debugger
  return dispatch => {
    axios
      .post(`/api/discussions?reading_id=${reading.id}`, { discussion }, setHeaders())
      .then(res => dispatch({ type: 'ADD_DISCUSSION', discussion: res.data }))
      .catch(err =>
        dispatch(
          setFlash(
            `Could not create discussion topic, please try again!`,
            'red'
          )
        )
      );
  };
};

export const fetchDiscussion = () => {
  return dispatch => {
    axios
      .get('/api/discussions/', setHeaders())
      .then(res => dispatch({ type: 'GET_DISCUSSION', discussion: res.data }))
      .catch(err =>
        setFlash(
          'Could not retrieve discussion topics, please try again!',
          'red'
        )
      );
  };
};

export const editDiscussion = (id, discussion) => {
  return dispatch => {
    axios
      .put(`/api/discussions/${id}`, { discussion }, setHeaders())
      .then(res => {
        dispatch({ type: 'EDIT_DISCUSSION', discussion: res.data });
        dispatch({ type: 'GET_DISCUSSION', discussion: res.data });
      })
      .catch(err =>
        setFlash('Could not edit discussion topic, please try again!', 'red')
      );
  };
};

export const deleteDiscussion = discussion => {
  return dispatch => {
    axios
      .delete(`/api/discussions/${discussion.id}`, setHeaders())
      .then(() => {
        dispatch({ type: 'DELETE_DISCUSSION', discussion });
      })
      .catch(err =>
        setFlash('Could not delete discussion topic, please try again!', 'red')
      );
  };
};
