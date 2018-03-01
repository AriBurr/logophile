const readings = (state = [], action) => {
  switch (action.type) {
    case 'GET_READINGS':
      return action.readings;
    default:
      return state;
  }
};

export default readings;
