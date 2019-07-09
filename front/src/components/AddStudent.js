import React, { Component } from "react";
import { connect } from "react-redux";
import { addStudent } from "../actions/action";
import { withRouter } from "react-router-dom";

class AddStudent extends Component {
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  routeChange = () => {
    let path = `/studentList`;
    this.props.history.push(path);
  };
  // onSubmit = () => {
  //   const obj = this.state;
  //   this.props.addStudent(obj);
  //   this.routeChange();
  // };

  onSubmit = () => {
    if (this.state.file.length === undefined) {
      /* create with out upload photo */

    const obj = this.state;
    this.props.addStudent(obj);
    this.routeChange();
    } else if (this.state.file.length == 1) {
      const formData = new FormData();
      formData.append("photo", this.state.file[0]);
      formData.set("name", this.state.name);
      formData.set("email", this.state.email);
      formData.set("order", this.state.order);
      this.props.addStudent(formData);
      this.routeChange();
    }
  };

  handleUpload = e => {
    this.setState(
      {
        file: e.target.files
      }
    );
  };

  render() {
    return (
      <div
        style={{ flexDirection: "column" }}
      >
        <h1> add student</h1>
        <div>
          <input placeholder="name" name="name" onChange={this.handleChange} />
          <input
            placeholder="email"
            name="email"
            onChange={this.handleChange}
          />
                    <input
            placeholder="order"
            name="order"
            onChange={this.handleChange}
          />
                          <input
                  type="file"
                  onChange={this.handleUpload}
                />
          <button onClick={this.onSubmit}>add</button>
        </div>
      </div>
    );
  }
}
export default connect(
  null,
  { addStudent }
)(withRouter(AddStudent));