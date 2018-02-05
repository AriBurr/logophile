const shelvings = (state = [], action) => {
  switch (action.type) {
    case 'ADD_SHELVING':
      return [...state, action.shelving];
    default:
      return state;
  }
}

export default shelvings;
