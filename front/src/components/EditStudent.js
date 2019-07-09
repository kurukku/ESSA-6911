import React, { Component } from "react";
import { connect } from "react-redux";
import { getModifyStudent, modifyStudent } from "../actions/action";
import { withRouter } from "react-router-dom";

class EditStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: ""
    };
  }
  routeChange = () => {
    let path = `/studentList`;
    this.props.history.push(path);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentWillMount() {
    this.props.getModifyStudent(this.props.id);
    const { name, email } = this.props.modify;
    this.setState({
      name: name,
      email: email
    });

  }

  componentDidUpdate(prevProps) {
    if (this.props.modify.name ==! prevProps.modify.name) {
      console.log('salah')
      const { name, email } = this.props.modify;
      this.setState({
        name: name,
        email: email
      });
    }
  }

  onSubmit = () => {
    const { _id } = this.props.modify;
    const { name, telephone, email } = this.state;

    this.props.modifyStudent(_id, { name, telephone, email });
    this.routeChange();
  };
  render() {
    const { name, telephone, email } = this.state;
    return (
      <div
        style={{ flexDirection: "column" }}
      >
        <h1> Edit student </h1>
        <div>
          <input
            placeholder="name"
            name="name"
            onChange={this.handleChange}
            value={name}
          />
          <input
            placeholder="email"
            name="email"
            onChange={this.handleChange}
            value={email}
          />
          <button onClick={this.onSubmit}>Edit</button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    modify: state.modify
  };
};

export default connect(
  mapStateToProps,
  { getModifyStudent, modifyStudent }
)(withRouter(EditStudent));
