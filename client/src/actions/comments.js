import axios from 'axios';
import { setFlash } from '../actions/flash';
import { setHeaders } from '../actions/headers';

export const addComment = comment => {
  return dispatch => {
    axios
      .post(`/api/comments/`, { comment }, setHeaders())
      .then(res => dispatch({ type: 'ADD_COMMENT', comment: res.data }))
      .catch(err =>
        dispatch(
          setFlash(`Could not create comment topic, please try again!`, 'red')
        )
      );
  };
};

export const fetchComments = id => {
  return dispatch => {
    axios
      .get(`/api/comments?discussion_id=${id}`, setHeaders())
      .then(res => dispatch({ type: 'GET_COMMENT', comments: res.data }))
      .catch(err =>
        setFlash('Could not retrieve comment topics, please try again!', 'red')
      );
  };
};

export const editComment = (id, comment) => {
  return dispatch => {
    axios
      .put(`/api/comments/${id}`, { comment }, setHeaders())
      .then(res => {
        dispatch({ type: 'EDIT_COMMENT', comment: res.data });
        dispatch({ type: 'GET_COMMENT', comment: res.data });
      })
      .catch(err =>
        setFlash('Could not edit comment topic, please try again!', 'red')
      );
  };
};

export const deleteComment = comment => {
  return dispatch => {
    axios
      .delete(`/api/comments/${comment.id}`, setHeaders())
      .then(() => {
        dispatch({ type: 'DELETE_COMMENT', comment });
      })
      .catch(err =>
        setFlash('Could not delete comment topic, please try again!', 'red')
      );
  };
};
