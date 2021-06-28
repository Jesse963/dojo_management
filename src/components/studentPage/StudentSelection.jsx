import React, { Component } from "react";
import ReactDOM from "react-dom";
import Student from "../NewClassPage/student";
import StudentSelectionButton from "./StudentSelectionButton";
import StudentDetails from "./StudentDetails";

class StudentSelection extends Component {
  state = {};

  navigateToStudent = (student) => {
    console.log("Navigated to Student: ", student.name);
    ReactDOM.render(
      <StudentDetails student={student} />,
      document.querySelector(".container")
    );
  };

  render() {
    console.log(this.props.students);
    return (
      <div
        className="page container shadow-lg p-3 mb-5 bg-white rounded"
        style={{ display: "flex", flexDirection: "row", maxWidth: "60vh" }}
      >
        <div
          className="left panel"
          style={{
            maxHeight: "80%",
            width: "100%",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              overflowX: "auto",
              overflowY: "hidden",
            }}
          >
            Select a Student
          </h1>
          <ul
            style={{
              listStyle: "none",
              textAlign: "center",
              paddingLeft: "0px",
              maxHeight: "60vh",
              overflowY: "auto",
              width: "100%",
            }}
          >
            {this.props.students.map((student) => (
              <StudentSelectionButton
                student={student}
                navigateToStudent={this.navigateToStudent}
              />
            ))}
          </ul>
          <div
            className="control panel"
            style={{ width: "100%", textAlign: "center" }}
          >
            <button className="btn btn-primary btn-lg m-2">Edit</button>
            <button className="btn btn-primary btn-lg m-2">Home</button>
            <button className="btn btn-primary btn-lg m-2">Back</button>
          </div>
        </div>
      </div>
    );
  }
}

export default StudentSelection;
