import React, { Component } from "react";

class NewStudentForm extends Component {
  state = {};
  render() {
    return (
      <form
        method="POST"
        action="http://localhost:8080/api/submit_student"
        className="shadow-lg p-3 mb-5 bg-white rounded page container"
        id="newStudnetForm"
      >
        <div style={{ paddingLeft: "5%", paddingRight: "5%" }}>
          <h1 style={{ textAlign: "center" }}>Enter New Student Details</h1>
          <p>First Name:</p>
          <input name="first_name" type="text" style={{ width: "100%" }} />
          <p>Last Name:</p>
          <input name="last_name" type="text" style={{ width: "100%" }} />
          <p>Date of Birth:</p>
          <input name="dob" type="text" style={{ width: "100%" }} />
          <p>Phone Number:</p>
          <input name="phone" type="text" style={{ width: "100%" }} />
          <p>Address:</p>
          <input name="address" type="text" style={{ width: "100%" }} />
          <p>Email:</p>
          <input name="email" type="text" style={{ width: "100%" }} />
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
