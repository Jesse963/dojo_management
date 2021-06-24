import React, { Component } from "react";

class StudentsOverview extends Component {
  generateStudentChildren = () => {};

  state = {};
  render() {
    return (
      <div>
        <h2 style={{ textAlign: "center" }}>Mushin Goju Ryu Karate Academy</h2>
        <div
          className="students overview m-3"
          style={{
            border: "1px solid blue",
            height: "47vh",
            overflowY: "auto",
          }}
        >
          {this.props.students.map((student) => {
            return <p>{student.name}</p>;
          })}
        </div>
      </div>
    );
  }
}

export default StudentsOverview;
