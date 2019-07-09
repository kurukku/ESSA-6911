import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import studentListReducer from "../reducers/studentListReducer";
import modifyStudentReducer from "../reducers/modifyStudentReducer";
import thunk from "redux-thunk";
const middleware = [thunk];

const store = createStore(
  combineReducers({
    list: studentListReducer,
    modify: modifyStudentReducer
  }),
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
