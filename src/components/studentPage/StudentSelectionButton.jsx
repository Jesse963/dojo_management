import React, { Component } from "react";

class StudentSelectionButton extends Component {
  state = {};

  handleClick = () => {
    this.props.navigateToStudent(this.props.student);
  };

  checkStyle = () => {
    // let classes = "btn m-2 ";
    // classes += this.state.selected ? "btn-success" : "btn-outline-dark";
    // return classes;
  };

  render() {
    console.log(this.props);
    return (
      <li>
        <button onClick={this.handleClick} className="btn m-2 btn-outline-dark">
          {this.props.student.name}
        </button>
      </li>
    );
  }
}

export default StudentSelectionButton;
