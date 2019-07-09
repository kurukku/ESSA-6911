import { ADD_LIST } from "../constants/actionTypes";
import { REMOVE_LIST } from "../constants/actionTypes";

const modifyStudentReducer = (state = [], action) => {
  if (action.type === ADD_LIST) {
    return state.concat(action.payload);
  }
  if (action.type === REMOVE_LIST) {
    return state.filter((el, index) => index !== action.payload);
  }
  if (action.type === "GET_STUDENTS") {
    return action.payload;
  }
  return state;
};

export default modifyStudentReducer;
