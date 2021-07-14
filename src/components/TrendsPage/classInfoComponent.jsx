import React, { Component } from "react";

class ClassInformation extends Component {
  state = {};

  clickHandler() {
    //     console.log(this.props.student.name);
    //     reactDom.render(
    //       <StudentDetails
    //         student={this.props.student}
    //         totalStudents={this.props.totalStudents}
    //       />,
    //       document.querySelector(".container")
    //     );
  }

  render() {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let date = new Date(this.props.class.date);
    date =
      days[date.getDay()] +
      " - " +
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear();

    return (
      <div
        className="class info"
        style={{
          height: "5vh",
          display: "flex",
          borderBottom: "1px dashed black",
          cursor: "pointer",
          alignItems: "center",
        }}
        onClick={() => this.props.clickHandler(this.props.id)}
      >
        <h5 style={{ maxWidth: "80%", width: "80%" }}>{date}</h5>
        <h5>{this.props.class.attendees.length}</h5>
      </div>
    );
  }
}

export default ClassInformation;
