import React, { Component } from "react";

import { connect } from "react-redux";
import { deleteStudent, getStudent, setPresentStudent } from "../actions/action";
import { Link } from "react-router-dom";
import axios from "axios";
export class StudentList extends Component {
  componentDidMount() {
    this.props.getStudent();
    axios.get("/student").then(res => console.log(res.data));
  }

  render() {
    const { Students, deleteStudent, setPresentStudent } = this.props;
    return (
      <div >
        {Students.map((item, index) => {
          return (
            <div key={index}>
              <h2 style={{ justifyContent: "spaceBetween" }}>{item.name} </h2>
              <h2>{item.email}</h2>
              <h2>{item.order}</h2>
              {item.isPresent ? <h2>Present</h2> : <h2>not present</h2>}
              <img src={item.photo}/>
              <Link to={`/student/update/${item._id}`}>
                <button>Edit</button>
              </Link>
                <button onClick={() => setPresentStudent(item._id)}>Present</button>
              <button onClick={() => deleteStudent(item._id)}>Delete</button>
            </div>
          );
        })}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    Students: state.list
  };
};

export default connect(
  mapStateToProps,
  {  getStudent, deleteStudent, setPresentStudent }
)(StudentList);
