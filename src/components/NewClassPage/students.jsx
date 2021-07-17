import React, { Component, useState } from "react";
import Student from "./student.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Students extends Component {
  state = {
    currentAttendance: [],
    students: this.props.students,
  };

  studentSearchOnChange = (event) => {
    this.setState({
      students: this.props.students.filter((student) =>
        student.name.toLowerCase().includes(event.target.value)
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
            className="left panel mb-5"
            style={{ width: "66%", alignItems: "center" }}
          >
            <input
              onChange={this.studentSearchOnChange}
              type="text"
              name="studentSearch"
              id="studentSearch"
              className="form-control m-3"
              placeholder="Search for a student"
              style={{ width: "80%" }}
            />
            <div
              className="mapped students"
              style={{
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
            className="right panel"
            style={{
              border: "2px solid black",
              textAlign: "center",
              marginBottom: "5%",
              marginRight: "5%",
            }}
          >
            <div className="controls" style={{ height: "80%" }}>
              <h2 className="m-3">
                {this.state.currentAttendance.length} students selected
              </h2>
              <button
                onClick={() => this.submitAttendance(new Date())}
                className="btn btn-primary btn-lg m-3"
              >
                Submit with Today's Date
              </button>
              <p></p>
              {this.renderDatePicker()}

              <button className="btn btn-primary btn-lg m-3">
                Submit with custom date
              </button>
              <div>
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
