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

const storeToken = (token) => {
  localStorage.setItem('userToken', token);
}

export const registerUser = (email, password, passwordConfirmation, history, name) => {
  return dispatch => {
    axios.post('/api/users', {user: { email: email, password: password, password_confirmation: passwordConfirmation, name: name }})
      .then(res => {

        dispatch(handleLogin(email, password, history))
      })
      .catch(res => {
        const messages =
          res.response.data.errors.map(message =>
            <div>{message}</div>);
        dispatch(setFlash(messages, 'red'));
      });
  };
};

export const handleLogout = (user, history) => {
  return dispatch => {
    axios.delete('/api/logout.json', setHeaders())
      .then(res => {
        dispatch(logout());
        storeToken('')
        dispatch(setFlash('Logged out successfully!', 'green'));
        history.push('/login');
      })
      .catch(res => {
        dispatch(setFlash('No Users logged in.', 'red'));
      });
  };
};

export const handleLogin = (email, password, history) => {
  return dispatch => {
    axios.post('/api/login.json', { email, password })
      .then(res => {
        const { data } = res;
        storeToken(data.token)
        dispatch(login(data));
        history.push('/');
      })
      .catch(res => {
        dispatch(setFlash('There was an issue with your login', 'red'));
      });
  };
};
