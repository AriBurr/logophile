const discussion = (state = [], action) => {
  switch (action.type) {
    case 'ADD_DISCUSSION':
      return [...state, action.discussion];
    case 'GET_BOOKSHELVES':
      return action.discussion;
    case 'EDIT_DISCUSSION':
      return state.map(d => {
        if (d.id === action.discussion.id) return action.discussion;
        return d;
      });
    case 'DELETE_DISCUSSION':
      return state.filter(d => d.id !== action.discussion.id);
    default:
      return state;
  }
};

export default discussion;
