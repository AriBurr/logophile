import axios from 'axios';
import { setHeaders } from '../actions/headers';
import { setFlash } from '../actions/flash';

export const addBook = (book, shelf) => {
  return dispatch => {
    axios.post(`/api/books`, { book: {item: book} }, setHeaders() )
      .then( res => {
        debugger
        const shelfId = shelf.id;
        const bookId = res.data.id;
        axios.post(`api/shelf/${shelfId}/book/${bookId}`, { data: shelfId, bookId } , setHeaders() )
        .then( res => {
          debugger
          dispatch(setFlash(`Added "${book.volumeInfo.title}" to your ${shelf.name} bookshelf!`, 'green'))
        })
        .catch( err => dispatch(setFlash(`Invalid entry, please try again!`, 'red')));
      })
      .catch( err => {
        debugger
        dispatch(setFlash(`Invalid entry, please try again!`, 'red'));

      })
  }
}

export const fetchShelvings = (shelf) => {
  return dispatch => {
    axios.get(`/api/shelf/${shelf.id}/books`, setHeaders() )
      .then(res => dispatch({type: 'FETCH_SHELVING', shelvings: res.data }))
      .catch( err => dispatch(setFlash(`Error fetching books, please try again!`, 'red')));
  }
}

export const deleteShelving = (shelving) => {
  return (dispatch) => {
    axios.delete(`/api/books/${shelving.id}`, setHeaders() )
      .then( () => dispatch({ type: 'DELETE_SHELVING', shelving }) )
  }
}
