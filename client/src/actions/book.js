import axios from 'axios';
import { setHeaders } from '../actions/headers';
import { setFlash } from '../actions/flash';

export const addBook = (book, bookshelf) => {
  return dispatch => {
    axios.post(`/api/books`, { book: {item: book} }, setHeaders() )
      .then( res => {
        const bookId = res.data.id;
        addShelf(bookshelf.id, bookId)
      })
      .catch( err => dispatch(setFlash(`Error`, 'red')));
  }
}

export const addShelf = (shelfId, bookId) => {
  axios.post(`api/shelf/${shelfId}/add`, { data: shelfId, bookId } , setHeaders() )
    .then( res => {
      debugger
    })
}
