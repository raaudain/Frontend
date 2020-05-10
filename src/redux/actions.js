import { axiosWithAuth } from "../utils/axiosWithAuth";

export const START_FETCHING = "START_FETCHING";
export const CATEGORY_FETCHING = "CATEGORY_FETCHING";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAILURE = "FETCH_FAILURE";

export const fetch = () => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .get("/")
    .then(res => {
      console.log(res.data);
      //dispatch({type: FETCH_SUCCESS, payload: res.data})
    })
    .catch(err => console.log(err.response));
};
