const comments = (state = [], action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      return [...state, action.comment];
    case 'GET_COMMENT':
      return action.comments;
    case 'EDIT_COMMENT':
      return state.map(c => {
        if (c.id === action.comment.id) return action.comment;
        return c;
      });
    case 'DELETE_COMMENT':
      return state.filter(c => c.id !== action.comment.id);
    default:
      return state;
  }
};

export default comments;
