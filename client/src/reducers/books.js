const books = (state = [], action) => {
  switch (action.type) {
    case 'SEARCH_ALL':
      return action.books;
    case 'CLEAR_BOOKS':
      return [];
    default:
      return state;
  }
}

export default books;
