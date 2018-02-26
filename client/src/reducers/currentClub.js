const currentClub = (state = {}, action) => {
  switch (action.type) {
    case 'GET_CURRENT_CLUB':
      return action.currentClub;
    case 'EDIT_CLUB':
      return action.currentClub;
    default:
      return state;
  }
};

export default currentClub;
