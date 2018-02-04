import axios from 'axios';
import { setFlash } from '../actions/flash';
import { setHeaders } from '../actions/headers'

export const addBookshelf = (bookshelf) => {
  return dispatch => {
    axios.post('/api/bookshelves', { bookshelf }, setHeaders() )
      .then( res => {
        dispatch({ type: 'ADD_BOOKSHELF', bookshelf: res.data })

      })
      .catch( err => dispatch(setFlash(`Trouble creating ${bookshelf.name}`, 'red')));
  }
}
//
export const fetchBookshelves = () => {
  return dispatch => {
    axios.get('/api/bookshelves/', setHeaders())
    .then( res => {
      dispatch({type: 'GET_BOOKSHELVES', bookshelves: res.data})
    })
    .catch( err => setFlash('Troubles retreiving bookshelves', 'red'))
  }
}