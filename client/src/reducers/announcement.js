const announcement = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_ANNOUNCEMENT':
      return action.announcement;
    case 'EDIT_ANNOUNCEMENT':
      return action.announcement;
    default:
      return state;
  }
};

export default announcement;
