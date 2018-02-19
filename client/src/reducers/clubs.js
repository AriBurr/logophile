const clubs = (state = [], action) => {
  switch(action.type){
    case 'ADD_CLUB':
      return [...state, action.club]
    case 'GET_CLUBS':
      return action.clubs;
    default:
      return state;
  }
}

export default clubs;
