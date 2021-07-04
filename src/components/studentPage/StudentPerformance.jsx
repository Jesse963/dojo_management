import React, { Component } from "react";
import Chart from "../charting/chart";
import NoteComponent from "./NoteComponent";
import reactDom from "react-dom";
import NoteForm from "./notesForm";

class StudentPerformance extends Component {
  state = {};

  toggleNoteSubmissionPanel() {
    reactDom.render(
      <NoteForm student={this.props.student} />,
      document.querySelector(".student.notes")
    );
    console.log("attempting to render");
  }

  componentDidMount() {
    this.getNotes();
  }
  getNotes = async () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ student: this.props.student }),
    };
    const response = await fetch("/api/getNotes", options);
    const notes = await response.json();
    this.setState({ notes: notes.result });
  };

  render() {
    if (!this.state.notes) {
      return null;
    }
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
            name={this.props.student.name}
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
            width: "35vw",
          }}
        >
          <div
            className="notes content m-2"
            style={{ height: "75%", overflowY: "auto" }}
          >
            {this.state.notes.map((note) => (
              <NoteComponent note={note} />
            ))}
          </div>
          <div className="control panel">
            <button
              className="btn btn-primary m-2"
              onClick={() => this.toggleNoteSubmissionPanel()}
            >
              Add Note
            </button>
            <button className="btn btn-primary m-2">Edit Notes</button>
          </div>
        </div>
      </div>
    );
  }
}

export default StudentPerformance;
