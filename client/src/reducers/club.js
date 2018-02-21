const club = (state = {}, action) => {
  switch (action.type) {
    case 'GET_CURRENT_CLUB':
      return action.club;
    case 'EDIT_CLUB':
      return action.club;
    default:
      return state;
  }
};

export default club;
