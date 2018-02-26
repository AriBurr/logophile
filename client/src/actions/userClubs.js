import axios from 'axios'
import { setFlash } from '../actions/flash';
import { setHeaders } from '../actions/headers';

export const joinClub = club => {
  return dispatch => {
    axios
      .post('/api/memberships', { membership: { club_id: club } }, setHeaders())
      .then(res => {
        dispatch(setFlash('Club successfully joined', 'green'));
      })
      .catch(err => {
        dispatch(setFlash('Could not join this club', 'red'));
      });
  };
};

export const fetchUserClubs = () => {
  return dispatch => {
    axios
      .get(`/api/clubs/find_user_clubs`, setHeaders())
      .then(res => {
        debugger
        dispatch({ type: 'GET_USER_CLUBS', userClubs: res.data })
      })
      .catch(err =>
        setFlash('Could not retrieve user bookclubs, please try again!', 'red')
      );
  };
};
