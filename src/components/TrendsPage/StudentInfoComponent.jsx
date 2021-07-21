import React, { Component } from "react";
import reactDom from "react-dom";
import StudentDetails from "../studentPage/StudentDetails";

class StudentTrend extends Component {
  state = {};

  clickHandler() {
    console.log(this.props.student.name);
    //prevent click through to student page from info -> classes -> attendees. aim to add later
    if (this.props.displayAttendance !== false) {
      reactDom.render(
        <StudentDetails
          student={this.props.fullStudentDetails}
          totalStudents={this.props.totalStudents}
        />,
        document.querySelector(".container")
      );
    }
  }

  checkDisplay() {
    if (this.props.displayAttendance !== false) {
      return (
        <h5>
          {Math.round(100 * this.props.student.attendancePercentage) / 100}%
        </h5>
      );
    }
  }

  render() {
    let studentName;
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
          textAlign: "left",
        }}
        onClick={() => this.clickHandler()}
      >
        <h5 style={{ maxWidth: "80%", width: "80%" }}>{studentName}</h5>
        {this.checkDisplay()}
      </div>
    );
  }
}
export default StudentTrend;
