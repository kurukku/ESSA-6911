import React, { Component } from "react";
import "./App.css";
import StudentList from "./components/StudentList";
import AddStudent from "./components/AddStudent";
import EditStudent from "./components/EditStudent";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Link to="/studentList"> Student List</Link>
          <Link to="/AddStudent"> Add Student </Link>
        </div>

        <Route path="/AddStudent" render={() => <AddStudent />} />
        <Route path="/studentList" render={() => <StudentList />} />
        <Route
          path="/student/update/:id"
          render={props => <EditStudent id={props.match.params.id} />}
        />
      </Router>
    );
  }
}

export default App;
