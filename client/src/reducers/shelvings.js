const shelvings = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_SHELVING':
      return action.shelvings;
    case 'EDIT_SHELVING':
      return action.shelvings;
    case 'DELETE_SHELVING':
      return state.filter( b => b.id !== action.shelving.id);
    default:
      return state;
  }
}

export default shelvings;
