import React, { Component } from "react";
import StudentTrend from "./StudentInfoComponent";
import ClassInformation from "./classInfoComponent";

class StudentsOverview extends Component {
  state = { students: this.props.students };

  classClickHandler = (classKey) => {
    console.log("clicked: " + classKey + typeof classKey);
    this.setState({ classKey: classKey, display: "Single" });
  };

  componentDidMount = async () => {
    //set options for api calls
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        students: this.props.students,
        school: this.props.school.schoolID,
      }),
    };

    //retrieve list of all classes from DB
    const allClasses = await fetch("/api/getFullAttendance", options);
    const fullClassList = await allClasses.json();
    console.log("here are all your classes: ", fullClassList.result);

    //retrieve attendance % for each student in the school
    const attendances = await fetch(
      "/api/calculateFullAttendancePercentages",
      options
    );
    const fullAttendanceArray = await attendances.json();

    //set values to state
    this.setState({
      classList: fullClassList.result,
      fullAttendanceArray: fullAttendanceArray.result,
      loaded: true,
    });
  };

  render() {
    if (
      this.state.display !== "Single" &&
      this.props.display !== this.state.display
    ) {
      this.setState({ display: this.props.display });
    }
    if (!this.state.loaded) {
      return null;
    } else {
      if (this.state.display === "Students") {
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
              {this.state.students.map((student, i) => {
                return (
                  <StudentTrend
                    student={student}
                    attendancePercentage={
                      this.state.fullAttendanceArray[student.name]
                    }
                    totalStudents={this.props.students.length}
                    key={i}
                  />
                );
              })}
            </div>
          </div>
        );
      } else if (this.state.display === "Classes") {
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
              {this.state.classList.map((Class, i) => {
                return (
                  <ClassInformation
                    class={Class}
                    key={i}
                    id={i}
                    clickHandler={this.classClickHandler}
                  />
                );
              })}
            </div>
          </div>
        );
      } else if (this.state.display === "Single") {
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
              {this.state.classList[this.state.classKey].attendees.map(
                (student, i) => {
                  return (
                    <StudentTrend
                      student={student}
                      attendancePercentage={
                        this.state.fullAttendanceArray[student.name]
                      }
                      totalStudents={this.props.students.length}
                      key={i}
                    />
                  );
                }
              )}
            </div>
          </div>
        );
      }
    }
  }
}

export default StudentsOverview;
