import React, { Component } from "react";
import reactDom from "react-dom";
import StudentDetails from "../studentPage/StudentDetails";

class StudentTrend extends Component {
  state = {};

  clickHandler() {
    console.log(this.props.student.name);
    reactDom.render(
      <StudentDetails student={this.props.student} />,
      document.querySelector(".container")
    );
  }

  render() {
    return (
      <div
        className="student info"
        style={{
          height: "5vh",
          display: "flex",
          borderBottom: "1px dashed black",
          cursor: "pointer",
          alignItems: "center",
        }}
        onClick={() => this.clickHandler()}
      >
        <h5 style={{ maxWidth: "80%", width: "80%" }}>
          {this.props.student.name}
        </h5>
        <h5>{Math.round(100 * this.props.attendancePercentage) / 100}%</h5>
      </div>
    );
  }
}

export default StudentTrend;
