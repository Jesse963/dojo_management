import React, { Component } from "react";
import Chart from "../charting/chart";
import NoteComponent from "./NoteComponent";

class StudentPerformance extends Component {
  state = {};
  render() {
    return (
      <div className="right panel ml-5" style={{ textAlign: "center" }}>
        <h1>Attendance</h1>
        <div
          className="attendance graph"
          style={{
            maxHeight: "35%",
          }}
        >
          <Chart
            student={this.props.studentAttendance}
            average={this.props.averageAttendancePerStudent}
          />
        </div>
        <h1>Notes</h1>
        <div
          className="student notes mb-5"
          style={{
            border: "1px solid black",
            height: "30vh",
            maxWidth: "45vw",
          }}
        >
          <div
            className="notes content m-2"
            style={{ height: "75%", overflowY: "auto" }}
          >
            {/* <NoteComponent content={"test"} /> */}
            {this.props.notes.map((note) => (
              <NoteComponent note={note} />
            ))}
          </div>
          <div className="control panel">
            <button className="btn btn-primary m-2">Add Note</button>
            <button className="btn btn-primary m-2">Edit Notes</button>
          </div>
        </div>
      </div>
    );
  }
}

export default StudentPerformance;
