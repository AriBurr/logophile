const bookshelves = (state = [], action) => {
  switch(action.type){
    case 'ADD_BOOKSHELF':
      debugger
      return [...state, action.bookshelf];
    case 'GET_BOOKSHELVES':
    debugger
      return action.bookshelves;
    default:
      return state;
  }
}

export default bookshelves;
