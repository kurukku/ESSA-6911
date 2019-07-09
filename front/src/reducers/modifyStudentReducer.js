const modifyStudentReducer = (state = {}, action) => {
  if (action.type === "GET_MODIFY_STUDENT") {
    return action.payload;
  }
  return state;
};

export default modifyStudentReducer;
