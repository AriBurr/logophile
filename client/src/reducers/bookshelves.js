const bookshelves = (state = [], action) => {
  switch (action.type) {
    case 'ADD_BOOKSHELF':
      return [...state, action.bookshelf];
    case 'GET_BOOKSHELVES':
      return action.bookshelves;
    case 'FULL_EDIT_BOOKSHELF':
      return action.bookshelves;
    case 'EDIT_BOOKSHELF':
      return state.map(s => {
        if (s.id === action.bookshelf.id) return action.bookshelf;
        return s;
      });
    case 'DELETE_BOOKSHELF':
      return state.filter(s => s.id !== action.shelf.id);
    default:
      return state;
  }
};

export default bookshelves;
