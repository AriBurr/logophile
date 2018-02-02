import axios from 'axios';
import { setFlash } from './flash';

const getUrl = (terms) => {
  const BASE_URL='https://www.googleapis.com/books/v1/volumes'
  let url = `${BASE_URL}?q=`
  if (terms.title.length > 0) url += `${terms.title}&`
  if (terms.author.length > 0) url += `author:${terms.author}&`
  if (terms.ibsn.length > 0) url += `ibsn:${terms.ibsn}`
  return url
}

export const searchAll = (callback, terms) => {
  return(dispatch) => {
    axios.get(`${getUrl(terms)}&startIndex=0&maxResults=15`)
      .then( res => {
        dispatch({ type: 'SEARCH_ALL', books: res.data.items })
      })
      .then( callback() )
      .catch( err => {
        dispatch(setFlash('Invalid Search, Please Try Again!', 'red'))
      });
  }
}
