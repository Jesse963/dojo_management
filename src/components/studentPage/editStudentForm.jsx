import React, { Component } from "react";
import "../core.css";

class EditStudentForm extends Component {
  state = {};
  render() {
    return (
      <form
        method="POST"
        action={"/api/editStudentDetails?student_id=" + this.props.student._id}
        className="shadow-lg p-3 mb-5 bg-white rounded page container"
        id="newStudentForm"
        style={{ textAlign: "left" }}
      >
        <h1 style={{ textAlign: "center" }}>Edit Student Details</h1>
        <div
          style={{ paddingLeft: "5%", paddingRight: "5%", overflow: "auto" }}
        >
          <p>
            First Name:
            <input
              name="first_name"
              type="text"
              style={{ width: "100%" }}
              class="form-control"
              defaultValue={this.props.student.first_name}
              required
            />
          </p>
          <p>
            Last Name:
            <input
              name="last_name"
              type="text"
              style={{ width: "100%" }}
              class="form-control"
              defaultValue={this.props.student.last_name}
              required
            />
          </p>
          <p>
            Date of Birth:
            <input
              name="dob"
              type="text"
              style={{ width: "100%" }}
              class="form-control"
              defaultValue={this.props.student.dob}
              required
            />
          </p>
          <p>
            Phone Number:
            <input
              name="phone"
              type="text"
              style={{ width: "100%" }}
              class="form-control"
              defaultValue={this.props.student.phone}
              required
            />
          </p>
          <p>
            Address:
            <input
              name="address"
              type="text"
              style={{ width: "100%" }}
              class="form-control"
              defaultValue={this.props.student.address}
              required
            />
          </p>
          <p>
            Email:
            <input
              name="email"
              type="email"
              style={{ width: "100%" }}
              class="form-control"
              defaultValue={this.props.student.email}
              required
            />
          </p>
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            type="submit"
            className="btn btn-success btn-lg m-2"
            style={{ width: "20%" }}
          >
            Submit
          </button>
          <button
            type="submit"
            className="btn btn-secondary btn-lg m-2"
            style={{ width: "20%" }}
          >
            Back
          </button>
          <button
            type="cancel"
            className="btn btn-secondary btn-lg m-2"
            style={{ width: "20%" }}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/";
            }}
          >
            Home
          </button>
        </div>
      </form>
    );
  }
}

export default EditStudentForm;
