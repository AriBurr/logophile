import axios from 'axios';
import { setHeaders } from './headers';
import { setFlash } from './flash';

export const addRating = (value, bookId) => {
  return dispatch => {
    axios
      .post('/api/ratings', { value, book_id: bookId }, setHeaders())
      .then(res => dispatch(setFlash('Thanks for the review!', 'green')))
      .catch(res => dispatch(setFlash('Error with your review', 'red')));
  };
};
