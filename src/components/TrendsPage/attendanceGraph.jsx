import React, { Component } from "react";
import "../core.css";

class AttendanceGraph extends Component {
  state = {};
  render() {
    return (
      <div>
        <h3 className="ml-3">
          Attendance in past {this.props.timeframe} months
        </h3>
        <div
          className="attendance graph m-3"
          style={{ border: "1px solid blue", height: "20vh" }}
        >
          Display attandance graph for timeframe of {this.props.timeframe}{" "}
          months
        </div>
      </div>
    );
  }
}

export default AttendanceGraph;
