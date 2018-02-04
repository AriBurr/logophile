const bookshelves = (state = [], action) => {
  switch(action.type){
    case 'ADD_BOOKSHELF':
      return [...state, action.bookshelf];
    case 'GET_BOOKSHELVES':
      return action.bookshelves;
    default:
      return state;
  }
}

export default bookshelves;
