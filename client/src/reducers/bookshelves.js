const bookshelves = (state = [], action) => {
  switch(action.type){
    case 'ADD_BOOKSHELF':
      return [...state, action.bookshelf];
    case 'GET_BOOKSHELVES':
      return action.bookshelves;
    case 'DELETE_BOOKSHELF':
      return state.filter( s => s.id !== action.shelf.id);
    default:
      return state;
  }
}

export default bookshelves;
