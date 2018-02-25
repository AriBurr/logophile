const userClubs = (state = [], action) => {
  switch (action.type) {
    case 'GET_USER_CLUBS':
      return action.clubs;
    default:
      return state;
  }
};

export default userClubs;
