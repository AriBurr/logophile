const books = (state = {}, action) => {
  switch (action.type) {
    case 'GET_USER':
      return action.persist;
    default:
      return state;
  }
}

export default books;
