import axios from 'axios';
import { setFlash } from './flash';
import { setHeaders } from './headers';

const getUrl = (terms) => {
  const BASE_URL='https://www.googleapis.com/books/v1/volumes'
  let url = `${BASE_URL}?q=`
  if (terms.title.length > 0) url += `${terms.title}&`
  if (terms.author.length > 0) url += `author:${terms.author}&`
  if (terms.ibsn.length > 0) url += `ibsn:${terms.ibsn}`
  return url
}

export const searchAll = (terms, callback = {}) => {
  return(dispatch) => {
    axios.get(`${getUrl(terms)}&startIndex=0&maxResults=12`)
      .then( res => dispatch({ type: 'SEARCH_ALL', books: res.data.items }))
      .then( callback() )
      .catch( err => dispatch(setFlash('Invalid search, please try again!', 'red')));
  }
}

export const booksWithRatings = () => {
  return(dispatch) => {
    axios.get(`/api/books/with_ratings`, setHeaders())
      .then( res => dispatch({ type: 'GET_TOP_RATED', topBooks: res.data }))
      .catch( err => dispatch(setFlash('We cannot find the top books, please try again!', 'red')));
  }
}
