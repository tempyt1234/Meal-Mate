// import { LOGIN_SUCCESS } from './actions';

// const initialState = {
//   user: null
// };

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LOGIN_SUCCESS:
//       return {
//         ...state,
//         user: action.payload
//       };
//     default:
//       return state;
//   }
// };

// export default reducer;


import { LOGIN_SUCCESS, LOGOUT, FETCH_USER_PROFILE } from './actions';

const initialState = {
  user: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    case FETCH_USER_PROFILE:
      return {
        ...state,
        user: action.payload // Updates user state when profile is fetched
      };
    case LOGOUT:
      return {
        ...state,
        user: null // Clears user on logout
      };
    default:
      return state;
  }
};

export default reducer;

