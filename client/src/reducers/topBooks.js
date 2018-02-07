const topBooks = (state = [], action) => {
  switch (action.type) {
    case 'GET_TOP_RATED':
      return action.topBooks;
    default:
      return state;
  }
}

export default topBooks;
