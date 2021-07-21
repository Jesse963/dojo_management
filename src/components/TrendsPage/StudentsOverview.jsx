import React, { Component } from "react";
import StudentTrend from "./StudentInfoComponent";
import ClassInformation from "./classInfoComponent";

class StudentsOverview extends Component {
  state = { students: this.props.students };

  render() {
    //prevent render attempt until full attendance is retrieved - edit to return skeleton loading page instead of nothing
    this.props.fullAttendanceArray.map((student) => {
      if (student === undefined) {
        return null;
      }
    });
    if (this.props.fullAttendanceArray === undefined) {
      return null;
    } else {
      //render different views based on the value of display
      switch (this.props.display) {
        case "Students":
          return (
            <div>
              <div
                className="students overview ml-2"
                style={{
                  height: "45vh",
                  overflowY: "auto",
                  paddingRight: "10px",
                }}
              >
                {this.props.fullAttendanceArray.map((student, i) => {
                  return (
                    <StudentTrend
                      student={student}
                      fullStudentDetails={this.state.students.find(
                        (search) => search.name === student.name
                      )}
                      totalStudents={this.props.students.length}
                      key={i}
                    />
                  );
                })}
              </div>
            </div>
          );
        case "Single":
          return (
            <div>
              <div
                className="students overview ml-2"
                style={{
                  height: "45vh",
                  overflowY: "auto",
                  paddingRight: "10px",
                }}
              >
                {this.props.classList[this.props.classKey].attendees.map(
                  (student, i) => {
                    return (
                      <StudentTrend
                        student={student}
                        attendancePercentage={""}
                        // totalStudents={this.props.students.length}
                        key={i}
                        displayAttendance={false}
                      />
                    );
                  }
                )}
              </div>
            </div>
          );
        case "Classes":
          return (
            <div>
              <div
                className="students overview ml-2"
                style={{
                  height: "45vh",
                  overflowY: "auto",
                  paddingRight: "10px",
                }}
              >
                {this.props.classList.map((Class, i) => {
                  return (
                    <ClassInformation
                      class={Class}
                      key={i}
                      id={i}
                      clickHandler={() => this.props.classClickHandler(i)}
                    />
                  );
                })}
              </div>
            </div>
          );
      }
    }
  }
}

export default StudentsOverview;
