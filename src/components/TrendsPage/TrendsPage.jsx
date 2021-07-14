import React, { Component } from "react";
import AttendanceGraph from "./attendanceGraph";
import StudentsOverview from "./StudentsOverview";

class TrendsPage extends Component {
  state = { students: this.props.students, display: "Students" };

  render() {
    return (
      <div
        className="start page container shadow-lg p-3 mb-5 bg-white rounded"
        style={{ display: "flex", flexDirection: "row", marginTop: "10%" }}
      >
        <div className="left panel" style={{ height: "10px", width: "25%" }}>
          <h2 style={{ textAlign: "center" }}>{this.props.school.name}</h2>
          <div className="filters panel ml-3" style={{ textAlign: "center" }}>
            <button
              className="btn btn-sm btn-outline-primary  m-2"
              onClick={() => this.setState({ display: "Students" })}
            >
              Students
            </button>
            <button
              className="btn btn-sm btn-outline-primary m-2"
              onClick={() => this.setState({ display: "Classes" })}
            >
              Classes
            </button>
          </div>
          <StudentsOverview
            students={this.state.students}
            school={this.props.school}
            display={this.state.display}
          />
        </div>
        <div className="right panel" style={{ width: "75%" }}>
          <AttendanceGraph timeframe={1} />
          <AttendanceGraph timeframe={12} />
          <button
            className="btn btn-primary btn-lg m-2"
            onClick={() => (window.location.href = "/")}
          >
            Home
          </button>
        </div>
      </div>
    );
  }
}

export default TrendsPage;
