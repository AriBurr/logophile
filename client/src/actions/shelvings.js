import axios from 'axios';
import { setHeaders } from '../actions/headers';
import { setFlash } from '../actions/flash';

export const addBook = (book, shelf) => {
  return dispatch => {
    axios.post(`/api/books`, { book: {item: book} }, setHeaders())
      .then( res => {
        const shelfId = shelf.id;
        const bookId = res.data.id;
        axios.post(`api/shelvings`, { shelf_id: shelfId, shelving: {book_id: bookId} } , setHeaders())
        .then( res => dispatch(setFlash(`Added "${book.volumeInfo.title}" to your ${shelf.name} bookshelf!`, 'green')))
        .catch( err => dispatch(setFlash(`${book.volumeInfo.title} is already on bookshelf: ${shelf.name}`, 'red')));
      })
      .catch( err => dispatch(setFlash(`Troubles with this request`, 'red')));
  }
}

export const fetchShelvings = (shelf) => {
  return dispatch => {
    axios.get(`/api/shelvings?shelf_id=${shelf.id}`, setHeaders() )
      .then(res => {
        dispatch({type: 'FETCH_SHELVING', shelvings: res.data });
      })
      .catch( err => dispatch(setFlash(`Error fetching books, please try again!`, 'red')));
  }
}

export const editShelving = (shelf, shelving, fromShelf) => {
  return dispatch => {
    axios.put(`/api/shelvings/${shelving.id}?shelf_id=${shelf.id}&from_shelf=${fromShelf}`, {shelving}, setHeaders())
      .then( res => {
        dispatch({type: 'EDIT_SHELVING', shelvings: res.data.shelvings });
        dispatch({ type: 'FETCH_SHELF', bookshelf: shelf });
        dispatch({ type: 'FULL_EDIT_BOOKSHELF', bookshelves: res.data.shelves });
      })
      .catch( err => dispatch(setFlash(`Error updating bookshelf, please try again!`, 'red')));
  }
}

export const deleteShelving = (shelving, shelfId) => {
  return (dispatch) => {
    axios.delete(`/api/shelvings/${shelving.id}?shelf_id=${shelfId}`, setHeaders() )
      .then( res => {
        dispatch({ type: 'DELETE_SHELVING', shelving });
        dispatch({ type: 'EDIT_BOOKSHELF', bookshelf: res.data });
      })
      .catch( err => dispatch(setFlash(`Error removing book, please try again!`, 'red')));
  }
}
