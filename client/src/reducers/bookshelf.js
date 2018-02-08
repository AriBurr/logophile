const bookshelf = (state = [], action) => {
  switch(action.type){
    case "FETCH_SHELF":
      return action.bookshelf;
    case "DELETE_SHELF":
      return {};
    default:
      return state;
  }
}

export default bookshelf;
