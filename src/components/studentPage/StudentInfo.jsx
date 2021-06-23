import React, { Component } from "react";

class StudentInfo extends Component {
  state = {};
  render() {
    return (
      <div
        className="left panel"
        style={{
          maxWidth: "25%",
          overflowX: "scroll",
        }}
      >
        <div
          className="profile image"
          style={{
            width: "250px",
            height: "250px",
            border: "2px dashed red",
          }}
        ></div>
        <h2 style={{ textAlign: "center" }}>{this.props.details.name}</h2>
        <ul
          className=""
          style={{
            textAlign: "center",
            listStyle: "none",
            margin: "0",
            padding: "0",
          }}
        >
          <li>{this.props.details.name}</li>
          <li>{this.props.details.dob}</li>
          <li>{this.props.details.contact.phone}</li>
          <li>{this.props.details.grade}</li>
        </ul>
      </div>
    );
  }
}

export default StudentInfo;
