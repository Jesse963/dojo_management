import React, { Component, useState } from "react";
import Student from "./student.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../core.css";

class Students extends Component {
  state = {
    currentAttendance: [],
    students: this.props.students,
  };

  studentSearchOnChange = (event) => {
    this.setState({
      students: this.props.students.filter((student) =>
        student.name.toLowerCase().includes(event.target.value.toLowerCase())
      ),
    });
  };

  renderDatePicker() {
    // const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker
        selected={new Date()}
        // onChange={(date) => this.setState({ StartDate: date })}
      />
    );
  }

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
  };

  submitAttendance = async (date) => {
    console.log(this.state.currentAttendance);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        students: this.state.currentAttendance,
        date: date,
      }),
    };
    const response = await fetch("/api/uploadAttendance", options);
    const { success } = await response.json();
    if (success) {
      window.location.href = "/";
    }
  };

  render() {
    return (
      <div className="attendance selection page container shadow-lg p-3 mb-5 bg-white rounded">
        <h1 className="m-3 mb-4">Select Attending Students</h1>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            className="left panel mb-2 mr-5 ml-5"
            style={{
              width: "50%",
              paddingRight: "5%",
              alignItems: "center",
              borderRight: "2px dashed black",
            }}
          >
            <input
              onChange={this.studentSearchOnChange}
              type="text"
              name="studentSearch"
              id="studentSearch"
              className="form-control mt-1 mb-3"
              placeholder="Search for a student"
              style={{ width: "100%" }}
            />
            <div
              className="mapped students"
              style={{
                maxHeight: "30vh",
                overflow: "auto",
              }}
            >
              <ul
                style={{
                  listStyleType: "none",
                  paddingLeft: "0px",
                  textAlign: "center",
                  marginRight: "5px",
                }}
              >
                {this.state.students.map((student, i) => (
                  <Student
                    key={i}
                    name={student.name}
                    grade={student.grade}
                    addStudentToAttending={this.addStudentToAttending}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div
            className="right panel mb-5 mt-5"
            style={{
              textAlign: "center",
              width: "37%",
            }}
          >
            <div className="controls" style={{ height: "80%" }}>
              <h2 className="m-3">
                {this.state.currentAttendance.length} students selected
              </h2>

              <p>{this.renderDatePicker()}</p>
              <div>
                <button
                  onClick={() => this.submitAttendance(new Date())}
                  className="btn btn-primary btn-lg m-3"
                >
                  Submit Class
                </button>
                <button
                  className="btn btn-primary btn-lg m-2"
                  onClick={() => (window.location.href = "/")}
                >
                  Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Students;
