import React, { Component } from "react";
import StudentInfo from "./StudentInfo";
import StudentPerformance from "./StudentPerformance";

class StudentDetails extends Component {
  state = {};

  getStudentData = async () => {
    const school_id = this.props.student.school;
    const full_name = this.props.student.name;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ school: school_id, name: full_name }),
    };
    const response = await fetch("/api/getAttendance", options);
    const attendance = await response.json();
    console.log("Here is some info: ", attendance);
  };

  componentDidMount() {
    this.getStudentData();
  }

  render() {
    console.log(this.props);
    return (
      <div
        className="page container shadow-lg p-3 mb-5 bg-white rounded"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <StudentInfo student={this.props.student} />
        <StudentPerformance student={this.props.student} />
      </div>
    );
  }
}

export default StudentDetails;
