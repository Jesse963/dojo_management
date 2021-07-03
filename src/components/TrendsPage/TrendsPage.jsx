import React, { Component } from "react";
import AttendanceGraph from "./attendanceGraph";
import StudentsOverview from "./StudentsOverview";

class TrendsPage extends Component {
  state = {};
  render() {
    return (
      <div
        className="start page container shadow-lg p-3 mb-5 bg-white rounded"
        style={{ display: "flex", flexDirection: "row", marginTop: "10%" }}
      >
        <div className="left panel" style={{ height: "10px", width: "25%" }}>
          <StudentsOverview students={this.props.students} />
        </div>
        <div className="right panel" style={{ width: "75%" }}>
          <AttendanceGraph timeframe={1} />
          <AttendanceGraph timeframe={12} />
          <button className="btn btn-primary btn-lg m-2">Back</button>
        </div>
      </div>
    );
  }
}

export default TrendsPage;
