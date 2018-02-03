import React from 'react';
import axios from 'axios';
import { setFlash } from '../actions/flash';
import { setHeaders } from '../actions/headers';
import { fetchUser } from '../actions/user';


const login = user => {
  return { type: 'LOGIN', user };
};

const logout = () => {
  return { type: 'LOGOUT' };
};

const storeToken = (token) => {
  localStorage.setItem('userToken', token);
}

export const registerUser = (email, password, passwordConfirmation, history, name) => {
  return dispatch => {
    axios.post('/api/users', {user: { email: email, password: password, password_confirmation: passwordConfirmation, name: name }})
      .then(res => {
        const { headers } = res;

        dispatch(handleLogin(email, password, history))
      })
      .catch(res => {
        const messages =
          res.response.data.errors.map(message =>
            <div>{message}</div>);
        const { headers } = res;
        dispatch(setFlash(messages, 'red'));
      });
  };
};

export const handleLogout = (user, history) => {
  return dispatch => {
    axios.delete('/api/logout.json', { headers: { Authorization: `Token token=${user.token}`} })
      .then(res => {
        const { headers } = res;
        dispatch(logout());
        storeToken('')
        dispatch(setFlash('Logged out successfully!', 'green'));
        history.push('/login');
      })
      .catch(res => {
        // const messages =
        //   res.response.data.errors.map(message =>
        //     <div>{message}</div>);
        // const { headers } = res;
        // dispatch(setHeaders(headers));
        dispatch(setFlash('No Users logged in.', 'red'));
      });
  };
};

export const handleLogin = (email, password, history) => {
  return dispatch => {
    axios.post('/api/login.json', { email, password })
      .then(res => {
        const { headers, data } = res;
        storeToken(data.token)
        dispatch(login(data));
        history.push('/');
      })
      .catch(res => {
        const messages =
          res.response.data.errors.map(message =>
            <div>{message}</div>);
        const { headers } = res;
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
