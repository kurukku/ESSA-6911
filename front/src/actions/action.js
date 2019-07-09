import { ADD_LIST } from "../constants/actionTypes";
import { REMOVE_LIST } from "../constants/actionTypes";
import axios from "axios";

export function removeContact(payload) {
  return { type: REMOVE_LIST, payload };
}

export const getStudent = () => dispatch => {
  axios
    .get("/student/all")
    .then(res => {
      dispatch({
        type: "GET_STUDENTS",
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const addStudent = newStudent => dispatch => {
  console.log('addStudent', newStudent)
  axios.post("/student/create", newStudent).then(() => dispatch(getStudent())).catch(err => console.log('err', err))
};

export const getModifyStudent = id => dispatch => {
  axios.get("/student/" + id).then(res =>
    dispatch({
      type: "GET_MODIFY_STUDENT",
      payload: res.data
    })
  );
};

export const modifyStudent = (id, modidyStudent) => dispatch => {
  axios.put("/student/update/" + id, modidyStudent).then(() => dispatch(getStudent()));
};

export const deleteStudent = id => dispatch => {
  console.log("zied");
  axios.delete("/student/" + id).then(() => dispatch(getStudent()));
};

export const setPresentStudent = id => dispatch => {
  console.log("zied");
  axios.put("/student/ispresent/" + id).then(() => dispatch(getStudent()));
};