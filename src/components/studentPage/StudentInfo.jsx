import React, { Component } from "react";
import ClassInformation from "../TrendsPage/classInfoComponent";

class StudentInfo extends Component {
  state = {};
  render() {
    return (
      <div
        className="left panel"
        style={{
          minWidth: "15vw",
          maxHeight: "80%",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            overflowX: "auto",
            overflowY: "hidden",
          }}
        >
          {this.props.student.name}
        </h1>
        {/* <div
          className="profile image"
          style={{
            minWidth: "15vw",
            minHeight: "15vw",
            border: "2px dashed red",
          }}
        >
          student profile image
        </div> */}

        <ul
          className=""
          style={{
            textAlign: "center",
            listStyle: "none",
            margin: "0",
            padding: "0",
          }}
        >
          <li>{this.props.student.dob}</li>
          <li>{this.props.student.phone}</li>
          <li>{this.props.student.grade}</li>
        </ul>
        <h3>Attended Classes</h3>
        <div
          className="student attendance mt-3"
          style={{ maxHeight: "50vh", overflow: "auto" }}
        >
          {this.props.classes.map((Class) => {
            return <ClassInformation class={Class} acceptClick={false} />;
          })}
        </div>
        <div
          className="control panel"
          style={{ width: "100%", textAlign: "center" }}
        >
          <button className="btn btn-primary btn-lg m-2">Edit</button>
          <button
            className="btn btn-primary btn-lg m-2"
            onClick={() => (window.location.href = "/")}
          >
            Home
          </button>
          <button className="btn btn-primary btn-lg m-2">Back</button>
        </div>
      </div>
    );
  }
}

export default StudentInfo;
