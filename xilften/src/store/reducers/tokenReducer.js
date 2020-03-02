const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'TOKEN_CHANGED':
      return action.payload;
    default:
      return state;
  }
}