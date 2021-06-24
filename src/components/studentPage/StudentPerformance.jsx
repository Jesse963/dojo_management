import React, { Component } from "react";

class StudentPerformance extends Component {
  state = {};
  render() {
    return (
      <div className="right panel ml-5" style={{}}>
        <h1>Attendance</h1>
        <div
          className="attendance graph"
          style={{ border: "2px dashed red", height: "20vh", minWidth: "35vw" }}
        >
          Add graph of student Attendance vs Mean
        </div>
        <h1>Notes</h1>
        <div
          className="student notes mb-5"
          style={{
            border: "2px dashed red",
            height: "40vh",
            overflow: "auto",
          }}
        >
          [ author: String, date: Date, needs_addressing: Bool, note: String ]
        </div>
      </div>
    );
  }
}

export default StudentPerformance;
