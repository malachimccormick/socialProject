import { TEST_DISPATCH } from "./types";

// Register Use
export const registerUser = userData => {
  return {
    type: TEST_DISPATCH,
    payload: userData
  };
};
