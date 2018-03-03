const announcement = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ANNOUNCMENT':
      return action.announcement;
    case 'EDIT_ANNOUNCMENT':
      return action.announcement;
    default:
      return state;
  }
};

export default books;
