import axios from 'axios';
import { setFlash } from '../actions/flash';
import { setHeaders } from '../actions/headers'

export const addBookshelf = (bookshelf) => {
  return dispatch => {
    axios.post('/api/bookshelves', { bookshelf }, setHeaders() )
      .then( res => {
        debugger
        dispatch({ type: 'ADD_BOOKSHELF', bookshelf: res.data })
      })
      .catch( err => {
        debugger
        dispatch(setFlash(`Trouble creating ${bookshelf.name}`, 'red'))
      });
  }
}
