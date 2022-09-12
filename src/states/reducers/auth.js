import { loadState } from '../../localStorage'

// initial state. if user details available in local storage  then load details otherwise return empty state
const initialState = loadState('authState') || {};

// authentication reducer 
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      const { user, token} = action;
      return { user, token};
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};

export default authReducer;
