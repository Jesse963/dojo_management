import React, { Component } from "react";

class NewSchoolForm extends Component {
  state = {};
  render() {
    return (
      <form
        method="POST"
        action="/api/addNewSchool"
        className="shadow-lg p-3 mb-5 bg-white rounded page container"
        id="newSchoolForm"
      >
        <div style={{ paddingLeft: "5%", paddingRight: "5%" }}>
          <h1 style={{ textAlign: "center" }}>Welcome</h1>
          <p>Name of School:</p>
          <input name="school_name" type="text" style={{ width: "100%" }} />
          <p>Email:</p>
          <input name="email" type="text" style={{ width: "100%" }} />
          <p>First Name:</p>
          <input name="first_name" type="text" style={{ width: "100%" }} />
          <p>Last Name:</p>
          <input name="last_name" type="text" style={{ width: "100%" }} />
          <p>Phone:</p>
          <input name="phone" type="text" style={{ width: "100%" }} />
          <p>Postcode:</p>
          <input name="postcode" type="number" style={{ width: "100%" }} />
          <p>Password:</p>
          <input name="password" type="password" style={{ width: "100%" }} />
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

export default NewSchoolForm;
