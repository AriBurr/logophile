import axios from 'axios';
import { setFlash } from '../actions/flash';


export const fetchUser = (token) => {
  return dispatch => {
    axios.get(`/api/users/find`, { headers: { Authorization: `Token token=${token}`} })
      .then(res => {
        dispatch({ type: 'LOGIN', user: res.data, headers: res.headers})
      })
      .catch(res => {
        dispatch(setFlash('Trouble fetching user.', 'red'));
      });
  };
};
