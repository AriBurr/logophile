import React from 'react';
import axios from 'axios';
import { setFlash } from '../actions/flash';
import { setHeaders } from '../actions/headers';

const login = user => {
  return { type: 'LOGIN', user };
};

const logout = () => {
  return { type: 'LOGOUT' };
};

export const registerUser = (email, password, passwordConfirmation, history, name) => {
  return dispatch => {
    axios.post('/api/users', {user: { email: email, password: password, password_confirmation: passwordConfirmation, name: name }})
      .then(res => {
        const { headers } = res;

        dispatch(setHeaders(headers));
        dispatch(handleLogin(email, password, history))
        // history.push('/');
      })
      .catch(res => {
        const messages =
          res.response.data.errors.map(message =>
            <div>{message}</div>);
        const { headers } = res;
        dispatch(setHeaders(headers));
        dispatch(setFlash(messages, 'red'));
      });
  };
};

export const handleLogout = (user, history) => {
  return dispatch => {
    axios.delete('/api/logout.json', { headers: { Authorization: `Token token=${user.token}`} })
      .then(res => {
        const { headers } = res;
        dispatch(setHeaders(headers));
        dispatch(logout());
        dispatch(setFlash('Logged out successfully!', 'green'));
        history.push('/login');
      })
      .catch(res => {
        const messages =
          res.response.data.errors.map(message =>
            <div>{message}</div>);
        const { headers } = res;
        dispatch(setHeaders(headers));
        dispatch(setFlash(messages, 'red'));
      });
  };
};

export const handleLogin = (email, password, history) => {
  return dispatch => {
    axios.post('/api/login.json', { email, password })
      .then(res => {
        const { headers } = res;
        dispatch(setHeaders(headers));
        debugger
        dispatch(login(res.data));
        history.push('/');
      })
      .catch(res => {
        const messages =
          res.response.data.errors.map(message =>
            <div>{message}</div>);
        const { headers } = res;
        dispatch(setHeaders(headers));
        dispatch(setFlash(messages, 'red'));
      });
  };
};

// export const validateToken = (callBack = () => {}) => {
//   return dispatch => {
//     dispatch({ type: 'VALIDATE_TOKEN' });
//     const headers = axios.defaults.headers.common;
//     axios.get('/api/auth/validate_token', headers)
//       .then(res => {
//         const user = res.data.data;
//         // dispatch(setHeaders(res.headers));
//         dispatch(login(user));
//       })
//       .catch(() => callBack());
//   };
// };
