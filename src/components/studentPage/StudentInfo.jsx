import React, { Component } from "react";
import ClassInformation from "../TrendsPage/classInfoComponent";
import EditStudentForm from "./editStudentForm";
import ReactDOM from "react-dom";

class StudentInfo extends Component {
  editButtonHandler() {
    console.log("Edit button: ", this.props.student);
    ReactDOM.render(
      <EditStudentForm student={this.props.student} />,
      document.querySelector(".container")
    );
  }

  state = {};
  render() {
    return (
      <div
        className="left panel"
        style={{
          minWidth: "15vw",
          maxHeight: "80%",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            overflowX: "auto",
            overflowY: "hidden",
          }}
        >
          {this.props.student.first_name} {this.props.student.last_name}
        </h1>
        {/* <div
          className="profile image"
          style={{
            minWidth: "15vw",
            minHeight: "15vw",
            border: "2px dashed red",
          }}
        >
          student profile image
        </div> */}

        <ul
          className=""
          style={{
            textAlign: "center",
            listStyle: "none",
            margin: "0",
            padding: "0",
            marginBottom: "5%",
          }}
        >
          <li>{this.props.student.phone}</li>
          <li>{this.props.student.email}</li>
          {/* <li>{this.props.student.grade}</li> */}
        </ul>
        <h3>Attended Classes</h3>
        <div
          className="student attendance mt-3"
          style={{ maxHeight: "45vh", minHeight: "45vh", overflow: "auto" }}
        >
          {this.props.classes.map((Class, i) => {
            return (
              <ClassInformation
                class={Class}
                key={i}
                id={i}
                clickHandler={() => console.log("nothing")}
              />
            );
          })}
        </div>
        <div
          className="control panel"
          style={{ width: "100%", textAlign: "center" }}
        >
          <button
            className="btn btn-primary btn-lg m-2"
            onClick={() => this.editButtonHandler()}
          >
            Edit
          </button>
          <button
            className="btn btn-secondary btn-lg m-2"
            onClick={() => (window.location.href = "/")}
          >
            Home
          </button>
        </div>
      </div>
    );
  }
}

export default StudentInfo;
