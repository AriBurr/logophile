import axios from 'axios';
import { setFlash } from './flash';

export const searchAll = (term, callback) => {
  return(dispatch) => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${term}&startIndex=0&maxResults=15`)
      .then( res => {
        dispatch({ type: 'SEARCH_ALL', books: res.data.items })
      })
      .then( callback() )
      .catch( err => {
        dispatch(setFlash('Invalid Search, Please Try Again!', 'red'))
      });
  }
}
