import React, { Component } from "react";

class NewStudentForm extends Component {
  state = {};
  render() {
    return (
      <form
        action="/new student success"
        className="shadow-lg p-3 mb-5 bg-white rounded page container"
      >
        <div style={{ paddingLeft: "5%", paddingRight: "5%" }}>
          <h1 style={{ textAlign: "center" }}>Enter New Student Details</h1>
          <p>First Name:</p>
          <input type="text" style={{ width: "100%" }} />
          <p>Last Name:</p>
          <input type="text" style={{ width: "100%" }} />
          <p>Phone Number:</p>
          <input type="text" style={{ width: "100%" }} />
          <p>Address:</p>
          <input type="text" style={{ width: "100%" }} />
          <p>Email:</p>
          <input type="text" style={{ width: "100%" }} />
          <p>Credit Card:</p>
          <input type="text" style={{ width: "100%" }} />
          <p></p>
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            type="submit"
            className="btn btn-primary btn-lg m-2"
            style={{ width: "20%" }}
          >
            Submit
          </button>
          <button
            type="cancel"
            className="btn btn-danger btn-lg m-2"
            style={{ width: "20%" }}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

export default NewStudentForm;
