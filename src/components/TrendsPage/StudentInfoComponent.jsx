import React, { Component } from "react";
import reactDom from "react-dom";
import StudentDetails from "../studentPage/StudentDetails";

class StudentTrend extends Component {
  state = {};

  clickHandler() {
    console.log(this.props.student.name);
    reactDom.render(
      <StudentDetails
        student={this.props.student}
        totalStudents={this.props.totalStudents}
      />,
      document.querySelector(".container")
    );
  }

  render() {
    let studentName;
    console.log(typeof this.props.student.length);
    if (typeof this.props.student === "string") {
      studentName = this.props.student;
    } else {
      studentName = this.props.student.name;
    }
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
        <h5 style={{ maxWidth: "80%", width: "80%" }}>{studentName}</h5>
        <h5>{Math.round(100 * this.props.attendancePercentage) / 100}%</h5>
      </div>
    );
  }
}

export default StudentTrend;
