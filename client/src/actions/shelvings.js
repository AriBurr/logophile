import axios from 'axios';
import { setHeaders } from '../actions/headers';
import { setFlash } from '../actions/flash';

export const addBook = (book, shelf) => {
  return dispatch => {
    axios.post(`/api/books`, { book: {item: book} }, setHeaders() )
      .then( res => {
        const shelfId = shelf.id;
        console.log('Shelf_id: '+shelfId)
        const bookId = res.data.id;
        console.log('Book_id: '+bookId)
        axios.post(`api/shelf/${shelfId}/book/${bookId}`, { data: shelfId, bookId } , setHeaders() )
        .then( res => {
          console.log('--------AFTER STORED IN DB-----')
          console.log(res.data)
          //add these to the store??-------------AALL GOOD UP TO THIS POINT----------------
          dispatch(setFlash(`Added "${book.volumeInfo.title}" to your ${shelf.name} bookshelf!`, 'green'))
        })
        .catch( err => dispatch(setFlash(`${book.volumeInfo.title} is already on bookshelf: ${shelf.name}`, 'red')));
      })
      .catch( err => {
        dispatch(setFlash(`Troubles with this request`, 'red'));

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

export const deleteShelving = (shelving, shelfId) => {
  console.log('Shelf_id: '+shelfId)
  console.log('shelving: ', shelving)
  return (dispatch) => {
    axios.delete(`/api/books/${shelving.id}?shelf_id=${shelfId}`, setHeaders() )
      .then( () => dispatch({ type: 'DELETE_SHELVING', shelving }) )
  }
}
