import { TEST_DISPATCH } from "../actions/types";

const intialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = intialState, action) {
  switch (action.type) {
    case TEST_DISPATCH:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}
