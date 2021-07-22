import React, { Component } from "react";

class Student extends Component {
  state = { selected: false };

  handleClick = () => {
    this.setState((prevState) => ({
      selected: !prevState.selected,
    }));
    this.props.addStudentToAttending(
      this.props.student._id,
      this.state.selected
    );
  };

  checkStyle = () => {
    let classes = "btn mt-2 ";
    classes += this.state.selected ? "btn-success" : "btn-outline-dark";
    return classes;
  };

  render() {
    return (
      <li>
        <button
          onClick={this.handleClick}
          className={this.checkStyle()}
          style={{ width: "100%" }}
        >
          {this.props.student.first_name} {this.props.student.last_name}
        </button>
      </li>
    );
  }
}

export default Student;
