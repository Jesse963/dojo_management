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
            <div
              className="students overview ml-2"
              style={{
                height: "40vh",
                overflowY: "auto",
                paddingRight: "10px",
              }}
            >
              {this.props.fullAttendanceArray.map((student, i) => {
                return (
                  <StudentTrend
                    attendance={student}
                    student={this.state.students.find(
                      (search) => search._id === student._id
                    )}
                    totalStudents={this.props.students.length}
                    key={i}
                  />
                );
              })}
            </div>
          );
        case "Single":
          return (
            <div>
              <div
                className="students overview ml-2"
                style={{
                  height: "40vh",
                  overflowY: "auto",
                  paddingRight: "10px",
                }}
              >
                {this.props.classList[this.props.classKey].attendees.map(
                  (student, i) => {
                    return (
                      <StudentTrend
                        student={this.state.students.find(
                          (search) => search._id === student
                        )}
                        attendancePercentage={""}
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
                  height: "40vh",
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
