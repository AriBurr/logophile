const userClubs = (state = [], action) => {
  switch (action.type) {
    case 'GET_USER_CLUBS':
      return action.userClubs;
    case 'ADD_CLUB':
      return [action.club, ...state];
    default:
      return state;
  }
};

export default userClubs;
