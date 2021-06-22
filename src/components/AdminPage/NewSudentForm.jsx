import React, { Component } from "react";

class NewStudentForm extends Component {
  state = {};
  render() {
    return (
      <form
        style={{
          marginTop: "5%",
          border: "2px solid black",
          padding: "5%",
          marginBottom: "5%",
          textAlign: "center",
        }}
        action="/new student success"
        className="shadow-lg p-3 mb-5 bg-white rounded"
      >
        <h1>Enter New Student Details</h1>
        <p>First Name:</p>
        <input type="text" />
        <p>Last Name:</p>
        <input type="text" />
        <p>Phone Number:</p>
        <input type="text" />
        <p>Address:</p>
        <input type="text" />
        <p>Email:</p>
        <input type="text" />
        <p>Credit Card:</p>
        <input type="text" />
        <p></p>
        <button type="submit" className="btn btn-primary btn-lg">
          Submit
        </button>
      </form>
    );
  }
}

export default NewStudentForm;
