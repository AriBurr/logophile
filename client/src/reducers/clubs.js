const clubs = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CLUB':
      return [...state, action.club];
    case 'GET_CLUBS':
      return action.clubs;
    case 'DELETE_CLUB':
      return state.filter(c => c.id !== action.club.id);
    default:
      return state;
  }
};

export default clubs;
