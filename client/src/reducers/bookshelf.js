const bookshelf = (state = null, action) => {
  switch(action.type){
    case "FETCH_SHELF":
      return action.bookshelf;
    default:
      return state;
  }
}

export default bookshelf;
