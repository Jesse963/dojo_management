import React, { Component } from "react";

class NewStudentForm extends Component {
  state = {};
  render() {
    return (
      <form
        method="POST"
        action={"/api/submit_student?school_id=" + this.props.school_id}
        className="shadow-lg p-3 mb-5 bg-white rounded page container"
        id="newStudnetForm"
      >
        <div style={{ paddingLeft: "5%", paddingRight: "5%" }}>
          <h1 style={{ textAlign: "center" }}>Enter New Student Details</h1>
          <p>
            First Name:
            <input
              name="first_name"
              type="text"
              style={{ width: "100%" }}
              class="form-control"
            />
          </p>
          <p>
            Last Name:
            <input
              name="last_name"
              type="text"
              style={{ width: "100%" }}
              class="form-control"
            />
          </p>
          <p>
            Date of Birth:
            <input
              name="dob"
              type="text"
              style={{ width: "100%" }}
              class="form-control"
            />
          </p>
          <p>
            Phone Number:
            <input
              name="phone"
              type="text"
              style={{ width: "100%" }}
              class="form-control"
            />
          </p>
          <p>
            Address:
            <input
              name="address"
              type="text"
              style={{ width: "100%" }}
              class="form-control"
            />
          </p>
          <p>
            Email:
            <input
              name="email"
              type="text"
              style={{ width: "100%" }}
              class="form-control"
            />
          </p>
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
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/";
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

export default NewStudentForm;
