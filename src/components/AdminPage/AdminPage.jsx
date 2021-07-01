import React, { Component } from "react";
import NewStudentForm from "./NewSudentForm";
import ReactDOM from "react-dom";
import StudentDetails from "../studentPage/StudentDetails";
import StudentSelection from "../studentPage/StudentSelection";

class AdminPage extends Component {
  state = {};
  render() {
    return (
      <div
        className="startPageContainer"
        style={{
          marginTop: "15%",
          padding: "15px",
          border: "2px solid black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
        }}
        className="shadow-lg p-3 mb-5 bg-white rounded"
      >
        <h1 className="m-3" style={{ textAlign: "center" }}>
          Admin Options
        </h1>
        <button
          className="btn btn-primary btn-lg m-2"
          onClick={() =>
            ReactDOM.render(
              <NewStudentForm school_id={this.props.school.schoolID} />,
              document.querySelector(".container")
            )
          }
        >
          New Student
        </button>
        <button
          className="btn btn-primary btn-lg m-2"
          onClick={() =>
            ReactDOM.render(
              <StudentSelection students={this.props.students} />,
              document.querySelector(".container")
            )
          }
        >
          View/Edit Student
        </button>
        <button className="btn btn-light btn-lg m-2">
          Edit Existing Class (light button = non-urgent)
        </button>
        <button className="btn btn-light btn-lg m-2">Grading</button>

        <button
          className="btn btn-secondary btn-lg mt-4"
          onClick={() => (window.location.href = "/")}
        >
          Back
        </button>
      </div>
    );
  }
}

export default AdminPage;
