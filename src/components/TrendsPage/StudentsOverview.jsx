import React, { Component } from "react";
import StudentTrend from "./StudentInfoComponent";

class StudentsOverview extends Component {
  componentDidMount = async () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ students: this.props.students }),
    };
    const attendances = await fetch(
      "/api/calculateFullAttendancePercentages",
      options
    );
    const fullAttendanceArray = await attendances.json();
    console.log(fullAttendanceArray.result);
    this.setState({
      fullAttendanceArray: fullAttendanceArray.result,
      loaded: true,
    });
  };

  state = {};
  render() {
    if (!this.state.loaded) {
      return null;
    } else {
      return (
        <div>
          <h2 style={{ textAlign: "center" }}>{this.props.school.name}</h2>
          <div
            className="students overview m-3"
            style={{
              height: "45vh",
              overflowY: "auto",
              paddingRight: "10px",
            }}
          >
            {this.props.students.map((student) => {
              return (
                <StudentTrend
                  student={student}
                  attendancePercentage={
                    this.state.fullAttendanceArray[student.name]
                  }
                  totalStudents={this.props.students.length}
                />
              );
            })}
          </div>
        </div>
      );
    }
  }
}

export default StudentsOverview;
