const bookshelves = (state = [], action) => {
  switch(action.type){
    case 'ADD_BOOKSHELF':
      return [...state, action.bookshelf];
    case 'GET_BOOKSHELVES':
      return action.bookshelves;
    case 'REMOVE_BOOKSHELVES':
      return [];
    default:
      return state;
  }
}

export default bookshelves;
