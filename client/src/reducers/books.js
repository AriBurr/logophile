const books = (state = [], action) => {
  switch (action.type) {
    case 'SEARCH_ALL':
      return action.books;
    default:
      return state;
  }
}

export default books;
