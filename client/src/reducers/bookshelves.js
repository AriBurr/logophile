const bookshelves = (state = [], action) => {
  switch(action.type){
    case 'ADD_BOOKSHELF':
      return [...state, action.bookshelf]
    default:
      return state;
  }
}
