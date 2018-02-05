import axios from 'axios';
import { setHeaders } from '../actions/headers';
import { setFlash } from '../actions/flash';

export const addBook = (book, shelf) => {
  return dispatch => {
    axios.post(`/api/books`, { book: {item: book} }, setHeaders() )
      .then( res => {
        const shelfId = shelf.id;
        const bookId = res.data.id;
        axios.post(`api/shelf/${shelfId}/book/${bookId}`, { data: shelfId, bookId } , setHeaders() )
        .then( res => dispatch(setFlash(`Added "${book.volumeInfo.title}" to your ${shelf.name} bookshelf!`, 'green')))
        .catch( err => dispatch(setFlash(`Invalid entry, please try again!`, 'red')));
      })
      .catch( err => dispatch(setFlash(`Invalid entry, please try again!`, 'red')));
  }
}
