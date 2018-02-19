const clubs = (state = [], action) => {
  switch(action.type){
    case 'ADD_CLUB':
      return [...state, action.club];
    default:
      return state;
  }
}

export default clubs;
