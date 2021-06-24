import React, { Component } from "react";
import StudentInfo from "./StudentInfo";
import StudentPerformance from "./StudentPerformance";

class StudentDetails extends Component {
  state = {
    details: {
      name: "Jesse Jenkins",
      photo: "/images/jesse.jpg",
      dob: "27/01/1996",
      contact: {
        phone: "0415927738",
        email: "jesse-jenkins@hotmail.com",
        address: "106 Links Ave Concord",
      },
      grade: "2nd Dan",
      start_date: "1/1/2014",
      payment_status: "Current",
      previous_grading: {
        date: "5/5/2019",
        result: "Pass",
      },
    },
  };
  render() {
    return (
      <div
        className="page container shadow-lg p-3 mb-5 bg-white rounded"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <StudentInfo details={this.state.details} />
        <StudentPerformance details={this.state.details} />
      </div>
    );
  }
}

export default StudentDetails;
