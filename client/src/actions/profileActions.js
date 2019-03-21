import axios from "axios";
import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS } from "./types";

//Get current profile

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
};

//Profile loading

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
