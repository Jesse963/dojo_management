import React, { Component } from "react";
import StudentInfo from "./StudentInfo";
import StudentPerformance from "./StudentPerformance";

class StudentDetails extends Component {
  state = {};
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
