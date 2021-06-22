import React, { Component } from "react";

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
      <ul className="mt-5">
        <li>{this.state.details.name}</li>
        <li>{this.state.details.dob}</li>
        <li>{this.state.details.contact.phone}</li>
        <li>{this.state.details.grade}</li>
      </ul>
    );
  }
}

export default StudentDetails;
