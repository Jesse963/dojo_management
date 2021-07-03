import React, { Component } from "react";
import Student from "./student.jsx";

class Students extends Component {
  state = {
    currentAttendance: [],
  };

  // add student to attending students array
  addStudentToAttending = (student, selected) => {
    let currentlyAttending = this.state.currentAttendance;
    if (currentlyAttending.includes(student)) {
      currentlyAttending.splice(currentlyAttending.indexOf(student), 1);
    } else {
      currentlyAttending.push(student);
    }
    this.setState({ currentAttendance: currentlyAttending });
    console.log(this.state.currentAttendance.length);
    // const test = selected ? "is not selected" : "is selected";
    // console.log(`${student} ${test} ${selected}`);
  };

  submitAttendance = async () => {
    console.log(this.state.currentAttendance);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.currentAttendance),
    };
    await fetch("/api/uploadAttendance", options);
  };

  render() {
    return (
      <div
        className="attendance selection panel shadow-lg p-3 mb-5 bg-white rounded"
        style={{
          marginTop: "15%",
          padding: "15px",
          border: "2px solid black",
          height: "100%",
          textAlign: "center",
        }}
      >
        <h1 className="m-3">Select Attending Students</h1>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            className="left panel"
            style={{
              width: "66%",
              textAlign: "start",
              marginBottom: "5%",
              marginLeft: "5%",
            }}
          >
            <div className="filter selections">
              Select Filters
              <input
                type="text"
                name="studentSearch"
                id="studentSearch"
                className="m-3"
              />
            </div>
            <div
              className="mapped students"
              style={{
                // webkitscr
                maxHeight: "40vh",
                overflow: "auto",
              }}
            >
              <ul
                style={{
                  listStyleType: "none",
                  paddingLeft: "0px",
                  textAlign: "center",
                }}
              >
                {this.props.students.map((student) => (
                  <Student
                    key={student.name}
                    name={student.name}
                    grade={student.grade}
                    addStudentToAttending={this.addStudentToAttending}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div
            className="right panel"
            style={{
              border: "2px solid black",
              textAlign: "center",
              marginBottom: "5%",
              marginRight: "5%",
            }}
          >
            <div className="controls">
              <h2 className="m-3">
                {this.state.currentAttendance.length} students selected
              </h2>
              <button
                onClick={this.submitAttendance}
                className="btn btn-primary btn-lg m-3"
              >
                Submit with Today's Date
              </button>
              <button className="btn btn-primary btn-lg m-3">
                Submit for Another Date
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Students;
