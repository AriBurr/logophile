const activeBook = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_BOOK':
      return action.activeBook;
    default:
      return state;
  }
}

export default activeBook;
