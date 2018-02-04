const books = (state = [], action) => {
  switch (action.type) {
    case 'SEARCH_ALL':
      return action.books;
    case 'SET_ACTIVE_BOOK':
      return state.map( book => {
        if (book.id === action.activeBook.id)
          return action.activeBook;
        return book;
      });
    default:
      return state;
  }
}

export default books;
